'use client';
import FormSummary from '@/app/shared/onboarding/form-summary';
import { Button, Input, Password, Switch, Text, Textarea, Title } from 'rizzui';
import Link from 'next/link';
import cn from '@/utils/class-names';
import {
  ResetPasswordSchema1,
  resetPasswordSchema1,
} from '@/utils/validators/reset.schema';
import { useState } from 'react';
import { SubmitHandler } from 'react-hook-form';
import { Form } from '@/components/ui/form';
import axios from 'axios';
import { BaseApi, ForgotPassword, ResetPassword } from '@/constants/page';
import { toast } from 'sonner';
import { useParams, useRouter } from 'next/navigation';
import { FaAngleRight } from 'react-icons/fa';

export default function StepZero({ step, setStep }: any) {
  const [loading, setLoading] = useState(false);
  const [reset, setReset] = useState({});
  const router = useRouter();
  const path = useParams();
  const initialValues = {
    password: '',
    confirmPassword: '',
  };
  const onSubmit: SubmitHandler<ResetPasswordSchema1> = (data) => {
    if (data.confirmPassword != data?.password) {
      return toast.error('Password Should Match');
    } else {
      setLoading(true);
      axios
        .put(`${BaseApi}${ResetPassword}`, {
          code: path?.id,
          newPassword: data?.password,
        })
        .then((res) => {
          if (res.data.status == 'SUCCESS') {
            toast.success('Password Reset Successfully');
            setReset(initialValues);
            router.push('/');
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
    }
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
            title="Choose a New Password !"
            description="You're one step away from regaining access to your account. Enter your new password below and confirm it to ensure account security. Choose a strong and memorable password to protect your account. Once done, you'll be back on track, ready to explore and engage with our platform. Your security matters to us, and we're here to make sure your experience is both convenient and safe."
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
            <Form<ResetPasswordSchema1>
              validationSchema={resetPasswordSchema1}
              resetValues={reset}
              onSubmit={onSubmit}
              useFormProps={{
                mode: 'onChange',
                defaultValues: initialValues,
              }}
            >
              {({ register, formState: { errors } }) => (
                <div className="loginform">
                  <Password
                    label="Password"
                    placeholder="Enter your password"
                    size="lg"
                    className="[&>label>span]:font-medium"
                    color="info"
                    inputClassName="text-sm"
                    {...register('password')}
                    error={errors.password?.message}
                  />
                  <Password
                    label="Confirm Password"
                    placeholder="Enter confirm password"
                    size="lg"
                    className="[&>label>span]:font-medium mt-5"
                    color="info"
                    inputClassName="text-sm"
                    {...register('confirmPassword')}
                    error={errors.confirmPassword?.message}
                  />

                  <Button
                    isLoading={loading}
                    className=" mt-5 w-full"
                    type="submit"
                    color="primary"
                  >
                    Reset Password
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
