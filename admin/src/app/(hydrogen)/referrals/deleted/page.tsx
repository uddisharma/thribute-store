'use client';
import PageHeader from '@/component/others/pageHeader';
import { metaObject } from '@/config/site.config';
import ExportButton from '@/component/others/export-button';
import Pagination from '@/component/ui/pagination';
import { useFilterControls } from '@/hooks/use-filter-control';
import { useState } from 'react';
import axios from 'axios';
import useSWR from 'swr';
import {
  BaseApi,
  deleteReferral,
  errorRetry,
  getAllReferrals,
  referralsPerPage,
  updateReferral,
} from '@/constants';
import { Button, Empty, SearchNotFoundIcon } from 'rizzui';
import { toast } from 'sonner';
import Link from 'next/link';
import { PiPlusBold } from 'react-icons/pi';
import { LuScreenShare } from 'react-icons/lu';
import DeletedReferralTable from '@/component/referrals/deleted/table';
import { useCookies } from 'react-cookie';
import { fetcher } from '@/constants/fetcher';
import { extractPathAndParams } from '@/utils/urlextractor';
import ReferralLoadingPage from '@/component/loading/referralsLoading';
const metadata = {
  ...metaObject('Referrals'),
};

export default function Transactions() {
  const initialState = {
    page: '',
  };
  const { state: st, paginate } = useFilterControls<typeof initialState, any>(
    initialState
  );
  const [page, setPage] = useState(st?.page ? st?.page : 1);

  const [cookies] = useCookies(['admintoken']);

  let { data, isLoading, error, mutate } = useSWR(
    `${BaseApi}${getAllReferrals}?page=${page}&limit=${referralsPerPage}&isDeleted=${true}`,
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

  const pagininator = data?.data?.paginator;
  data = data?.data?.data;

  const downloadabeList = data?.map((e: any) => {
    return {
      seller: e?.referredSeller?.shopname,
      user: e?.referringUser?.name,
      amount: e?.amount,
      onboarded: e?.onboarded ? 'Yes' : 'No',
      paid: e?.status ? 'Yes' : 'No',
    };
  });

  const onDelete = async (id: any) => {
    try {
      const res = await axios.patch(
        `${BaseApi}${updateReferral}/${id}`,
        {
          isDeleted: false,
        },
        {
          headers: {
            Authorization: `Bearer ${cookies?.admintoken}`,
          },
        }
      );
      if (res.data?.status == 'SUCCESS') {
        await mutate();
        toast.success('Referral is Recycled Success');
      } else {
        return toast.error('Something went wrong');
      }
    } catch (error: any) {
      if (error?.response?.data?.status == 'UNAUTHORIZED') {
        localStorage.removeItem('admin');
        const currentUrl = window.location.href;
        const path = extractPathAndParams(currentUrl);
        if (typeof window !== 'undefined') {
          location.href = `/auth/sign-in?ref=${path}`;
        }
        return toast.error('Session Expired');
      }
      console.log(error);
      return toast.error('Something went wrong');
    }
  };

  const updateOnboard = async (id: any, status: boolean) => {
    try {
      const res = await axios.patch(
        `${BaseApi}${updateReferral}/${id}`,
        {
          onboarded: status,
        },
        {
          headers: {
            Authorization: `Bearer ${cookies?.admintoken}`,
          },
        }
      );
      if (res.data?.status == 'SUCCESS') {
        await mutate();
        toast.success('Onboarded Status Changed Successfully !');
      } else {
        return toast.error('Something went wrong');
      }
    } catch (error: any) {
      if (error?.response?.data?.status == 'UNAUTHORIZED') {
        localStorage.removeItem('admin');
        const currentUrl = window.location.href;
        const path = extractPathAndParams(currentUrl);
        if (typeof window !== 'undefined') {
          location.href = `/auth/sign-in?ref=${path}`;
        }
        return toast.error('Session Expired');
      }
      console.log(error);
      return toast.error('Something went wrong');
    }
  };

  const updatePaid = async (id: any, status: boolean) => {
    try {
      const res = await axios.patch(
        `${BaseApi}${updateReferral}/${id}`,
        {
          status: status,
        },
        {
          headers: {
            Authorization: `Bearer ${cookies?.admintoken}`,
          },
        }
      );
      if (res.data?.status == 'SUCCESS') {
        await mutate();
        toast.success('Paid Status Changed Successfully !');
      } else {
        return toast.error('Something went wrong');
      }
    } catch (error: any) {
      if (error?.response?.data?.status == 'UNAUTHORIZED') {
        localStorage.removeItem('admin');
        const currentUrl = window.location.href;
        const path = extractPathAndParams(currentUrl);
        if (typeof window !== 'undefined') {
          location.href = `/auth/sign-in?ref=${path}`;
        }
        return toast.error('Session Expired');
      }
      console.log(error);
      return toast.error('Something went wrong');
    }
  };

  const permanentlydelete = async (id: string) => {
    try {
      const res = await axios.delete(`${BaseApi}${deleteReferral}/${id}`, {
        headers: {
          Authorization: `Bearer ${cookies?.admintoken}`,
        },
      });
      if (res.data?.status == 'SUCCESS') {
        await mutate();
        toast.success('Referral is Permanently Deleted Successfully !');
      } else {
        return toast.error('Something went wrong');
      }
    } catch (error: any) {
      if (error?.response?.data?.status == 'UNAUTHORIZED') {
        localStorage.removeItem('admin');
        const currentUrl = window.location.href;
        const path = extractPathAndParams(currentUrl);
        if (typeof window !== 'undefined') {
          location.href = `/auth/sign-in?ref=${path}`;
        }
        return toast.error('Session Expired');
      }
      console.log(error);
      return toast.error('Something went wrong');
    }
  };

  const transactions: any = [];

  const pageHeader = {
    title: `Deleted Referrals (${pagininator?.itemCount ?? 0})`,
    breadcrumb: [
      {
        href: '/',
        name: 'Home',
      },
      {
        href: '/',
        name: 'Deleted Referrals',
      },
      {
        name: 'List',
      },
    ],
  };

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
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        <div className="mt-4 flex flex-col gap-3 lg:flex-row lg:items-center lg:gap-3 lg:mt-0">
          <ExportButton
            data={downloadabeList}
            fileName="deleted_referrals_data"
            header=""
            className="w-full lg:w-auto"
          />
          <div className="flex flex-col gap-3 sm:flex-row sm:gap-3 w-full lg:w-auto">
            <Link href={`/referrals/create`} className="w-full sm:w-1/2 lg:w-auto">
              <Button
                tag="span"
                className="w-full "
                variant='outline'
              >
                <PiPlusBold className="me-1 h-4 w-4" />
                Add Referrals
              </Button>
            </Link>
            <Link href={`/referrals/all`} className="w-full sm:w-1/2 lg:w-auto">
              <Button
                tag="span"
                className="w-full "
                variant='outline'
              >
                <LuScreenShare className="me-1 h-4 w-4" />
                View All
              </Button>
            </Link>
          </div>
        </div>
      </PageHeader>

      {isLoading ? (
        <ReferralLoadingPage />
      ) : error ? (
        <div style={{ paddingBottom: '100px' }}>
          <Empty
            image={<SearchNotFoundIcon />}
            text="Something Went Wrong !"
            className="h-full justify-center"
          />
        </div>
      ) : data ? (
        <DeletedReferralTable
          onDeleteItem={onDelete}
          key={Math.random()}
          data={data}
          updatePaid={updatePaid}
          updateOnboard={updateOnboard}
          permanentlydelete={permanentlydelete}
        />
      ) : (
        <DeletedReferralTable
          onDeleteItem={onDelete}
          key={Math.random()}
          data={transactions}
          updatePaid={updatePaid}
          updateOnboard={updateOnboard}
          permanentlydelete={permanentlydelete}
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
            pageSize={referralsPerPage}
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
