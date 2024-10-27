// import Image from 'next/image';
// import { useForm } from 'react-hook-form';
// import homeFront from '@public/home-front.png';
// import FormSummary from '@/app/shared/multi-step/multi-step-1/form-summary';
// import { useStepperOne } from '@/app/shared/multi-step/multi-step-1';

// export default function StepOne() {
//   const { step, gotoNextStep } = useStepperOne();

//   const { handleSubmit } = useForm();

//   const onSubmit = () => {
//     gotoNextStep();
//   };

//   return (
//     <>
//       <div className="col-span-full flex flex-col justify-center @4xl:col-span-5">
//         <FormSummary
//           descriptionClassName="@7xl:me-10"
//           title="Tell us about your place"
//           description="In this step, we'll ask you which type of property you have and if guests will book the entire place or just a room"
//         />
//       </div>

//       <form
//         id={`rhf-${step.toString()}`}
//         onSubmit={handleSubmit(onSubmit)}
//         className="col-span-full grid aspect-[4/3] gap-4 @3xl:grid-cols-12 @4xl:col-span-7 @5xl:gap-5 @7xl:gap-8"
//       >
//         <Image
//           src={homeFront}
//           alt="home front part 1"
//           className="mt-auto rounded-lg object-cover object-left-top @3xl:col-span-4 @3xl:h-96 @6xl:h-5/6"
//         />
//         <Image
//           src={homeFront}
//           alt="home front part 2"
//           className="my-auto hidden rounded-lg object-cover @3xl:col-span-4 @3xl:block @3xl:h-96 @6xl:h-5/6"
//         />
//         <Image
//           src={homeFront}
//           alt="home front part 3"
//           className="mb-auto hidden rounded-lg object-cover object-right-bottom @3xl:col-span-4 @3xl:block @3xl:h-96 @6xl:h-5/6"
//         />
//       </form>
//     </>
//   );
// }

'use client';

import { z } from 'zod';
import { useEffect, useState } from 'react';
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
import { Button, Input, Password, Switch, Text, Textarea, Title } from 'rizzui';
import FormGroup from '../../form-group';
import { PhoneNumber } from '@/components/ui/phone-input';

import { LuInstagram } from 'react-icons/lu';
import AvatarUpload from '@/components/ui/file-upload/avatar-upload';
import useMedia from 'react-use/lib/useMedia';
import Link from 'next/link';

const properties: { name: string; label: string; icon: React.ReactNode }[] = [
  { name: 'house', label: 'House', icon: <HouseIcon /> },
  { name: 'apartment', label: 'Apartment', icon: <ApartmentIcon /> },
  { name: 'barn', label: 'Barn', icon: <BarnIcon /> },
  { name: 'tower', label: 'Tower', icon: <SkyscraperIcon /> },
  { name: 'tent', label: 'Tent', icon: <TentIcon /> },
  { name: 'cabin', label: 'Cabin', icon: <CabinIcon /> },
  { name: 'castle', label: 'Castle', icon: <CastleIcon /> },
  { name: 'cave', label: 'Cave', icon: <CaveIcon /> },
  { name: 'container', label: 'Container', icon: <ContainerHouseIcon /> },
  { name: 'mobile-home', label: 'Mobile Home', icon: <MobileHomeIcon /> },
  // { name: 'hotel', label: 'Hotel', icon: <HouseIcon /> },
  { name: 'house-boat', label: 'House Boat', icon: <HouseBoatIcon /> },
  // { name: 'tiny-home', label: 'Tiny Home', icon: <HouseIcon /> },
  // { name: 'tree-house', label: 'Tree House', icon: <HouseIcon /> },
  { name: 'farm-house', label: 'Farm House', icon: <FarmHouseIcon /> },
];

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
  const isMedium = useMedia('(max-width: 1200px)', false);
  const isSmall = useMedia('(max-width: 600px)', false);

  const [reset, setReset] = useState({});
  const [loading, setLoading] = useState(false);

  return (
    <>
      <div className="col-span-full flex flex-col justify-center @5xl:col-span-5">
        <FormSummary
          className="@7xl:me-10"
          title="Which of these best describes your place?"
          description="Your property is unique and holds countless stories within its walls. We're eager to learn more about it so we can help you showcase its best features to potential buyers or tenants."
        />
      </div>

      <div
        // style={{
        //   maxHeight: 'calc(100vh - 20px)',
        //   overflowY: 'scroll',
        //   scrollbarWidth: 'thin',
        //   scrollbarColor: 'rgba(0, 0, 0, 0.2) rgba(0, 0, 0, 0.1)',
        // }}
        className="col-span-full flex items-center justify-center @5xl:col-span-7"
      >
        <form
          id={`rhf-${step.toString()}`}
          onSubmit={handleSubmit(onSubmit)}
          className="flex-grow rounded-lg bg-white p-5 @4xl:p-7 dark:bg-gray-0"
        >
          <Title
            as="h2"
            className="mb-5 text-center text-[26px] leading-normal @container md:text-3xl md:!leading-normal lg:mb-7 lg:pe-8 lg:text-3xl  xl:text-[32px] 2xl:pe-0 2xl:text-4xl"
          >
            Welcome back! Secure your account with just a few clicks
          </Title>

          <div className="loginform">
            <Input
              type="email"
              // size={isMedium ? 'lg' : 'xl'}
              label="Email"
              placeholder="Enter your email"
              color="info"
              className="[&>label>span]:font-medium"
            />
            <Password
              label="Password"
              placeholder="Enter your password"
              // size={isMedium ? 'lg' : 'xl'}
              color="info"
              className="mt-5 [&>label>span]:font-medium"
            />
            <div className="mb-5 mt-5 flex items-center justify-between">
              <Switch
                variant="flat"
                label="Remember Me"
                color="info"
                className="[&>label>span]:font-medium [&>label]:my-1"
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
              // size={isMedium ? 'lg' : 'xl'}
              color="primary"
            >
              Sign In
            </Button>
            <Text className="mt-5 text-center text-[15px] leading-loose text-gray-500 lg:mt-5 xl:text-base">
              Don’t have an account?{' '}
              <Link
                href={'/sign-up'}
                className="font-bold text-gray-700 transition-colors hover:text-primary"
              >
                Sign Up
              </Link>
            </Text>
          </div>

          <br />
          <br />

          <br />

          <br />

          <br />

          <br />
          <br />

          <br />
        </form>
      </div>
    </>
  );
}
