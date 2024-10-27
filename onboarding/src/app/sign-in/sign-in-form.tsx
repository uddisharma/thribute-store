'use client';

import Link from 'next/link';
import { SubmitHandler } from 'react-hook-form';
import { Password } from '@/components/ui/password';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { useMedia } from '@/hooks/use-media';
import { Form } from '@/components/ui/form';
import { routes } from '@/config/routes';
import { loginSchema, LoginSchema } from '@/utils/validators/login.schema';

import { useContext, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Text } from 'rizzui';
import { toast } from 'sonner';

const initialValues: LoginSchema = {
  email: '',
  password: '',
  rememberMe: true,
};

export default function SignInForm() {
  const isMedium = useMedia('(max-width: 1200px)', false);
  const [reset, setReset] = useState({});
  const [loading, setLoading] = useState(false);

  const params = useSearchParams();

  const onSubmit: SubmitHandler<LoginSchema> = (data) => {
    console.log(data);
    toast.success('Logined Successfully', {
      description: `as uddibhardwaj08@gmail.com`,
    });

    // setReset({ email: "", password: "", isRememberMe: false });
  };

  return (
    <div className="xl:pe-12 2xl:pe-20">
      <Form<LoginSchema>
        validationSchema={loginSchema}
        onSubmit={onSubmit}
        useFormProps={{
          mode: 'onChange',
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
              color="info"
              className="[&>label>span]:font-medium"
              {...register('email')}
              error={errors.email?.message}
            />
            <Password
              label="Password"
              placeholder="Enter your password"
              size={isMedium ? 'lg' : 'xl'}
              color="info"
              className="[&>label>span]:font-medium"
              {...register('password')}
              error={errors.password?.message}
            />
            <div className="flex items-center justify-between">
              <Switch
                variant="flat"
                label="Remember Me"
                color="info"
                className="[&>label>span]:font-medium [&>label]:my-1"
                {...register('rememberMe')}
              />
              <Link
                href={'/forgot-password'}
                className="h-auto p-0 text-sm font-medium text-gray-900 underline transition-colors hover:text-primary hover:no-underline"
              >
                Forgot Password?
              </Link>
            </div>
            <Button
              className="w-full"
              type="submit"
              isLoading={loading}
              size={isMedium ? 'lg' : 'xl'}
              color="primary"
            >
              Sign In
            </Button>
          </div>
        )}
      </Form>
      <Text className="mt-6 text-center text-[15px] leading-loose text-gray-500 lg:mt-9 xl:text-base">
        Don’t have an account?{' '}
        <Link
          href={'/sign-up'}
          className="font-bold text-gray-700 transition-colors hover:text-primary"
        >
          Sign Up
        </Link>
      </Text>
    </div>
  );
}
