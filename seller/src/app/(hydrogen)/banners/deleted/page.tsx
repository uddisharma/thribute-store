'use client';
import PageHeader from '@/component/others/pageHeader';
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
  bannerPerPage,
  banners,
  deleteBanner,
  softDeleteBanner,
} from '@/constants';
import { toast } from 'sonner';
import BannerLoading from '@/component/loading/bannerLoading';
import { AiFillPicture } from 'react-icons/ai';
import Card3 from '@/component/banner/card2';
import { useCookies } from 'react-cookie';
import { fetcher } from '@/constants/fetcher';
import { extractPathAndParams } from '@/utils/urlextractor';

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
    `${BaseApi}${banners}?page=${page}&limit=${bannerPerPage}&isDeleted=${true}`,
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

  const downloadablebanners = data?.map((e: any) => {
    return {
      desktopBanner: e?.images[0]?.desktop?.url,
      phoneBanner: e?.images[0]?.mobile?.url,
      redirectLink: e?.redirectLink,
      isActive: e?.isDeleted ? 'No' : 'Yes',
    };
  });

  const onDelete = async (id: any) => {
    try {
      await axios.delete(`${BaseApi}${deleteBanner}/${id}`, {
        headers: {
          Authorization: `Bearer ${cookies?.sellertoken}`,
        },
      });
      await mutate();
      return toast.success('Banner is Permanently Deleted Successfully !');
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
  const onTemperoryDelete = async (id: string) => {
    try {
      await axios.patch(
        `${BaseApi}${softDeleteBanner}/${id}`,
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
      return toast.success('Banner is Recycle Successfully !');
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

  const pageHeader = {
    title: `Deleted Banners (${pagininator?.itemCount ?? 0})`,
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
            data={downloadablebanners}
            fileName="deleted_banners_data"
            header=""
            className="w-full @lg:w-auto"
          />
          <Link href={`/banners/create`} className="w-full @lg:w-auto">
            <Button tag="span" className="w-full @lg:w-auto" variant="outline">
              <PiPlusBold className="me-1.5 h-[17px] w-[17px]" />
              Add Banner
            </Button>
          </Link>
          <Link href={`/banners`} className="w-full @lg:w-auto">
            <Button className="w-full gap-2 @lg:w-auto" variant="outline">
              <AiFillPicture className="me-1.5 h-[17px] w-[17px]" />
              View All
            </Button>
          </Link>
        </div>
      </PageHeader>

      {isLoading ? (
        [1, 2, 3, 4, 5]?.map((e) => (
          <div key={e} className="mt-4">
            <BannerLoading />
          </div>
        ))
      ) : error ? (
        <div style={{ paddingBottom: '100px' }}>
          <Empty
            image={<SearchNotFoundIcon />}
            text="Something Went Wrong !"
            className="h-full justify-center"
          />
        </div>
      ) : data ? (
        data.map((e: any) => (
          <Card3
            data={e}
            onDelete={onDelete}
            onTemperoryDelete={onTemperoryDelete}
            key={e}
          />
        ))
      ) : (
        <div style={{ paddingBottom: '100px' }}>
          <Empty
            image={<SearchNotFoundIcon />}
            text="No Banner Found !"
            className="h-full justify-center"
          />
        </div>
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
            pageSize={bannerPerPage}
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