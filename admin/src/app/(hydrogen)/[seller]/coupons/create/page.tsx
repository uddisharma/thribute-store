'use client';
import { useState } from 'react';
import { Controller, SubmitHandler } from 'react-hook-form';
import { Input } from '@/component/ui/input';
import { Form } from '@/component/ui/form';
import dynamic from 'next/dynamic';
import FormGroup from '@/component/others/form-group';
import FormFooter from '@/component/others/form-footer';
import cn from '@/utils/class-names';
import { z } from 'zod';
import SelectLoader from '@/component/loader/select-loader';
import PageHeader from '@/component/others/pageHeader';
import Link from 'next/link';
import { Button } from 'rizzui';
import axios from 'axios';
import { BaseApi, addCoupon } from '@/constants';
import { toast } from 'sonner';
import { useParams } from 'next/navigation';
import { useCookies } from 'react-cookie';
import { extractPathAndParams } from '@/utils/urlextractor';
const schema = z.object({
  code: z.string().min(1, { message: 'Code is Required' }),
  discount_type: z.string().min(1, { message: 'Discount Type is Required' }),
  discount: z.string().min(1, { message: 'Discount is Required' }),
});

type Schema = z.infer<typeof schema>;

const Select = dynamic(() => import('@/component/ui/select'), {
  ssr: false,
  loading: () => <SelectLoader />,
});

const initialValues = {
  code: '',
  discount_type: '',
  discount: '',
};

export default function NewsLetterForm() {
  const [reset, setReset] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const params = useParams();
  const [cookies] = useCookies(['admintoken']);
  const onSubmit: SubmitHandler<Schema> = (data) => {
    setIsLoading(true);
    axios
      .post(
        `${BaseApi}${addCoupon}`,
        {
          ...data,
          code: data?.code?.toUpperCase()?.split(' ').join(''),
          discount: Number(data?.discount),
          seller: params?.seller,
          discount_type:
            data.discount_type == 'Percentage' ? 'percentage' : 'direct_amount',
        },
        {
          headers: {
            Authorization: `Bearer ${cookies?.admintoken}`,
          },
        }
      )
      .then((res) => {
        if (res.data?.status == 'SUCCESS') {
          setReset(initialValues);
          return toast.success('Coupon Code Created Successfully !');
        } else {
          return toast.error('Something went wrong');
        }
      })
      .catch((err) => {
        if (err?.response?.data?.status == 'UNAUTHORIZED') {
          localStorage.removeItem('admin');
          const currentUrl = window.location.href;
          const path = extractPathAndParams(currentUrl);
          if (typeof window !== 'undefined') {
            location.href = `/auth/sign-in?ref=${path}`;
          }
          return toast.error('Session Expired');
        }
        console.log(err);
        return toast.error('Something went wrong');
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  const pageHeader = {
    title: 'Create Coupon',
    breadcrumb: [
      {
        href: '/',
        name: 'Home',
      },
      {
        href: `/${params?.seller}/dashboard`,
        name: 'Seller',
      },
      {
        name: 'Create Coupon',
      },
    ],
  };

  const disountType = [
    {
      name: 'Percentage',
      value: 'percentage',
    },
    {
      name: 'Direct Amount',
      value: 'direct_amount',
    },
  ];
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        <Link
          href={`/${params?.seller}/coupons`}
          className="mt-4 w-full @lg:mt-0 @lg:w-auto"
        >
          <Button
            tag="span"
            className="w-full @lg:w-auto dark:bg-gray-100 dark:text-white dark:active:bg-gray-100"
          >
            View all Coupons
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
        {({ register, control, formState: { errors } }) => (
          <div
            className={cn(
              'isomorphic-form flex flex-grow flex-col @container [&_label.block>span]:font-medium'
            )}
          >
            <div>
              <>
                <div className="mb-10 grid gap-7  @2xl:gap-9 @3xl:gap-11">
                  <FormGroup
                    title="Coupon Details"
                    className=""
                  >
                    <div className=" @3xl:col-span-2">
                      <Input
                        label="Coupon Code (must be unique)"
                        className="col-span-full"
                        placeholder="Code"
                        style={{ textTransform: 'uppercase' }}
                        {...register('code')}
                        error={errors.code?.message as string}
                      />
                    </div>
                    <div className=" @3xl:col-span-2">
                      <Controller
                        name="discount_type"
                        control={control}
                        render={({ field: { onChange, value } }) => (
                          <Select
                            options={disountType}
                            value={value}
                            onChange={onChange}
                            label="Discount Type"
                            error={errors?.discount_type?.message as string}
                            getOptionValue={(option) => option.name}
                          />
                        )}
                      />
                    </div>
                    <div className=" @3xl:col-span-2">
                      <Input
                        label="Discount"
                        className="col-span-full"
                        placeholder="Discount"
                        type="number"
                        style={{ textTransform: 'uppercase' }}
                        {...register('discount')}
                        error={errors.discount?.message as string}
                      />
                    </div>
                  </FormGroup>

                  <div
                    style={{
                      minHeight: '150px',
                      height: '150px',
                      width: '100%',
                    }}
                  ></div>
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
