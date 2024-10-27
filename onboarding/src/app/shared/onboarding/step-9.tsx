'use client';
import { Button, Input, Text } from 'rizzui';
import cn from '@/utils/class-names';
import { SubmitHandler } from 'react-hook-form';
import FormSummary from '@/app/shared/onboarding/form-summary';
import { useEffect, useState } from 'react';
import { Form } from '@/components/ui/form';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';
import axios from 'axios';
import { BaseApi, addBanner, banners } from '@/constants/page';
import { toast } from 'sonner';
import { useCookies } from 'react-cookie';
import { extractPathAndParams } from '@/utils/urlextractor';
import { fileSchema } from '@/utils/validators/common-rules';
import { z } from 'zod';
import AvatarUpload from '@/components/ui/file-upload/avatar-upload';

export default function StepSeven({ step, setStep }: any) {
  const [cookies, removeCookie] = useCookies(['sellertoken']);

  useEffect(() => {
    axios
      .get(`${BaseApi}${banners}?page=${1}&limit=${2}&isDeleted=${false}`, {
        headers: {
          Authorization: `Bearer ${cookies?.sellertoken}`,
        },
      })
      .then((res) => {
        if (res?.data?.data?.data?.length > 0) {
          setStep(10);
          removeCookie('sellertoken', { path: '/' });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const schema = z.object({
    desktop: fileSchema.optional(),
    mobile: fileSchema.optional(),
    link: z.string().min(1, { message: 'Redirect Link is required' }),
  });

  type Schema = z.infer<typeof schema>;

  const initialValues = {
    desktop: undefined,
    mobile: undefined,
    link: '',
  };
  const [reset, _setReset] = useState({});

  const [loading, setLoading] = useState(false);
  const onSubmit: SubmitHandler<Schema> = (data) => {
    setLoading(true);
    axios
      .post(
        `${BaseApi}${addBanner}`,
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
        if (res?.data?.status == 'SUCCESS') {
          setStep(10);
          removeCookie('sellertoken', { path: '/' });
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
            step={9}
            title="Streamline Your Deliveries"
            description=" If you use delivery partners, let us know about them. This step ensures that your products reach customers efficiently, enhancing the overall shopping experience. Share information about delivery partners and their warehouses if applicable."
          />
        </div>

        <div className="col-span-full flex items-center justify-center @5xl:col-span-7">
          <div className="flex-grow rounded-lg bg-white p-5 @4xl:p-7 dark:bg-gray-0">
            <Form<Schema>
              validationSchema={schema}
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
                    Upload your 1st Banner Image
                  </Text>
                  <div className="rounded-lg @2xl:grid-cols-2  @4xl:col-span-8 @4xl:gap-5 xl:gap-7">
                    <div className="grid-container1 col-span-full rounded-lg border border-gray-300 p-4">
                      <div className="m-auto mt-14">
                        <h4 className="text-base font-medium">For Desktop</h4>
                        <p className="mt-2">
                          This will be displayed on your Shop for big screens.
                        </p>
                      </div>
                      <div className="m-auto ">
                        <AvatarUpload
                          name="desktop"
                          setValue={setValue}
                          getValues={getValues}
                          error={errors.desktop?.message as string}
                        />
                      </div>
                    </div>

                    <div className="grid-container1 col-span-full mt-5 rounded-lg border border-gray-300 p-4">
                      <div className="m-auto mt-14">
                        <h4 className="text-base font-medium">For Mobile</h4>
                        <p className="mt-2">
                          This will be displayed on your Shop for small screens.
                        </p>
                      </div>
                      <div className="m-auto ">
                        <AvatarUpload
                          name="mobile"
                          setValue={setValue}
                          getValues={getValues}
                          error={errors.mobile?.message as string}
                        />
                      </div>
                    </div>

                    <Input
                      className="col-span-full mt-5"
                      type="text"
                      placeholder="Redirect Link"
                      label="Redirect Link"
                      {...register('link')}
                      error={errors.link?.message as string}
                    />
                  </div>

                  <div className="grid-container1">
                    <Button
                      onClick={() => {
                        setStep(8);
                      }}
                      variant="outline"
                      className="mt-5 w-full"
                      type="button"
                      color="primary"
                    >
                      <MdKeyboardArrowLeft className="ml-3 h-4 w-4 text-gray-500" />
                      Prev
                    </Button>
                    <Button
                      isLoading={loading}
                      className=" mt-5"
                      type="submit"
                      color="primary"
                    >
                      Submit
                      <MdKeyboardArrowRight className="ml-1 h-4 w-4 text-gray-500" />
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
