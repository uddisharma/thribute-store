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
import {
  BaseApi,
  coupons,
  couponsPerPage,
  deleteCoupon,
  updateCoupon,
} from '@/constants';
import CouponLoadingPage from '@/component/loading/coupons';
import { toast } from 'sonner';
import { RiCoupon2Line } from 'react-icons/ri';
import DeletedCouponsTable from '@/component/coupons/deleted/table';
import { fetcher } from '@/constants/fetcher';
import { useCookies } from 'react-cookie';
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
    `${BaseApi}${coupons}?page=${page}&limit=${couponsPerPage}&isDeleted=${true}`,
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

  const onDelete = async (id: string) => {
    try {
      await axios.delete(`${BaseApi}${deleteCoupon}/${id}`, {
        headers: {
          Authorization: `Bearer ${cookies?.sellertoken}`,
        },
      });
      await mutate();
      return toast.success('Coupon is Permanently Deleted Successfully !');
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

  const temperoryDelete = async (id: string) => {
    try {
      await axios.patch(
        `${BaseApi}${updateCoupon}/${id}`,
        {
          isDeleted: false,
        },
        {
          headers: {
            Authorization: `Bearer ${cookies?.sellertoken}`,
          },
        }
      );
      await mutate();
      return toast.success('Coupon is Recycled Successfully !');
    } catch (error: any) {
      if (error?.response?.data?.status == 'UNAUTHORIZED') {
        localStorage.removeItem('seller');
        toast.error('Session Expired');
        const currentUrl = window.location.href;
        const path = extractPathAndParams(currentUrl);
        if (typeof window !== 'undefined') {
          location.href = `/auth/sign-in?ref=${path}`;
        }
      }
      console.log(error);
      return toast.error('Something went wrong');
    }
  };

  const coupons1: any = [];

  const pageHeader = {
    title: `Deleted Coupons (${pagininator?.itemCount ?? 0})`,
    breadcrumb: [
      {
        href: '/',
        name: 'Home',
      },
      {
        href: '/',
        name: 'Banners',
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
            fileName="deleted_coupons_data"
            header=""
            className="w-full @lg:w-auto"
          />
          <Link href={`/coupons/create`} className="w-full @lg:w-auto">
            <Button
              tag="span"
              className="w-full @lg:w-auto dark:bg-gray-100 dark:text-white dark:active:bg-gray-100"
            >
              <PiPlusBold className="me-1.5 h-[17px] w-[17px]" />
              Add Coupon
            </Button>
          </Link>
          <Link href={`/coupons`} className="w-full @lg:w-auto">
            <Button className="w-full gap-2 @lg:w-auto" variant="outline">
              <RiCoupon2Line className="me-1.5 h-[17px] w-[17px]" />
              View All
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
        <DeletedCouponsTable
          key={Math.random()}
          data={data}
          onDeleteItem={onDelete}
          temperoryDelete={temperoryDelete}
        />
      ) : (
        <DeletedCouponsTable
          key={Math.random()}
          data={coupons1}
          onDeleteItem={onDelete}
          temperoryDelete={temperoryDelete}
        />
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
