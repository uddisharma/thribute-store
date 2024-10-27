'use client';
import PageHeader from '@/component/others/pageHeader';
import { metaObject } from '@/config/site.config';
import ExportButton from '@/component/others/export-button';
import TransactionTable from '@/component/transactions/table';
import Pagination from '@/component/ui/pagination';
import { useFilterControls } from '@/hooks/use-filter-control';
import { useState } from 'react';
import useSWR from 'swr';
import { BaseApi, sellerTransactions, transactionPerPage } from '@/constants';
import TransactionLoadingPage from '@/component/loading/transactions';
import { Empty, SearchNotFoundIcon } from 'rizzui';
import { useCookies } from 'react-cookie';
import { fetcher } from '@/constants/fetcher';
import { toast } from 'sonner';
import { extractPathAndParams } from '@/utils/urlextractor';
const metadata = {
  ...metaObject('Transactions'),
};

export default function Transactions() {
  const initialState = {
    page: '',
  };
  const { state: st, paginate } = useFilterControls<typeof initialState, any>(
    initialState
  );
  const [page, setPage] = useState(st?.page ? st?.page : 1);

  const [cookies] = useCookies(['sellertoken']);

  let { data, isLoading, error } = useSWR(
    `${BaseApi}${sellerTransactions}?page=${page}&limit=${transactionPerPage}&isDeleted=${false}`,
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

  const downloadblepayouts = data?.map((e: any) => {
    return {
      TransactionId: e?.transactionId,
      Amount: e?.amount,
      FromDate: e?.from?.slice(0, 10),
      ToDate: e?.to?.slice(0, 10),
      Paid: 'Yes',
    };
  });

  const transactions: any = [];

  const pageHeader = {
    title: `Payouts (${pagininator?.itemCount ?? 0})`,
    breadcrumb: [
      {
        href: '/',
        name: 'Home',
      },
      {
        href: '/',
        name: 'Payouts',
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
        <div className="mt-4 flex items-center gap-3 @lg:mt-0">
          <ExportButton
            data={downloadblepayouts}
            fileName="payout_data"
            header=""
          />
        </div>
      </PageHeader>

      {isLoading ? (
        <TransactionLoadingPage />
      ) : error ? (
        <div style={{ paddingBottom: '100px' }}>
          <Empty
            image={<SearchNotFoundIcon />}
            text="Something Went Wrong !"
            className="h-full justify-center"
          />
        </div>
      ) : data ? (
        <TransactionTable key={Math.random()} data={data} />
      ) : (
        <TransactionTable key={Math.random()} data={transactions} />
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
            pageSize={transactionPerPage}
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
