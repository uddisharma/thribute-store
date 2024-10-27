'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Password } from '@/components/ui/password';
import { SubmitHandler } from 'react-hook-form';
import { Form } from '@/components/ui/form';
import { Text } from '@/components/ui/text';

import {
  ResetPasswordSchema1,
  resetPasswordSchema1,
} from '@/utils/validators/reset.schema';

import { useParams, useRouter } from 'next/navigation';

const initialValues = {
  password: '',
  confirmPassword: '',
};

export default function ForgetPasswordForm() {
  const [reset, setReset] = useState({});
  const path = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  // console.log(path);
  const onSubmit: SubmitHandler<ResetPasswordSchema1> = (data) => {
    console.log(data);
  };

  return (
    <>
      <Form<ResetPasswordSchema1>
        validationSchema={resetPasswordSchema1}
        resetValues={reset}
        onSubmit={onSubmit}
        useFormProps={{
          mode: 'onChange',
          defaultValues: initialValues,
        }}
        className="pt-1.5"
      >
        {({ register, formState: { errors } }) => (
          <div className="space-y-6">
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
              className="[&>label>span]:font-medium"
              color="info"
              inputClassName="text-sm"
              {...register('confirmPassword')}
              error={errors.confirmPassword?.message}
            />

            <Button
              className="mt-2 w-full"
              type="submit"
              isLoading={loading}
              size="lg"
              color="primary"
            >
              Reset Password
            </Button>
          </div>
        )}
      </Form>
      <Text className="mt-6 text-center text-[15px] leading-loose text-gray-500 lg:mt-8 lg:text-start xl:text-base">
        Don’t want to reset your password?{' '}
        <Link
          href={'/sign-in'}
          className="font-bold text-gray-700 transition-colors hover:text-blue"
        >
          Sign In
        </Link>
      </Text>
    </>
  );
}
