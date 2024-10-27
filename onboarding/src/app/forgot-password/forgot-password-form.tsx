'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useMedia } from '@/hooks/use-media';
import { Form } from '@/components/ui/form';
import { Text } from '@/components/ui/text';
import {
  forgetPasswordSchema,
  ForgetPasswordSchema,
} from '@/utils/validators/forget-password.schema';
import { useRouter } from 'next/navigation';

const initialValues = {
  email: '',
};

export default function ForgetPasswordForm() {
  const isMedium = useMedia('(max-width: 1200px)', false);

  const [reset, setReset] = useState({});
  const [loading, setLoading] = useState(false);

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <div className="xl:pe-12 2xl:pe-20">
      <Form<ForgetPasswordSchema>
        validationSchema={forgetPasswordSchema}
        resetValues={reset}
        onSubmit={onSubmit}
        useFormProps={{
          defaultValues: initialValues,
        }}
      >
        {({ register, formState: { errors } }) => (
          <div className="space-y-5 lg:space-y-6">
            <Input
              type="email"
              size={isMedium ? 'lg' : 'xl'}
              label="Email"
              placeholder="Enter your email"
              className="[&>label>span]:font-medium"
              color="info"
              {...register('email')}
              error={errors.email?.message}
            />
            <Button
              className="w-full"
              type="submit"
              isLoading={loading}
              size={isMedium ? 'lg' : 'xl'}
              color="primary"
            >
              Reset Password
            </Button>
          </div>
        )}
      </Form>
      <Text className="mt-6 text-center text-[15px] leading-loose text-gray-500 lg:mt-9 xl:text-base">
        Don’t want to reset?{' '}
        <Link
          href={'/sign-in'}
          className="font-semibold text-gray-700 transition-colors hover:text-primary"
        >
          Sign In
        </Link>
      </Text>
    </div>
  );
}
