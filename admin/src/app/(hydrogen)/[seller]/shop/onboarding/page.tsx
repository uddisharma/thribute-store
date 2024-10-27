'use client';
import React, { useContext, useState } from 'react';
import { Title, Text } from '@/component/ui/text';
import { MdClose } from 'react-icons/md';
import { Button } from '@/component/ui/button';
import { useModal } from '@/component/modal-views/use-modal';
import { ActionIcon } from 'rizzui';
import { PiXBold, PiArrowRightBold } from 'react-icons/pi';
import axios from 'axios';
import {
  BaseApi,
  finalOnboardSeller,
  unOnboardSeller,
  updateSeller,
} from '@/constants';
import { toast } from 'sonner';
import { SellerContext } from '@/store/seller/context';
import { IoCheckmarkDoneOutline } from 'react-icons/io5';
import { useCookies } from 'react-cookie';
import { extractPathAndParams } from '@/utils/urlextractor';

export default function Page() {
  const { openModal } = useModal();
  const { state } = useContext(SellerContext);
  const isActive = state?.seller?.isOnboarded;

  return (
    <div
      className="border-b border-dashed border-gray-200 py-6"
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        rowGap: '20px',
      }}
    >
      <div className="flex items-center gap-6 ">
        <div className='hidden md:block'>
          {!isActive ? (
            <MdClose className="h-7 w-7 text-gray-500" />
          ) : (
            <IoCheckmarkDoneOutline className="h-7 w-7 text-gray-500" />
          )}
        </div>
        <div>
          <div className="mb-2 flex items-center gap-2">
            <Title
              as="h3"
              className="text-base font-medium text-gray-900 dark:text-gray-700"
            >
              {!isActive
                ? 'Onboarding pending for this seller'
                : 'Onboarding completed for this seller'}
            </Title>
            {isActive ? (
              <Text
                as="span"
                className="relative hidden rounded-md border border-gray-200 py-1.5 pe-2.5 ps-5 text-xs font-semibold text-gray-900 before:absolute before:start-2.5 before:top-1/2 before:h-1.5 before:w-1.5 before:-translate-y-1/2 before:rounded-full before:bg-green sm:block"
              >
                Onboarding Completed
              </Text>
            ) : (
              <Text
                as="span"
                className="relative hidden rounded-md border border-gray-200 py-1.5 pe-2.5 ps-5 text-xs font-semibold text-gray-900 before:absolute before:start-2.5 before:top-1/2 before:h-1.5 before:w-1.5 before:-translate-y-1/2 before:rounded-full before:bg-red sm:block"
              >
                Onboarding Pending
              </Text>
            )}
          </div>
          <div className="flex items-center gap-2">
            {isActive ? (
              <Text className="text-sm text-gray-500">
                Seller onboarding completed. Documents verified. Welcome the new
                member !
              </Text>
            ) : (
              <Text className="text-sm text-gray-500">
                Pending onboarding for a seller. Documents awaited. Keep an eye
                on the queue.
              </Text>
            )}
          </div>
          {isActive ? (
            <Text
              as="span"
              className="relative mt-2 inline-block rounded-md border border-gray-200 py-1.5 pe-2.5 ps-5 text-xs font-semibold text-gray-900 before:absolute before:start-2.5 before:top-1/2 before:h-1.5 before:w-1.5 before:-translate-y-1/2 before:rounded-full before:bg-green sm:hidden"
            >
              Onboarding Completed
            </Text>
          ) : (
            <Text
              as="span"
              className="relative mt-2 inline-block rounded-md border border-gray-200 py-1.5 pe-2.5 ps-5 text-xs font-semibold text-gray-900 before:absolute before:start-2.5 before:top-1/2 before:h-1.5 before:w-1.5 before:-translate-y-1/2 before:rounded-full before:bg-red sm:hidden"
            >
              Onboarding Pending
            </Text>
          )}
        </div>
      </div>
      {isActive ? (
        <Button
          style={{
            border: '2px solid red',
            backgroundColor: 'red',
            color: 'white',
          }}
          variant="outline"
          color="danger"
          className="md:ml-[50px]"
          onClick={() =>
            openModal({
              view: <DisableAccount title="Mark as pending onboarding" />,
              customSize: '500px',
            })
          }
        >
          Mark as Pending
        </Button>
      ) : (
        <Button
          style={{
            backgroundColor: '#08bf94',
            color: 'white',
          }}
          variant="outline"
          color="success"
          className="md:ml-[50px]"
          onClick={() =>
            openModal({
              view: <DisableAccount title="Mark as onboarding completed" />,
              customSize: '500px',
            })
          }
        >
          Mark as Completed
        </Button>
      )}
    </div>
  );
}

