'use client';
import FormSummary from '@/app/shared/onboarding/form-summary';
import { Button, Input, Password, Switch, Text, Textarea, Title } from 'rizzui';
import Link from 'next/link';
import cn from '@/utils/class-names';
import {
  ForgetPasswordSchema,
  forgetPasswordSchema,
} from '@/utils/validators/forget-password.schema';
import { useState } from 'react';
import { SubmitHandler } from 'react-hook-form';
import { Form } from '@/components/ui/form';
import axios from 'axios';
import { BaseApi, ForgotPassword } from '@/constants/page';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { FaAngleRight } from 'react-icons/fa';

export default function StepZero({ step, setStep }: any) {
  const [loading, setLoading] = useState(false);
  const [reset, setReset] = useState({});
  const router = useRouter();
  const initialValues = {
    email: '',
  };
  const onSubmit: SubmitHandler<ForgetPasswordSchema> = (data) => {
    setLoading(true);
    axios
      .post(`${BaseApi}${ForgotPassword}`, {
        email: data?.email,
      })
      .then((res) => {
        console.log(res?.data);
        if (res.data.status == 'SUCCESS') {
          toast.success('Reset link sent to this email', {
            description: `${data?.email}`,
          });
          setReset(initialValues);
          router.push('/');
        } else if (res.data.status == 'RECORD_NOT_FOUND') {
          return toast.error('Record Not Found');
        } else {
          toast.error('Something went wrong');
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error('Something went wrong');
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
            step={0}
            title="Forgot your password !"
            description="Oops, it happens to the best of us! If you've forgotten your password, don't worry – we've got you covered. Enter your email address below, and we'll send you a secure link to reset your password. Regain access to your account and continue your seamless experience with us. Your security is our priority, and we're here to assist you every step of the way."
          />
        </div>

        <div className="col-span-full flex items-center justify-center @5xl:col-span-7">
          <div className="flex-grow rounded-lg bg-white p-5 @4xl:p-7 dark:bg-gray-0">
            <Title
              as="h2"
              className="mb-5 text-center text-[26px] leading-normal @container md:text-3xl md:!leading-normal lg:mb-7 lg:pe-8 lg:text-3xl  xl:text-[32px] 2xl:pe-0 2xl:text-4xl"
            >
              {
                "Don't worry, we've got you covered! RESET your password in no time."
              }
            </Title>
            <Form<ForgetPasswordSchema>
              validationSchema={forgetPasswordSchema}
              resetValues={reset}
              onSubmit={onSubmit}
              useFormProps={{
                mode: 'onChange',
                defaultValues: initialValues,
              }}
            >
              {({ register, formState: { errors } }) => (
                <div className="loginform">
                  <Input
                    type="email"
                    label="Email"
                    placeholder="Enter your email"
                    color="info"
                    className="[&>label>span]:font-medium"
                    {...register('email')}
                    error={errors.email?.message}
                  />

                  <Button
                    isLoading={loading}
                    className=" mt-5 w-full"
                    type="submit"
                    color="primary"
                  >
                    Continue
                    <FaAngleRight className="ml-3 h-3 w-3" />
                  </Button>
                  <Text className="mt-5 text-center text-[15px] leading-loose text-gray-500 lg:mt-5 xl:text-base">
                    Remember your password?{' '}
                    <Link
                      href={'/'}
                      className="font-bold text-gray-700 transition-colors hover:text-primary"
                    >
                      Sign In
                    </Link>
                  </Text>
                </div>
              )}
            </Form>
          </div>
        </div>
      </div>
    </>
  );
}
