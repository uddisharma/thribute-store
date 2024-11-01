'use client';
import { Button, Input, Select, Text } from 'rizzui';
import cn from '@/utils/class-names';
import { FaHouseUser } from 'react-icons/fa';
import { Controller, SubmitHandler } from 'react-hook-form';
import FormSummary from '@/app/shared/onboarding/form-summary';
import { Step4Schema, step4Schema } from '@/utils/validators/onboarding.schema';
import { useContext, useState } from 'react';
import { Form } from '@/components/ui/form';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';
import { FaLocationDot } from 'react-icons/fa6';
import { IoMdMail } from 'react-icons/io';
import { PhoneNumber } from '@/components/ui/phone-input';
import { UserContext } from '@/store/user/context';
import axios from 'axios';
import { BaseApi, UpdateSeller } from '@/constants/page';
import { toast } from 'sonner';
import { useCookies } from 'react-cookie';
import { states } from '@/constants/states';
import { extractPathAndParams } from '@/utils/urlextractor';
import AvatarUploadS3 from '@/components/ui/file-upload/avatar-upload';

export default function StepFive({ step, setStep }: any) {
  const [cookies] = useCookies(['sellertoken']);
  const { state, setUser } = useContext(UserContext);
  const seller = state?.user;
  const initialValues: Step4Schema = {
    personal: {
      name: seller?.owner?.personal?.name ?? '',
      email: seller?.owner?.personal?.email ?? '',
      phone: seller?.owner?.personal?.phone ?? '',
    },
    address: {
      address1: seller?.owner?.address?.address1 ?? '',
      address2: seller?.owner?.address?.address2 ?? '',
      landmark: seller?.owner?.address?.landmark ?? '',
      city: seller?.owner?.address?.city ?? '',
      state: seller?.owner?.address?.state ?? '',
      pincode: seller?.owner?.address?.pincode ?? '',
    },
    signature:
      {
        name: seller?.owner?.signature?.name ?? '',
        url: seller?.owner?.signature ?? '',
        size: 1024,
      } ?? '',
  };
  const [reset, setReset] = useState({});
  const [loading, setLoading] = useState(false);
  const onSubmit: SubmitHandler<Step4Schema> = (data) => {
    if (!data?.signature?.url) return toast.error('Please upload signature');

    setLoading(true);
    axios
      .patch(
        `${BaseApi}${UpdateSeller}`,
        {
          owner: { ...data, signature: data?.signature?.url },
        },
        {
          headers: {
            Authorization: `Bearer ${cookies?.sellertoken}`,
          },
        }
      )
      .then((res) => {
        if (res?.data?.status == 'SUCCESS') {
          setUser(res?.data?.data);
          setStep(6);
          return toast.success('Details saved Successfully');
        } else {
          toast.warning(res?.data?.message ?? 'Something went wrong!');
        }
      })
      .catch((err) => {
        console.log(err);
        if (err?.response?.data?.status == 'UNAUTHORIZED') {
          localStorage.removeItem('admin');
          const currentUrl = window.location.href;
          const path = extractPathAndParams(currentUrl);
          if (typeof window !== 'undefined') {
            location.href = `/auth/sign-in?ref=${path}`;
          }
          return toast.error('Session Expired');
        }
        toast.error('Something went wrong !');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <>
      <div
        className={cn(
          'mx-auto grid w-full max-w-screen-2xl grid-cols-12 place-content-center gap-6 px-5 py-10 @3xl:min-h-[calc(100vh-10rem)] @5xl:gap-8 @6xl:gap-16 xl:px-7'
        )}
      >
        <div className="col-span-full flex flex-col justify-center @5xl:col-span-5">
          <FormSummary
            className="@7xl:me-10"
            step={5}
            title="Introduce Yourself !"
            description="Share personal and address details to establish a connection with potential buyers. Let them know who is behind the store, creating a sense of trust and reliability."
          />
        </div>

        <div className="col-span-full flex items-center justify-center @5xl:col-span-7">
          <div className="flex-grow rounded-lg bg-white p-5 @4xl:p-7 dark:bg-gray-0">
            <Form<Step4Schema>
              validationSchema={step4Schema}
              resetValues={reset}
              onSubmit={onSubmit}
              useFormProps={{
                mode: 'onChange',
                defaultValues: initialValues,
              }}
            >
              {({
                register,
                control,
                getValues,
                setValue,
                formState: { errors },
              }) => (
                <>
                  <Text className="mb-5  font-semibold text-gray-900">
                    Owner Personal Details
                  </Text>
                  <div className="col-span-full grid gap-4 rounded-lg @2xl:grid-cols-2  @4xl:col-span-8 @4xl:gap-5 xl:gap-7">
                    <Input
                      prefix={<FaHouseUser className="h-4 w-4" />}
                      label="Name"
                      placeholder="Owner Name"
                      className="col-span-full"
                      {...register('personal.name')}
                      error={errors.personal?.name?.message}
                    />
                    <Input
                      prefix={<IoMdMail className="h-4 w-4" />}
                      label="Email"
                      placeholder="Owner Email"
                      type="email"
                      {...register('personal.email')}
                      error={errors.personal?.email?.message}
                    />
                    <Controller
                      name="personal.phone"
                      control={control}
                      render={({ field: { value, onChange } }: any) => (
                        <PhoneNumber
                          label="Phone Number"
                          country="in"
                          value={value}
                          onChange={onChange}
                          placeholder="Owner Phone Number"
                          error={errors.personal?.phone?.message}
                        />
                      )}
                    />
                  </div>
                  <Text className="mb-5 mt-10 font-semibold text-gray-900">
                    Owner Address Details
                  </Text>
                  <div className="col-span-full grid gap-4 rounded-lg @2xl:grid-cols-2  @4xl:col-span-8 @4xl:gap-5 xl:gap-7">
                    <Input
                      prefix={<FaLocationDot className="h-4 w-4" />}
                      label="Address 1"
                      placeholder="Address 1"
                      {...register('address.address1')}
                      error={errors.address?.address1?.message}
                    />
                    <Input
                      label="Address 2"
                      placeholder="Address 2"
                      type="text"
                      {...register('address.address2')}
                      error={errors.address?.address2?.message}
                    />

                    <Input
                      label="Landmark"
                      placeholder="Landmark"
                      type="text"
                      {...register('address.landmark')}
                      error={errors.address?.landmark?.message}
                    />

                    <Input
                      label="Pincode"
                      placeholder="Pincode"
                      type="number"
                      maxLength={6}
                      {...register('address.pincode')}
                      error={errors.address?.pincode?.message}
                    />
                    <Input
                      label="City"
                      {...register('address.city')}
                      error={errors.address?.city?.message}
                      placeholder="City"
                      type="text"
                    />
                    <Controller
                      name="address.state"
                      control={control}
                      render={({ field: { value, onChange } }) => (
                        <Select
                          label="Select State"
                          options={states}
                          value={value}
                          onChange={onChange}
                          placeholder="Select State"
                          error={errors.address?.state?.message}
                          getOptionValue={(option) => option.value}
                          getOptionDisplayValue={(option) => option.label}
                        />
                      )}
                    />
                    <div className="grid-container1 col-span-full rounded-lg border border-gray-300 p-4">
                      <div className="m-auto mt-14">
                        <h4 className="text-base font-medium">
                          Owner Signature
                        </h4>
                        <p className="mt-2">
                          This will be print on bill and invoice.
                        </p>
                      </div>
                      <div className="m-auto ">
                        <AvatarUploadS3
                          name={'signature'}
                          setValue={setValue}
                          getValues={getValues}
                        />
                        <p className="text-red-500">
                          {' '}
                          {errors.signature?.message}
                        </p>
                      </div>
                    </div>
                    <Button
                      onClick={() => {
                        setStep(4);
                      }}
                      variant="outline"
                      className="w-full"
                      type="button"
                      color="primary"
                    >
                      <MdKeyboardArrowLeft className="ml-3 h-4 w-4 text-gray-500" />
                      Prev
                    </Button>
                    <Button
                      isLoading={loading}
                      className=" w-full"
                      type="submit"
                      color="primary"
                    >
                      Next
                      <MdKeyboardArrowRight className="ml-3 h-4 w-4 text-gray-500" />
                    </Button>
                  </div>
                </>
              )}
            </Form>
          </div>
        </div>
      </div>
    </>
  );
}