function DisableAccount({ title }: any) {
  const { closeModal } = useModal();
  const { state, setSeller } = useContext(SellerContext);
  const [loading, setLoading] = useState(false);
  const isActive = state?.seller?.isOnboarded;
  const [cookies] = useCookies(['admintoken']);

  const onSubmit = () => {
    if (isActive == false) {
      setLoading(true);
      axios
        .patch(
          `${BaseApi}${finalOnboardSeller}/${state?.seller?.id}`,
          {
            ...state?.seller,
          },
          {
            headers: {
              Authorization: `Bearer ${cookies?.admintoken}`,
            },
          }
        )
        .then((res) => {
          if (res?.data?.valid == false) {
            return toast.error(res?.data?.errors[0]);
          }
          if (res.data?.status == 'SUCCESS') {
            setSeller(res.data?.data);
            closeModal();
            return toast.success(
              `Account is Onboarded
               Successfully !`
            );
          } else {
            return toast.error('Something went wrong !');
          }
        })
        .catch((err) => {
          console.log(err);
          // if (err?.response?.data?.status == 'UNAUTHORIZED') {
          //   localStorage.removeItem('admin');
          //   const currentUrl = window.location.href;
          //   const path = extractPathAndParams(currentUrl);
          //   if (typeof window !== 'undefined') {
          //     location.href = `/auth/sign-in?ref=${path}`;
          //   }
          //   return toast.error('Session Expired');
          // }
          return toast.error('Something went wrong !');
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(true);
      axios
        .patch(
          `${BaseApi}${unOnboardSeller}/${state?.seller?.id}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${cookies?.admintoken}`,
            },
          }
        )
        .then((res) => {
          if (res.data?.status == 'SUCCESS') {
            setSeller(res.data?.data);
            closeModal();
            return toast.success(
              `Account is Mark as Pending Onboarding Successfully !`
            );
          } else {
            return toast.error('Something went wrong !');
          }
        })
        .catch((err) => {
          console.log(err);
          // if (err?.response?.data?.status == 'UNAUTHORIZED') {
          //   localStorage.removeItem('admin');
          //   const currentUrl = window.location.href;
          //   const path = extractPathAndParams(currentUrl);
          //   if (typeof window !== 'undefined') {
          //     location.href = `/auth/sign-in?ref=${path}`;
          //   }
          //   return toast.error('Session Expired');
          // }
          return toast.error('Something went wrong !');
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };
  return (
    <div className="m-auto px-5 pb-8 pt-5 @lg:pt-6 @2xl:px-7">
      <div className="mb-7 flex items-center justify-between">
        <Title as="h4" className="font-semibold">
          {title}
        </Title>
        <ActionIcon size="sm" variant="text" onClick={() => closeModal()}>
          <PiXBold className="h-auto w-5" />
        </ActionIcon>
      </div>

      <div className="space-y-5">
        <Button
          onClick={onSubmit}
          isLoading={loading}
          className="w-full"
          type="button"
          size="lg"
        >
          <span>Continue</span>{' '}
          <PiArrowRightBold className="ms-2 mt-0.5 h-6 w-6" />
        </Button>
      </div>
    </div>
  );
}
