'use client';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/component/ui/button';
import WelcomeBanner from '@/component/banners/welcome';
import StatCards from './stat-cards';
import TotalStats from './total-stats';
import RevenueStats from './revenue-stats';
import OrderStats from './order-stats1';
import { PiPlusBold } from 'react-icons/pi';
import welcomeImg from '@public/shop-illustration.png';
import HandWaveIcon from '@/component/icons/hand-wave';
import { formatNumber } from '@/utils/format-number';
import useSWR from 'swr';
import { BaseApi, errorRetry, totalCounts } from '@/constants';
import { useParams } from 'next/navigation';
import { useCookies } from 'react-cookie';
import { fetcher } from '@/constants/fetcher';
import { toast } from 'sonner';
import { extractPathAndParams } from '@/utils/urlextractor';
import { useModal } from '@/component/modal-views/use-modal';
import { SellerOptions } from '@/component/cards/metric-card1';

export default function SellerDashboard() {
  function getGreeting() {
    const now = new Date();
    const hours = now.getHours();
    const morningEnd = 12;
    const afternoonEnd = 16;
    const eveningEnd = 19;
    if (hours < morningEnd) {
      return 'Good Morning';
    } else if (hours < afternoonEnd) {
      return 'Good Afternoon';
    } else if (hours < eveningEnd) {
      return 'Good Evening';
    } else {
      return 'Good Night';
    }
  }

  const params = useParams();
  const { openModal } = useModal();

  const [cookies] = useCookies(['admintoken']);

  let {
    data: data1,
    isLoading,
    error,
  } = useSWR(
    `${BaseApi}${totalCounts}/${params?.seller}`,
    (url) => fetcher(url, cookies.admintoken),
    {
      refreshInterval: 3600000,
      revalidateOnMount: true,
      revalidateOnFocus: true,
      onErrorRetry({ retrycount }: any) {
        if (retrycount > errorRetry) {
          return false;
        }
      },
    }
  );

  const authstatus = error?.response?.data?.status == 'UNAUTHORIZED' && true;

  const revenue = data1?.data?.revenue;
  const orders = data1?.data?.orders;
  const products = data1?.data?.products;
  const coupons = data1?.data?.coupons;
  const tickets = data1?.data?.tickets;
  const Categorycount = data1?.data?.Categorycount;

  const data = [
    {
      name: 'Total Revenue',
      value: `₹${revenue ? formatNumber(revenue) : 0}`,
      percentage: 75,
      color: '#3872FA',
    },
    {
      name: 'Total Orders',
      value: `${orders ? formatNumber(orders) : 0}`,
      percentage: 60,
      color: '#10b981',
    },
    {
      name: 'Selling Products',
      value: `${products ? formatNumber(products) : 0}`,
      percentage: 50,
      color: '#f1416c',
    },
    {
      name: 'Selling Categories',
      value: `${coupons ? formatNumber(Categorycount) : 0}`,
      percentage: 50,
      color: '#f1416c',
    },
    {
      name: 'Total Coupons',
      value: `${coupons ? formatNumber(coupons) : 0}`,
      percentage: 60,
      color: '#10b981',
    },
    {
      name: 'Total Tickets',
      value: `${tickets ? formatNumber(tickets) : 0}`,
      percentage: 75,
      color: '#3872FA',
    },
  ];

  if (authstatus) {
    localStorage.removeItem('admin');
    toast.error('Session Expired');
    const currentUrl = window.location.href;
    const path = extractPathAndParams(currentUrl);
    if (typeof window !== 'undefined') {
      location.href = `/auth/sign-in?ref=${path}`;
    }
  }

  return (
    <div className="@container">
      <div className="grid grid-cols-1 gap-6 @4xl:grid-cols-2 @7xl:grid-cols-12 3xl:gap-8">
        <WelcomeBanner
          title={
            <>
              {getGreeting()},{'  '}
              {/* {state?.user != null && state?.user?.shopname + ' '} */}
              <HandWaveIcon className="inline-flex h-8 w-8" />
            </>
          }
          description={
            'Here’s What happening on your store today. See the statistics at once.'
          }
          media={
            <div className="absolute -bottom-6 end-4 hidden w-[300px] @2xl:block lg:w-[320px] 2xl:-bottom-7 2xl:w-[330px]">
              <div className="relative">
                <Image
                  src={welcomeImg}
                  alt="Welcome shop image form freepik"
                  className="dark:brightness-95 dark:drop-shadow-md"
                />
              </div>
            </div>
          }
          contentClassName="@2xl:max-w-[calc(100%-340px)]"
          className="border border-gray-200 bg-gray-0 pb-8 @4xl:col-span-2 @7xl:col-span-8 lg:pb-9 dark:bg-gray-100/30"
        >
         
            <Button
             onClick={() => {
              openModal({
                view: <SellerOptions seller={params?.seller} />,
                customSize: '1000px',
              });
            }}
              tag="span"
              className="h-[38px] shadow md:h-10 dark:bg-gray-100 dark:text-gray-900 cursor-pointer"
            >
              <PiPlusBold className="me-1 h-4 w-4" /> View Options
            </Button>
          
        </WelcomeBanner>
        {/* stats */}

        <StatCards className="@2xl:grid-cols-3 @3xl:gap-6 @4xl:col-span-2 @7xl:col-span-8" />

        {/* total things */}

        <TotalStats
          data={data?.slice(0, 3)}
          isLoading={isLoading}
          error={error}
          heading="Total Numbers"
          footer="Revenue Orders and Products"
          className="h-[300px] @sm:h-[360px] @7xl:col-span-4 @7xl:col-start-9 @7xl:row-start-1 @7xl:row-end-3 @7xl:h-[300px]"
        />

        <TotalStats
          data={data?.slice(3, 6)}
          isLoading={isLoading}
          error={error}
          heading="Total Numbers"
          footer="Categories Coupons and Tickets"
          className="h-[300px] @sm:h-[360px] @7xl:col-span-4 @7xl:col-start-9 @7xl:row-start-1 @7xl:row-end-3 @7xl:h-[300px]"
        />

        {/* month wise revenue stats */}
        <OrderStats className="@4xl:col-span-2 @7xl:col-span-8" />
        <RevenueStats className="@4xl:col-span-2 @7xl:col-span-8" />

        {/* month/days order stats */}
        {/* <OrderStats className="@4xl:col-start-2 @4xl:row-start-3 @7xl:col-span-4 @7xl:col-start-auto @7xl:row-start-auto" /> */}
      </div>
    </div>
  );
}
