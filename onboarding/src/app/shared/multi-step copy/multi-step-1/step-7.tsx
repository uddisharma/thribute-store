'use client';

import { useAtom } from 'jotai';
import dynamic from 'next/dynamic';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import FormSummary from '@/app/shared/multi-step/multi-step-1/form-summary';
import RangeSlider, { RangeSliderProps } from '@/components/ui/range-slider';
import { Tooltip } from '@/components/ui/tooltip';
import { toCurrency } from '@/utils/to-currency';
import Spinner from '@/components/ui/spinner';
import { Input } from '@/components/ui/input';
import { Text } from '@/components/ui/text';
import { MdDocumentScanner } from 'react-icons/md';
import {
  formDataAtom,
  useStepperOne,
} from '@/app/shared/multi-step/multi-step-1';
import {
  formStep7Schema,
  FormStep7Schema,
} from '@/utils/validators/multistep-form.schema';
import UploadZone from '@/components/ui/file-upload/upload-zone';
import { Checkbox, Select } from 'rizzui';
import { FaTruck } from 'react-icons/fa';
import { IoMdMail } from 'react-icons/io';
import { FaShop } from 'react-icons/fa6';

const QuillEditor = dynamic(() => import('@/components/ui/quill-editor'), {
  ssr: false,
  loading: () => (
    <div className="grid h-[169px] place-content-center">
      <Spinner />
    </div>
  ),
});

export default function StepTwo() {
  const { step, gotoNextStep } = useStepperOne();
  const [formData, setFormData] = useAtom(formDataAtom);

  const {
    register,
    control,
    setValue,
    getValues,
    formState: { errors },
    handleSubmit,
  } = useForm<FormStep7Schema>({
    resolver: zodResolver(formStep7Schema),
    defaultValues: {
      propertyName: formData.propertyName,
      propertyDescription: formData.propertyDescription,
      priceRange: formData.priceRange,
      photos: formData.photos,
    },
  });

  const onSubmit: SubmitHandler<FormStep7Schema> = (data) => {
    console.log('data', data);
    setFormData((prev: any) => ({
      ...prev,
      propertyName: data.propertyName,
      propertyDescription: data.propertyDescription,
      priceRange: data.priceRange,
      photos: data.photos,
    }));
    console.log('formData', formData);
    gotoNextStep();
  };

  return (
    <>
      <div className="col-span-full flex flex-col justify-center @5xl:col-span-5">
        <FormSummary
          title="Unveiling the Essence: Explore Captivating Property Details"
          description="Your property is more than just walls and spaces – it's a canvas of memories waiting to be painted. Sharing the intricate details with us helps craft a captivating listing."
        />
      </div>
      <div className="col-span-full flex items-center justify-center @5xl:col-span-7">
        <form
          id={`rhf-${step.toString()}`}
          onSubmit={handleSubmit(onSubmit)}
          className="grid flex-grow gap-6 rounded-lg bg-white p-5 @4xl:p-7 dark:bg-gray-0"
        >
          <Text className="font-semibold text-gray-900">
            Your Personal Delivery Partner
          </Text>
          <Text className="cursor-pointer font-semibold text-green-600">
            View Hint
          </Text>
          <div className="col-span-full grid gap-4 rounded-lg @2xl:grid-cols-2  @4xl:col-span-8 @4xl:gap-5 xl:gap-7">
            <Select
              options={[
                {
                  label: 'Yes',
                  value: 'Yes',
                },
                {
                  label: 'No',
                  value: 'No',
                },
              ]}
              label="Do you have personal delivery partner"
              className="col-span-full"
            />
            <Input
              prefix={<FaTruck className="h-4 w-4" />}
              label="Name (if you have)"
              placeholder="Name of Delivery Partner"
            />
            <Input label="Rate (per order)" placeholder="Rate" type="number" />
          </div>
          <Text className="font-semibold text-gray-900">
            Our Delivery Partner
          </Text>
          <div className="col-span-full grid gap-4 rounded-lg @2xl:grid-cols-2  @4xl:col-span-8 @4xl:gap-5 xl:gap-7">
            <Input
              prefix={<IoMdMail className="h-4 w-4" />}
              label="Email"
              placeholder="Email"
              type="email"
            />
            <Input label="Password" placeholder="Password" type="text" />
          </div>
          <Text className="font-semibold text-gray-900">
            Delivery Partner Warehouse
          </Text>
          <div className="col-span-full grid gap-4 rounded-lg @2xl:grid-cols-2  @4xl:col-span-8 @4xl:gap-5 xl:gap-7">
            <Input
              prefix={<FaShop className="h-4 w-4" />}
              label="Warehouse Name"
              placeholder="Warehouse Name"
              type="text"
            />
            <Input label="Name" placeholder="Name" type="text" />
            <Input label="Address" placeholder="Address" type="text" />
            <Input label="Address 2" placeholder="Address 2" type="text" />
            <Input label="City" placeholder="City" type="text" />
            <Input label="State" placeholder="State" type="text" />
            <Input label="Pincode" placeholder="Pincode" type="text" />
          </div>
          <br />
        </form>
      </div>
    </>
  );
}
