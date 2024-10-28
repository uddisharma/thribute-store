'use client';
import PageHeader from '@/component/others/pageHeader';
import ExportButton from '@/component/others/export-button';
import Pagination from '@/component/ui/pagination';
import { useFilterControls } from '@/hooks/use-filter-control';
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import useSWR from 'swr';
import {
  BaseApi,
  transactionPerPage,
  allTransactions,
  adminSoftDeleteTransactions,
  errorRetry,
} from '@/constants';
import TransactionLoadingPage from '@/component/loading/transactions';
import { Button, Empty, Input, SearchNotFoundIcon } from 'rizzui';
import { toast } from 'sonner';
import Link from 'next/link';
import { PiPlusBold } from 'react-icons/pi';
import PayoutsTable from '@/component/payouts/table';
import { MdOutlineAutoDelete } from 'react-icons/md';
import { useCookies } from 'react-cookie';
import { fetcher } from '@/constants/fetcher';
import { extractPathAndParams } from '@/utils/urlextractor';
import { CiSearch } from 'react-icons/ci';
import { useModal } from '@/component/modal-views/use-modal';

export default function Transactions() {
  const searchRef = useRef<HTMLInputElement>(null);
  const [inputValue, setInputValue] = useState('');
  const [searchData, setSearchData] = useState([]);
  const [searching, setSearching] = useState(false);
  const { openModal } = useModal();
  const initialState = {
    page: '',
  };
  const { state: st, paginate } = useFilterControls<typeof initialState, any>(
    initialState
  );
  const [page, setPage] = useState(st?.page ? st?.page : 1);

  const [cookies] = useCookies(['admintoken']);

  let { data, isLoading, error, mutate } = useSWR(
    `${BaseApi}${allTransactions}?page=${page}&limit=${transactionPerPage}&isDeleted=${false}`,
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

  const downloadblepayouts = data?.map((e: any) => {
    return {
      Seller: e?.seller?.shopname,
      TransactionId: e?.transactionId,
      Amount: e?.amount,
      FromDate: e?.from?.slice(0, 10),
      ToDate: e?.to?.slice(0, 10),
      Paid: 'Yes',
    };
  });

  const onDelete = async (id: any) => {
    try {
      const res = await axios.patch(
        `${BaseApi}${adminSoftDeleteTransactions}/${id}`,
        {
          isDeleted: true,
        },
        {
          headers: {
            Authorization: `Bearer ${cookies?.admintoken}`,
          },
        }
      );
      if (res.data?.status == 'SUCCESS') {
        await mutate();
        toast.success('Transaction is Temperory Deleted Success');
      } else {
        return toast.error('Something went wrong');
      }
    } catch (error: any) {
      console.log(error);
      if (error?.response?.data?.status == 'UNAUTHORIZED') {
        localStorage.removeItem('admin');
        const currentUrl = window.location.href;
        const path = extractPathAndParams(currentUrl);
        if (typeof window !== 'undefined') {
          location.href = `/auth/sign-in?ref=${path}`;
        }
        return toast.error('Session Expired');
      }
      return toast.error('Something went wrong');
    }
  };

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

  const findPayouts = (e: any) => {
    e.preventDefault();
    setSearching(true);
    axios.get(`${BaseApi}${"findSellerOrders"}?identifier=${searchRef?.current?.value}`, {
      headers: {
        Authorization: `Bearer ${cookies?.admintoken}`,
      }
    }).then((res) => {
      if (res?.data?.status == 'SUCCESS') {
        setSearchData(res?.data?.data?.data);
      } else {
        toast.error("No data found!");
      }
    }).catch((err) => {
      console.log(err)
      if (err?.response?.data?.status == 'UNAUTHORIZED') {
        localStorage.removeItem('admin');
        const currentUrl = window.location.href;
        const path = extractPathAndParams(currentUrl);
        if (typeof window !== 'undefined') {
          location.href = `/auth/sign-in?ref=${path}`;
        }
        return toast.error('Session Expired');
      } else {
        toast.error('Something went wrong!');
      }
    }).finally(() => {
      setSearching(false);
    });
  }

  useEffect(() => {
    const handleInputChange = () => {
      let inputlenght = searchRef?.current?.value?.length;
      if (searchRef?.current?.value !== undefined) {
        if (inputlenght == 1 || inputlenght == 2) {
          setInputValue(searchRef?.current?.value);
        }
      }
      if (searchRef?.current?.value === '') {
        setSearchData([]);
      }
    };

    const inputElement = searchRef.current;
    if (inputElement) {
      inputElement.addEventListener('input', handleInputChange);
    }

    return () => {
      if (inputElement) {
        inputElement.removeEventListener('input', handleInputChange);
      }
    };
  }, []);

  const handleMoreOptionsClick = () => {
    openModal({
      view: (
        <div className="p-5">
          <ExportButton
            data={downloadblepayouts}
            fileName="payout_data"
            header=""
            className="w-full lg:w-auto"
          />

          <Link href={`/payouts/create`} className="w-full lg:w-auto ">
            <Button
              tag="span"
              className="w-full cursor-pointer mt-3"
              variant='outline'
            >
              <PiPlusBold className="me-1 h-4 w-4" />
              Create Transaction
            </Button>
          </Link>
          <Link href={`/payouts/deleted`} className="w-full lg:w-auto ">
            <Button
              tag="span"
              className="w-full cursor-pointer mt-3"
              variant='outline'
            >
              <MdOutlineAutoDelete className="me-1 h-4 w-4" />
              Deleted
            </Button>
          </Link>

        </div>
      ),
      customSize: '1000px',
    });
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
      <>
        <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
          <div className="mt-4 lg:flex md:flex gap-3 lg:flex-row lg:items-center lg:flex-wrap lg:mt-0 hidden ">
            <ExportButton
              data={downloadblepayouts}
              fileName="payout_data"
              header=""
              className="w-full lg:w-auto"
            />
            <div className="flex flex-col gap-3 lg:flex-row lg:gap-3 w-full lg:w-auto">
              <Link href={`/payouts/create`} className="w-full lg:w-auto">
                <Button
                  tag="span"
                  className="w-full cursor-pointer "
                  variant='outline'
                >
                  <PiPlusBold className="me-1 h-4 w-4" />
                  Create Transaction
                </Button>
              </Link>
              <Link href={`/payouts/deleted`} className="w-full lg:w-auto">
                <Button
                  tag="span"
                  className="w-full cursor-pointer "
                  variant='outline'
                >
                  <MdOutlineAutoDelete className="me-1 h-4 w-4" />
                  Deleted
                </Button>
              </Link>
            </div>
          </div>
        </PageHeader>
        <Button
          onClick={handleMoreOptionsClick}
          className="w-full lg:w-auto lg:mt-0 md:hidden lg:hidden xl:hidden"
        >
          More Options
        </Button>
        <form className='lg:flex items-center w-full lg:gap-3 mb-5 lg:mt-[-15px]' onSubmit={findPayouts}>
          <Input
            prefix={<CiSearch className="h-auto w-full" />}
            type="text"
            ref={searchRef}
            placeholder="Search for Seller orders..."
            className="mt-4 flex-grow lg:mt-0 lg:w-auto"
          />
          <Button
            isLoading={searching}
            disabled={!searchRef?.current?.value}
            type="submit"
            className="mt-4 w-full lg:w-auto lg:mt-0"
          >
            Search
          </Button>
        </form>
      </>
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
        <PayoutsTable onDeleteItem={onDelete} key={Math.random()} data={data} />
      ) : (
        <PayoutsTable
          onDeleteItem={onDelete}
          key={Math.random()}
          data={transactions}
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


