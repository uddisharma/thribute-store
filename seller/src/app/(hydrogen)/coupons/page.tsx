'use client';
import PageHeader from '@/component/others/pageHeader';
import { metaObject } from '@/config/site.config';
import ExportButton from '@/component/others/export-button';
import Pagination from '@/component/ui/pagination';
import Link from 'next/link';
import { Button, Empty, SearchNotFoundIcon } from 'rizzui';
import { PiPlusBold } from 'react-icons/pi';
import { useFilterControls } from '@/hooks/use-filter-control';
import { useState } from 'react';
import axios from 'axios';
import useSWR from 'swr';
import { BaseApi, coupons, couponsPerPage, updateCoupon } from '@/constants';
import CouponsTable from '@/component/coupons/table';
import CouponLoadingPage from '@/component/loading/coupons';
import { toast } from 'sonner';
import { MdOutlineAutoDelete } from 'react-icons/md';
import { useCookies } from 'react-cookie';
import { fetcher } from '@/constants/fetcher';
import { extractPathAndParams } from '@/utils/urlextractor';
const metadata = {
  ...metaObject('Coupons'),
};

export default function Coupons() {
  const initialState = {
    page: '',
  };
  const { state: st, paginate } = useFilterControls<typeof initialState, any>(
    initialState
  );
  const [page, setPage] = useState(st?.page ? st?.page : 1);

  const [cookies] = useCookies(['sellertoken']);

  let { data, isLoading, error, mutate } = useSWR(
    `${BaseApi}${coupons}?page=${page}&limit=${couponsPerPage}&isDeleted=${false}`,
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

  const pagininator = data?.data?.paginator;
  data = data?.data?.data;

  const downlaodablecoupons = data?.map((e: any) => {
    return {
      CouponCode: e?.code,
      DiscountType: e?.discount_type,
      Discount: e?.discount,
      isActive: e?.isDeleted ? 'No' : 'Yes',
    };
  });

  const onDelete = async (id: any) => {
    try {
      await axios.patch(
        `${BaseApi}${updateCoupon}/${id}`,
        {
          isDeleted: true,
        },
        {
          headers: {
            Authorization: `Bearer ${cookies?.sellertoken}`,
          },
        }
      );
      await mutate();
      return toast.success('Coupon is Temperory Deleted Successfully !');
    } catch (error: any) {
      console.log(error);
      if (error?.response?.data?.status == 'UNAUTHORIZED') {
        localStorage.removeItem('seller');
        toast.error('Session Expired');
        const currentUrl = window.location.href;
        const path = extractPathAndParams(currentUrl);
        if (typeof window !== 'undefined') {
          location.href = `/auth/sign-in?ref=${path}`;
        }
      }
      return toast.error('Something went wrong');
    }
  };
  const coupons1: any = [];

  const pageHeader = {
    title: `Coupons (${pagininator?.itemCount ?? 0})`,
    breadcrumb: [
      {
        href: '/',
        name: 'Home',
      },
      {
        href: '/',
        name: 'Coupons',
      },
      {
        name: 'List',
      },
    ],
  };

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
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        <div className="mt-4 flex flex-col gap-3 @lg:flex-row @lg:mt-0">
          <ExportButton
            data={downlaodablecoupons}
            fileName="coupons_data"
            header=""
            className="w-full @lg:w-auto"
          />
          <Link href={'coupons/create'} className="w-full @lg:w-auto">
            <Button
              tag="span"
              className="w-full @lg:w-auto"
              variant='outline'
            >
              <PiPlusBold className="me-1.5 h-[17px] w-[17px]" />
              Add Coupon
            </Button>
          </Link>
          <Link href={`/coupons/deleted`} className="w-full @lg:w-auto">
            <Button className="w-full gap-2 @lg:w-auto" variant="outline">
              <MdOutlineAutoDelete className="h-4 w-4" />
              Deleted
            </Button>
          </Link>
        </div>
      </PageHeader>

      {isLoading ? (
        <CouponLoadingPage />
      ) : error ? (
        <div style={{ paddingBottom: '100px' }}>
          <Empty
            image={<SearchNotFoundIcon />}
            text="Something Went Wrong !"
            className="h-full justify-center"
          />
        </div>
      ) : data ? (
        <CouponsTable key={Math.random()} data={data} onDelete={onDelete} />
      ) : (
        <CouponsTable key={Math.random()} data={coupons1} onDelete={onDelete} />
      )}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          margin: 'auto',
          marginTop: '50px',
          width: '100%',
        }}
      >
        {pagininator && (
          <Pagination
            total={Number(pagininator?.itemCount)}
            pageSize={couponsPerPage}
            defaultCurrent={page}
            showLessItems={true}
            prevIconClassName="py-0 text-gray-500 !leading-[26px]"
            nextIconClassName="py-0 text-gray-500 !leading-[26px]"
            onChange={(e) => {
              setPage(e);
              paginate(e);
            }}
          />
        )}
      </div>
    </>
  );
}
