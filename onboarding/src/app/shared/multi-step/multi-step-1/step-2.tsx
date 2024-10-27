'use client';

import { z } from 'zod';
import { useEffect } from 'react';
import { useAtom, useSetAtom } from 'jotai';
import { toast } from 'react-hot-toast';
import { atomWithStorage } from 'jotai/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { AdvancedRadio, RadioGroup } from '@/components/ui/advanced-radio';
import HouseIcon from '@/components/icons/house';
import ApartmentIcon from '@/components/icons/apartment';
import BarnIcon from '@/components/icons/barn';
import SkyscraperIcon from '@/components/icons/skyscraper';
import TentIcon from '@/components/icons/tent';
import CabinIcon from '@/components/icons/cabin';
import CastleIcon from '@/components/icons/castle';
import CaveIcon from '@/components/icons/cave';
import ContainerHouseIcon from '@/components/icons/container-house';
import MobileHomeIcon from '@/components/icons/mobile-home';
import HouseBoatIcon from '@/components/icons/house-boat';
import FarmHouseIcon from '@/components/icons/farm-house';
import FormSummary from '@/app/shared/multi-step/multi-step-1/form-summary';
import { FaHouseUser, FaFacebook, FaYoutube } from 'react-icons/fa';
import { IoMdMail } from 'react-icons/io';
import {
  formDataAtom,
  useStepperOne,
} from '@/app/shared/multi-step/multi-step-1';
import {
  PropertyTypeSchema,
  propertyTypeSchema,
} from '@/utils/validators/multistep-form.schema';
import { Input, Textarea } from 'rizzui';
import FormGroup from '../../form-group';
import { PhoneNumber } from '@/components/ui/phone-input';

import { LuInstagram } from 'react-icons/lu';
import AvatarUpload from '@/components/ui/file-upload/avatar-upload';



export default function StepTwo() {
  const { step, gotoNextStep } = useStepperOne();
  const [formData, setFormData] = useAtom(formDataAtom);

  const {
    control,
    formState: { errors },
    setValue,
    getValues,
    handleSubmit,
  } = useForm<PropertyTypeSchema>({
    resolver: zodResolver(propertyTypeSchema),
    defaultValues: {
      propertyType: formData.propertyType,
    },
  });

  useEffect(() => {
    if (errors.propertyType) {
      toast.error(errors.propertyType.message as string);
    }
  }, [errors]);

  const onSubmit: SubmitHandler<PropertyTypeSchema> = (data) => {
    console.log('data', data);
    setFormData((prev: any) => ({
      ...prev,
      propertyType: data.propertyType,
    }));
    gotoNextStep();
  };

  return (
    <>
      <div className="col-span-full flex flex-col justify-center @5xl:col-span-5">
        <FormSummary
          className="@7xl:me-10"
          title="Which of these best describes your place?"
          description="Your property is unique and holds countless stories within its walls. We're eager to learn more about it so we can help you showcase its best features to potential buyers or tenants."
        />
      </div>

      <div className="col-span-full flex items-center justify-center @5xl:col-span-7">
        <form
          id={`rhf-${step.toString()}`}
          onSubmit={handleSubmit(onSubmit)}
          className="flex-grow rounded-lg bg-white p-5 @4xl:p-7 dark:bg-gray-0"
        >
          {/* <>
            <Controller
              name="propertyType"
              control={control}
              render={({ field: { value, onChange } }) => (
                <RadioGroup
                  value={value}
                  setValue={onChange}
                  className="col-span-full grid grid-cols-2 gap-4 @3xl:grid-cols-3 @4xl:gap-6 @6xl:grid-cols-3"
                >
                  {properties.map((property) => (
                    <AdvancedRadio
                      key={property.name}
                      value={property.name}
                      className=" [&_.rizzui-advanced-checkbox]:px-6 [&_.rizzui-advanced-checkbox]:py-6"
                      inputClassName="[&~span]:border-0 [&~span]:ring-1 [&~span]:ring-gray-200 [&~span:hover]:ring-primary [&:checked~span:hover]:ring-primary [&:checked~span]:border-1 [&:checked~.rizzui-advanced-checkbox]:ring-2 [&~span_.icon]:opacity-0 [&:checked~span_.icon]:opacity-100"
                    >
                      <span className="mb-4 block h-8 w-8 [&_svg]:w-8">
                        {property.icon}
                      </span>
                      <span className="font-semibold">{property.label}</span>
                    </AdvancedRadio>
                  ))}
                </RadioGroup>
              )}
            />
          </> */}
          <div className="col-span-full grid gap-4 rounded-lg @2xl:grid-cols-2 @2xl:pt-9 @3xl:pt-4 @4xl:col-span-8 @4xl:gap-5 xl:gap-7">
            <Input
              prefix={<FaHouseUser className="h-4 w-4" />}
              label="Shop Name"
              placeholder="Shop Name"
              className="col-span-full"
            />
            <Input
              prefix={<FaHouseUser className="h-4 w-4" />}
              label="Username (must be unique)"
              placeholder="Username"
              type="text"
            />

            <Input
              prefix={<IoMdMail className="h-4 w-4" />}
              label="Email"
              placeholder="Email"
              type="email"
            />
            <Controller
              name="propertyType"
              control={control}
              render={({ field: { value, onChange } }) => (
                <PhoneNumber
                  label="Phone Number"
                  country="in"
                  value={value}
                  onChange={onChange}
                  placeholder="Phone Number"
                />
              )}
            />
            <Controller
              name="propertyType"
              control={control}
              render={({ field: { value, onChange } }) => (
                <PhoneNumber
                  label="Alternate Phone Number"
                  country="in"
                  value={value}
                  onChange={onChange}
                  placeholder="Alternate Phone Number"
                />
              )}
            />
            <Textarea
              className="col-span-full"
              label="Description"
              placeholder="Write about your shop..."
            />
            <div className="grid-container1 col-span-full rounded-lg border border-gray-300 p-4">
              <div className="m-auto mt-14">
                <h4 className="text-base font-medium">Shop Banner</h4>
                <p className="mt-2">This will be displayed on your profile.</p>
              </div>
              <div className="m-auto ">
                <AvatarUpload
                  name="avatar"
                  setValue={setValue}
                  getValues={getValues}
                />
              </div>
            </div>
          </div>
          <div className="mx-auto mb-10 grid w-full max-w-screen-2xl gap-7 divide-y divide-dashed divide-gray-200 @2xl:gap-9 @3xl:gap-11">
            <FormGroup
              title="Facebook"
              className="pt-7 @2xl:pt-9 @3xl:grid-cols-12 @3xl:pt-11"
              description=""
            >
              <Input
                prefix={<FaFacebook className="h-4 w-4 text-gray-500" />}
                type="url"
                className="col-span-full"
                placeholder="https://facebook.com"
              />
            </FormGroup>
            <FormGroup
              title="Instagram"
              className="pt-7 @2xl:pt-9 @3xl:grid-cols-12 @3xl:pt-11"
              description=""
            >
              <Input
                prefix={<LuInstagram className="h-4 w-4 text-gray-500" />}
                type="url"
                className="col-span-full"
                placeholder="https://instagram.com"
              />
            </FormGroup>
            <FormGroup
              title="Youtube"
              className="pt-7 @2xl:pt-9 @3xl:grid-cols-12 @3xl:pt-11"
              description=""
            >
              <Input
                prefix={<FaYoutube className="h-4 w-4 text-gray-500" />}
                type="url"
                className="col-span-full"
                placeholder="https://youtube.com"
              />
            </FormGroup>
          </div>
          <br />
        </form>
      </div>
    </>
  );
}
