'use client';
import { useAtom } from 'jotai';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import {
  formDataAtom,
  useStepperOne,
} from '@/app/shared/multi-step/multi-step-1';
import FormSummary from '@/app/shared/multi-step/multi-step-1/form-summary';
import { Text } from '@/components/ui/text';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import {
  FormStep6Schema,
  formStep6Schema,
} from '@/utils/validators/multistep-form.schema';
import { Input } from 'rizzui';
import { PhoneNumber } from '@/components/ui/phone-input';
import { FaHouseUser } from 'react-icons/fa';
import { IoMdMail } from 'react-icons/io';
import { FaLocationDot } from 'react-icons/fa6';

export const placeInfoValues = {
  indoorAmenities: [],
  outdoorAmenities: [],
};

export default function StepTwo() {
  const [formData, setFormData] = useAtom(formDataAtom);
  const { step, gotoNextStep } = useStepperOne();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormStep6Schema>({
    resolver: zodResolver(formStep6Schema),
    defaultValues: {
      indoorAmenities: formData.indoorAmenities,
      outdoorAmenities: formData.outdoorAmenities,
    },
  });

  useEffect(() => {
    if (errors.indoorAmenities) {
      toast.error(errors.indoorAmenities.message as string);
    }
  }, [errors]);

  const onSubmit: SubmitHandler<FormStep6Schema> = (data) => {
    console.log('data', data);
    setFormData((prev: any) => ({
      ...prev,
      indoorAmenities: data.indoorAmenities,
      outdoorAmenities: data.outdoorAmenities,
    }));
    // console.log('formData', formData);
    gotoNextStep();
  };

  return (
    <>
      <div className="col-span-full flex flex-col justify-center @5xl:col-span-4 @6xl:col-span-5">
        <FormSummary
          title="Let us know what your place has to offer!"
          description="Your home is an extension of your personality, a haven filled with your unique touches and style. By sharing details, allows us to tailor our services & recommendations."
        />
      </div>

      <div className="col-span-full flex items-center justify-center @5xl:col-span-8 @6xl:col-span-7">
        <form
          id={`rhf-${step.toString()}`}
          onSubmit={handleSubmit(onSubmit)}
          className="grid flex-grow gap-6 rounded-lg bg-white p-5 @4xl:p-7 dark:bg-gray-0"
        >
          <Text className="font-semibold text-gray-900">
            Owner Personal Details
          </Text>
          <div className="col-span-full grid gap-4 rounded-lg @2xl:grid-cols-2  @4xl:col-span-8 @4xl:gap-5 xl:gap-7">
            <Input
              prefix={<FaHouseUser className="h-4 w-4" />}
              label="Name"
              placeholder="Owner Name"
              className="col-span-full"
            />
            <Input
              prefix={<IoMdMail className="h-4 w-4" />}
              label="Email"
              placeholder="Owner Email"
              type="email"
            />
            <Controller
              name="propertyName"
              control={control}
              render={({ field: { value, onChange } }: any) => (
                <PhoneNumber
                  label="Phone Number"
                  country="in"
                  value={value}
                  onChange={onChange}
                  placeholder="Owner Phone Number"
                />
              )}
            />
          </div>
          <Text className="mt-5 font-semibold text-gray-900">
            Owner Address Details
          </Text>
          <div className="col-span-full grid gap-4 rounded-lg @2xl:grid-cols-2  @4xl:col-span-8 @4xl:gap-5 xl:gap-7">
            <Input
              prefix={<FaLocationDot className="h-4 w-4" />}
              label="Address 1"
              placeholder="Address 1"
            />
            <Input
              // prefix={<FaLocationDot className="h-4 w-4" />}
              label="Address 2"
              placeholder="Address 2"
              type="text"
            />

            <Input
              // prefix={<FaLocationDot className="h-4 w-4" />}
              label="Landmark"
              placeholder="Landmark"
              type="text"
            />

            <Input
              // prefix={<FaLocationDot className="h-4 w-4" />}
              label="Pincode"
              placeholder="Pincode"
              type="number"
              maxLength={6}
            />
            <Input
              // prefix={<FaLocationDot className="h-4 w-4" />}
              label="City"
              placeholder="City"
              type="text"
            />
            <Input
              // prefix={<FaLocationDot className="h-4 w-4" />}
              label="State"
              placeholder="State"
              type="text"
            />
          </div>
          <br />
        </form>
      </div>
    </>
  );
}
