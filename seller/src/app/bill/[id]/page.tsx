'use client';
import Bill from '@/component/label/bill/page';
import Spinner from '@/component/ui/spinner';
import { BaseApi, singleOrder } from '@/constants';
import { fetcher } from '@/constants/fetcher';
import { extractPathAndParams } from '@/utils/urlextractor';
import { useParams } from 'next/navigation';
import React from 'react';
import { useCookies } from 'react-cookie';
import { Text } from 'rizzui';
import { toast } from 'sonner';
import useSWR from 'swr';

const Page = () => {
  const params = useParams();

  const [cookies] = useCookies(['sellertoken']);

  let {
    data: data1,
    isLoading,
    error,
  } = useSWR(
    `${BaseApi}${singleOrder}/${params?.id}`,
    (url) => fetcher(url, cookies.sellertoken),
    {
      refreshInterval: 3600000,
      revalidateOnMount: true,
      revalidateOnFocus: true,
      onErrorRetry({ retrycount }: any) {
        if (retrycount > 3) {
          return false;
        }
      },
    }
  );
  const authstatus = error?.response?.data?.status == 'UNAUTHORIZED' && true;

  const orderData = data1?.data;

  if (authstatus) {
    localStorage.removeItem('seller');
    toast.error('Session Expired');
    const currentUrl = window.location.href;
    const path = extractPathAndParams(currentUrl);
    if (typeof window !== 'undefined') {
      location.href = `/auth/sign-in?ref=${path}`;
    }
  }

  return (
    <div>
      {isLoading ? (
        <Spinner />
      ) : error ? (
        <Text className="mt-10 text-center">Something went wrong</Text>
      ) : (
        orderData && <Bill data={orderData} />
      )}
    </div>
  );
};

export default Page;
