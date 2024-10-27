'use client';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { SubmitHandler, Controller } from 'react-hook-form';
import { PiEnvelopeSimple } from 'react-icons/pi';
import { Form } from '@/component/ui/form';
import { Input } from '@/component/ui/input';
import { FaPhoneAlt } from 'react-icons/fa';
import {
  profileFormSchema,
  ProfileFormTypes,
} from '@/utils/validators/profile-settings.schema';
import FormGroup from '../others/form-group';
import FormFooter from '../others/form-footer';
import cn from '@/utils/class-names';
import { useLayout } from '@/hooks/use-layout';
import { useBerylliumSidebars } from '@/layouts/beryllium/beryllium-utils';
import { LAYOUT_OPTIONS } from '@/config/enums';
import { useContext, useState } from 'react';
import { UserContext } from '@/store/user/context';
import { toast } from 'sonner';
import axios from 'axios';
import { BaseApi, updateSeller } from '@/constants';
import AvatarUploadS3 from '../ui/file-upload/avatar-upload-s3';
import { useCookies } from 'react-cookie';
import { extractPathAndParams } from '@/utils/urlextractor';
const QuillEditor = dynamic(() => import('@/component/ui/quill-editor'), {
  ssr: false,
});

export default function ProfileSettingsView() {
  const { state, setUser } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const [cookies] = useCookies(['sellertoken']);

  const onSubmit: SubmitHandler<ProfileFormTypes> = (data) => {
    setLoading(true);
    axios
      .patch(
        `${BaseApi}${updateSeller}`,
        {
          ...data,
          cover: data?.cover?.url,
        },
        {
          headers: {
            Authorization: `Bearer ${cookies?.sellertoken}`,
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        if (res.data?.status == 'SUCCESS') {
          setUser(res.data?.data);
          return toast.success('Profile successfully updated!');
        } else {
          return toast.error('Something went wrong !');
        }
      })
      .catch((err) => {
        console.log(err);
        if (err?.response?.data?.status == 'UNAUTHORIZED') {
          localStorage.removeItem('seller');
          toast.error('Session Expired');
          const currentUrl = window.location.href;
          const path = extractPathAndParams(currentUrl);
          if (typeof window !== 'undefined') {
            location.href = `/auth/sign-in?ref=${path}`;
          }
        }
        return toast.error('Something went wrong !');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const data = {
    ...state?.user,
    cover: { name: state?.user?.username, url: state?.user?.cover, size: 1024 },
  };

  const defaultValues = {
    username: data?.username ?? '',
    shopname: data?.shopname ?? '',
    email: data?.email ?? '',
    mobileNo: data?.mobileNo ?? '',
    alternatemobileNo: data?.alternatemobileNo ?? '',
    description: data?.description ?? '',
    cover: data?.cover ?? undefined,
    discount: data?.discount ?? '',
  };

  return (
    <>
      <Form<ProfileFormTypes>
        validationSchema={profileFormSchema}
        onSubmit={onSubmit}
        className="@container"
        useFormProps={{
          mode: 'onChange',
          defaultValues,
        }}
      >
        {({
          register,
          control,
          getValues,
          setValue,
          formState: { errors },
        }) => {
          return (
            <>
              {state?.user && (
                <ProfileHeader url={state?.user ? state?.user?.cover : ''}>
                  <div className="w-full sm:w-auto md:ms-auto"></div>
                </ProfileHeader>
              )}
              <div className="mx-auto mb-10 grid w-full max-w-screen-2xl gap-7 divide-y divide-dashed divide-gray-200 @2xl:gap-9 @3xl:gap-11">
                <FormGroup
                  title="Username"
                  className="pt-7 @2xl:pt-9 @3xl:grid-cols-12 @3xl:pt-11"
                >
                  <Input
                    className="col-span-full"
                    prefix="https://themediumcart.com/"
                    placeholder="Username"
                    disabled
                    prefixClassName="relative pe-2.5 before:w-[1px] before:h-[38px] before:absolute before:bg-gray-300 before:-top-[9px] before:right-0"
                    {...register('username')}
                    error={errors.username?.message}
                  />
                </FormGroup>

                <FormGroup
                  title="Shop Name"
                  className="pt-7 @2xl:pt-9 @3xl:grid-cols-12 @3xl:pt-11"
                >
                  <Input
                    type="text"
                    className="col-span-full"
                    prefixClassName="relative pe-2.5 before:w-[1px] before:h-[38px] before:absolute before:bg-gray-300 before:-top-[9px] before:right-0"
                    placeholder="Enter your Shop Name"
                    {...register('shopname')}
                    error={errors.shopname?.message}
                  />
                </FormGroup>

                <FormGroup
                  title="Cover Photo"
                  description="This will be displayed on your profile."
                  className="pt-7 @2xl:pt-9 @3xl:grid-cols-12 @3xl:pt-11"
                >
                  <div className="col-span-2 flex flex-col items-center gap-4 @xl:flex-row">
                    <AvatarUploadS3
                      name="cover"
                      setValue={setValue}
                      getValues={getValues}
                      error={errors?.cover?.message as string}
                    />
                  </div>
                </FormGroup>

                <FormGroup
                  title="Description"
                  className="pt-7 @2xl:pt-9 @3xl:grid-cols-12 @3xl:pt-11"
                >
                  <div className="@3xl:col-span-2">
                    <Controller
                      control={control}
                      name="description"
                      render={({ field: { onChange, value } }) => (
                        <QuillEditor
                          value={value}
                          onChange={onChange}
                          className="[&>.ql-container_.ql-editor]:min-h-[100px]"
                        />
                      )}
                    />
                  </div>
                </FormGroup>

                <FormGroup
                  title="Contact email"
                  className="pt-7 @2xl:pt-9 @3xl:grid-cols-12 @3xl:pt-11"
                  description="Enter an  email if you’d like to be contacted via a  email."
                >
                  <Input
                    prefix={
                      <PiEnvelopeSimple className="h-6 w-6 text-gray-500" />
                    }
                    type="email"
                    disabled
                    className="col-span-full"
                    placeholder="youremail@gmail.com"
                    {...register('email')}
                    error={errors.email?.message}
                  />

                  <Input
                    prefix={<FaPhoneAlt className="h-4 w-4 text-gray-500" />}
                    type="text"
                    disabled
                    className="col-span-full"
                    placeholder="1234567890"
                    {...register('mobileNo')}
                    error={errors.mobileNo?.message}
                  />
                  <Input
                    prefix={<FaPhoneAlt className="h-4 w-4 text-gray-500" />}
                    type="text"
                    className="col-span-full"
                    placeholder="1234567890"
                    {...register('alternatemobileNo')}
                    error={errors.alternatemobileNo?.message}
                  />
                </FormGroup>

                <FormGroup
                  title="Discount"
                  className="pt-7 @2xl:pt-9 @3xl:grid-cols-12 @3xl:pt-11"
                >
                  <Input
                    type="text"
                    className="col-span-full"
                    prefixClassName="relative pe-2.5 before:w-[1px] before:h-[38px] before:absolute before:bg-gray-300 before:-top-[9px] before:right-0"
                    placeholder="Discount"
                    {...register('discount')}
                    error={errors.discount?.message}
                  />
                </FormGroup>
              </div>
              <FormFooter
                isLoading={loading}
                altBtnText="Cancel"
                submitBtnText="Save"
              />
            </>
          );
        }}
      </Form>
    </>
  );
}

export function ProfileHeader({
  url,
  children,
}: React.PropsWithChildren<{ url: string }>) {
  const { layout } = useLayout();
  const { expandedLeft } = useBerylliumSidebars();

  return (
    <div
      className={cn(
        // 'relative z-0 -mx-4 px-4 pt-28 before:absolute before:start-0 before:top-0 before:h-40 before:w-full before:bg-gradient-to-r before:from-[#F8E1AF] before:to-[#F6CFCF] @3xl:pt-[190px] @3xl:before:h-[calc(100%-120px)] md:-mx-5 md:px-5 lg:-mx-8 lg:px-8 xl:-mx-6 xl:px-6 3xl:-mx-[33px] 3xl:px-[33px] 4xl:-mx-10 4xl:px-10 dark:before:from-[#bca981] dark:before:to-[#cbb4b4]',
        layout === LAYOUT_OPTIONS.BERYLLIUM && expandedLeft
          ? 'before:start-5 3xl:before:start-[25px]'
          : 'xl:before:w-[calc(100%_+_10px)]'
      )}
    >
      <div className="relative z-10 mx-auto flex w-full max-w-screen-2xl flex-wrap items-end justify-start gap-6 border-b border-dashed border-gray-300 pb-10">
        <Image
          src={url}
          width={1600}
          height={200}
          style={{
            maxHeight: '300px',
            borderRadius: '10px',
            marginTop: '10px',
          }}
          alt="cover"
        />
        {/* <div className="relative -top-1/3 aspect-square w-[110px] overflow-hidden rounded-full border-[6px] border-white bg-gray-100 shadow-profilePic @2xl:w-[130px] @5xl:-top-2/3 @5xl:w-[150px] 3xl:w-[200px] dark:border-gray-50">
          <Image
            src="https://isomorphic-furyroad.s3.amazonaws.com/public/profile-image.webp"
            alt="profile-pic"
            fill
            sizes="(max-width: 768px) 100vw"
            className="aspect-auto"
          />
        </div>
        <div>
          <Title
            as="h2"
            className="mb-2 inline-flex items-center gap-3 text-xl font-bold text-gray-900"
          >
            {title}
            <PiSealCheckFill className="h-5 w-5 text-primary md:h-6 md:w-6" />
          </Title>
          {description ? (
            <Text className="text-sm text-gray-500">{description}</Text>
          ) : null}
        </div> */}
        {children}
      </div>
    </div>
  );
}
