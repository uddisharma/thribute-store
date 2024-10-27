'use client';
import dynamic from 'next/dynamic';
import { Controller, useFieldArray, useFormContext } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import cn from '@/utils/class-names';
import { useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { ActionIcon } from '@/components/ui/action-icon';
import TrashIcon from '@/components/icons/trash';
import SelectLoader from '@/components/loader/select-loader';
import { PiPlusBold } from 'react-icons/pi';
import FormSummary from '@/app/shared/onboarding/form-summary';
const Select = dynamic(
  () => import('@/components/ui/select').then((mod) => mod.Select),
  {
    ssr: false,
    loading: () => <SelectLoader />,
  }
);

const productVariants = [
  {
    label: '',
    value: '',
  },
];

const variantOption = [
  {
    value: 'single',
    label: 'Single',
  },
  {
    value: 'multiple',
    label: 'Multiple',
  },
];

export default function ProductVariants({ className }: { className?: string }) {
  const {
    control,
    register,
    formState: { errors },
  } = useFormContext();

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'productVariants',
  });

  const addVariant = useCallback(() => append([...productVariants]), [append]);

  console.log('fields', fields);

  return (
    <div
      className={cn(
        'mx-auto grid w-full max-w-screen-2xl grid-cols-12 place-content-center gap-6 px-5 py-10 @3xl:min-h-[calc(100vh-10rem)] @5xl:gap-8 @6xl:gap-16 xl:px-7'
      )}
    >
      <div className="col-span-full flex flex-col justify-center @5xl:col-span-5">
        <FormSummary
          className="@7xl:me-10"
          step={3}
          title="Where Can Customers Find You ?"
          description="Provide the address details of your store so that customers can easily locate and reach out to you. Accurate location information ensures a smooth shopping experience for your customers."
        />
      </div>

      <div className="col-span-full flex items-center justify-center @5xl:col-span-7">
        <div className="flex-grow rounded-lg bg-white p-5 @4xl:p-7 dark:bg-gray-0">
          {fields.map((item, index) => (
            <div key={item.id} className="col-span-full flex gap-4 xl:gap-7">
              <Controller
                name={`productVariants.${index}.name`}
                control={control}
                render={({ field: { onChange, value } }) => (
                  <Select
                    options={variantOption}
                    value={value}
                    onChange={onChange}
                    label="Variant Name"
                    className="w-full @2xl:w-auto @2xl:flex-grow"
                    getOptionValue={(option) => option.value}
                  />
                )}
              />
              <Input
                type="number"
                label="Variant Value"
                placeholder="150.00"
                className="flex-grow"
                prefix={'$'}
                {...register(`productVariants.${index}.value`)}
              />
              {fields.length > 1 && (
                <ActionIcon
                  onClick={() => remove(index)}
                  variant="flat"
                  className="mt-7 shrink-0"
                >
                  <TrashIcon className="h-4 w-4" />
                </ActionIcon>
              )}
            </div>
          ))}
          <Button
            onClick={addVariant}
            variant="outline"
            className="col-span-full ml-auto w-auto"
          >
            <PiPlusBold className="me-2 h-4 w-4" /> Add Variant
          </Button>
        </div>
      </div>
    </div>
  );
}
