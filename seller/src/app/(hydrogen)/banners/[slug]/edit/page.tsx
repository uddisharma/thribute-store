'use client';
import { useState } from 'react';
import { SubmitHandler } from 'react-hook-form';
import { Input } from '@/component/ui/input';
import { Form } from '@/component/ui/form';
import FormGroup from '@/component/others/form-group';
import FormFooter from '@/component/others/form-footer';
import cn from '@/utils/class-names';
import { z } from 'zod';
import axios from 'axios';
import { fileSchema } from '@/utils/validators/common-rules';
import PageHeader from '@/component/others/pageHeader';
import Link from 'next/link';
import { Button, Empty, SearchNotFoundIcon } from 'rizzui';
import { useParams, useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { BaseApi, singleBanner, updateBanner } from '@/constants';
import useSWR from 'swr';
import Spinner from '@/component/ui/spinner';
import { useCookies } from 'react-cookie';
import { extractPathAndParams } from '@/utils/urlextractor';
import AvatarUploadS3 from '@/component/ui/file-upload/avatar-upload-s3';
import { fetcher } from '@/constants/fetcher';
const schema = z.object({
  desktop: fileSchema.optional(),
  mobile: fileSchema.optional(),
  link: z.string().min(1, { message: 'Redirect Link is required' }),
});

type Schema = z.infer<typeof schema>;

export default function AssetInit() {
  const [reset, _setReset] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [cookies] = useCookies(['sellertoken']);
  const params = useParams();
  const router = useRouter();
  function validateData(desktop: any, mobile: any, link: any) {
    if (!desktop) {
      return false;
    }

    if (!mobile) {
      return false;
    }

    if (!link || link.trim() === '') {
      return false;
    }

    return true;
  }

  let {
    data,
    isLoading: loading,
    error,
  } = useSWR(
    `${BaseApi}${singleBanner}/${params?.slug}`,
    (url) => fetcher(url, cookies.sellertoken),
    {
      refreshInterval: 3600000,
      revalidateOnMount: true,
      revalidateOnFocus: true,
      onErrorRetry({ retrycount }: any) {
        if (retrycount > 3) {
          return false;
        }
      },
    }
  );

  const authstatus = error?.response?.data?.status == 'UNAUTHORIZED' && true;
  data = data?.data;
  const images = data?.images && data?.images[0];
  const desktop = images?.desktop?.url;
  const desktopBanner = { name: 'desktop', size: 1024, url: desktop };
  const phone = images?.mobile?.url;
  const mobileBanner = { name: 'mobile', size: 1024, url: phone };
  const redirectLink = data?.redirectLink;
  const initialValues = {
    desktop: desktopBanner ?? undefined,
    mobile: mobileBanner ?? undefined,
    link: redirectLink ?? '',
  };
  const onSubmit: SubmitHandler<Schema> = (data) => {
    if (!validateData(data?.desktop, data?.mobile, data?.link)) {
      return toast.warning('All fields are required');
    }
    setIsLoading(true);
    axios
      .patch(
        `${BaseApi}${updateBanner}/${params?.slug}`,
        {
          redirectLink: data?.link,
          images: [
            {
              desktop: {
                url: data?.desktop && data?.desktop.url,
                height: 300,
                width: 1600,
              },
              mobile: {
                url: data?.mobile && data?.mobile.url,
                height: 210,
                width: 480,
              },
            },
          ],
        },
        {
          headers: {
            Authorization: `Bearer ${cookies?.sellertoken}`,
          },
        }
      )
      .then((res) => {
        if (res.data.status == 'SUCCESS') {
          router.back();
          return toast.success('Banner Updated Successfully !');
        } else {
          toast.error('Error', {
            description: 'Something went wrong',
          });
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
        toast.error('Error', {
          description: 'Something went wrong',
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  const pageHeader = {
    title: 'Edit Banner',
    breadcrumb: [
      {
        href: '/',
        name: 'Home',
      },
      {
        href: `/banners`,
        name: 'Banners',
      },
      {
        name: 'Edit',
      },
    ],
  };

  if (authstatus) {
    localStorage.removeItem('seller');
    toast.error('Session Expired');
    const currentUrl = window.location.href;
    const path = extractPathAndParams(currentUrl);
    if (typeof window !== 'undefined') {
      location.href = `/auth/sign-in?ref=${path}`;
    }
  }
  if (loading) {
    <div>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        <Link href={`/banners`} className="mt-4 w-full @lg:mt-0 @lg:w-auto">
          <Button
            tag="span"
            className="w-full @lg:w-auto "
            variant='outline'
          >
            View all Banners
          </Button>
        </Link>
      </PageHeader>
      {loading && (
        <div style={{ paddingBottom: '100px' }}>{loading && <Spinner />}</div>
      )}
    </div>;
  } else if (error) {
    return (
      <div>
        <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
          <Link
            href={`/${params?.seller}/banners`}
            className="mt-4 w-full @lg:mt-0 @lg:w-auto"
          >
            <Button
              tag="span"
              className="w-full @lg:w-auto "
              variant='outline'
            >
              View all Banners
            </Button>
          </Link>
        </PageHeader>
        {error && (
          <div style={{ paddingBottom: '100px' }}>
            <Empty
              image={<SearchNotFoundIcon />}
              text="Something Went Wrong !"
              className="h-full justify-center"
            />
          </div>
        )}
      </div>
    );
  }
  if (data) {
    return (
      <>
        <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
          <Link
            href={`/${params?.seller}/banners`}
            className="mt-4 w-full @lg:mt-0 @lg:w-auto"
          >
            <Button
              tag="span"
              className="w-full @lg:w-auto"
              variant='outline'
            >
              View all Banners
            </Button>
          </Link>
        </PageHeader>
        <Form<Schema>
          validationSchema={schema}
          resetValues={reset}
          onSubmit={onSubmit}
          useFormProps={{
            defaultValues: initialValues,
          }}
        >
          {({
            register,
            control,
            setValue,
            getValues,
            formState: { errors },
          }) => (
            <div
              className={cn(
                'isomorphic-form flex flex-grow flex-col @container [&_label.block>span]:font-medium'
              )}
            >
              <div>
                <>
                  <div className="mb-10 grid gap-7 divide-y divide-dashed divide-gray-200 @2xl:gap-9 @3xl:gap-11">
                    <FormGroup
                      title="Upload Banner For Desktop"
                      description="This will shown in big screens"
                      className=""
                    >
                      <AvatarUploadS3
                        className="col-span-full"
                        name="desktop"
                        getValues={getValues}
                        setValue={setValue}
                        error={errors?.desktop?.message as string}
                      />
                    </FormGroup>
                    <FormGroup
                      title="Upload Banner for Mobile"
                      description="This will shown in small screens"
                      className="pt-7 @2xl:pt-9 @3xl:grid-cols-12 @3xl:pt-11"
                    >
                      <AvatarUploadS3
                        className="col-span-full"
                        name="mobile"
                        getValues={getValues}
                        setValue={setValue}
                        error={errors?.desktop?.message as string}
                      />
                    </FormGroup>
                    <FormGroup
                      title="Redirect Link"
                      className="pt-7 @2xl:pt-9 @3xl:grid-cols-12 @3xl:pt-11"
                    >
                      <Input
                        className="col-span-full"
                        type="text"
                        placeholder="Redirect Link"
                        {...register('link')}
                        error={errors.link?.message as string}
                      />
                    </FormGroup>
                  </div>
                  <FormFooter
                    isLoading={isLoading}
                    altBtnText="Cancel"
                    submitBtnText="Save"
                  />
                </>
              </div>
            </div>
          )}
        </Form>
      </>
    );
  }
}
