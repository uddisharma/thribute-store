'use client';
import TicketsLoadingPage from '@/component/loading/tickets';
import ExportButton from '@/component/others/export-button';
import PageHeader from '@/component/others/pageHeader';
import TicketTable from '@/component/tickets/EventsTable';
import Pagination from '@/component/ui/pagination';
import { metaObject } from '@/config/site.config';
import {
  BaseApi,
  markTicket,
  sellerAllTickets,
  ticketPerPage,
} from '@/constants';
import { fetcher } from '@/constants/fetcher';
import { useFilterControls } from '@/hooks/use-filter-control';
import { extractPathAndParams } from '@/utils/urlextractor';
import axios from 'axios';
import Link from 'next/link';
import { useState } from 'react';
import { useCookies } from 'react-cookie';
import { PiPlusBold } from 'react-icons/pi';
import { Button, Empty, SearchNotFoundIcon } from 'rizzui';
import { toast } from 'sonner';
import useSWR from 'swr';

const metadata = {
  ...metaObject('Events'),
};

export default function BlankPage() {
  const initialState = {
    page: '',
  };
  const { state: st, paginate } = useFilterControls<typeof initialState, any>(
    initialState
  );
  const [page, setPage] = useState(st?.page ? st?.page : 1);

  const [cookies] = useCookies(['sellertoken']);

  let { data, isLoading, error, mutate } = useSWR(
    `${BaseApi}${sellerAllTickets}?page=${page}&limit=${ticketPerPage}&isDeleted=${false}`,
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

  const downlaodableTickets = data?.map((e: any) => {
    return {
      TicketType: e?.type,
      Subject: e?.subject,
      Description: e?.description,
      isResolved: e?.closed ? 'Yes' : 'No',
      CreatedAt: e?.createdAt?.slice(0, 10),
    };
  });

  const onDeleteItem = async (id: any) => {
    console.log(id);
  };

  const onMark = async (id: any) => {
    try {
      await axios.patch(
        `${BaseApi}${markTicket}/${id}`,
        {
          closed: true,
        },
        {
          headers: {
            Authorization: `Bearer ${cookies?.sellertoken}`,
          },
        }
      );
      await mutate();
      return toast.success('Ticket Marked as Resolved');
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

  const tickets: any = [];

  const pageHeader = {
    title: `Tickets (${pagininator?.itemCount ?? 0})`,
    breadcrumb: [
      {
        href: '/',
        name: 'Home',
      },
      {
        href: '/tickets',
        name: 'Tickets',
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
            data={downlaodableTickets}
            fileName="tickets_data"
            header=""
          />
          <Link href={'tickets/create'} className="w-full @lg:w-auto">
            <Button
              tag="span"
              className="w-full @lg:w-auto "
              variant='outline'
            >
              <PiPlusBold className="me-1.5 h-[17px] w-[17px]" />
              Create Ticket
            </Button>
          </Link>
        </div>
      </PageHeader>
      {isLoading ? (
        <TicketsLoadingPage />
      ) : error ? (
        <div style={{ paddingBottom: '100px' }}>
          <Empty
            image={<SearchNotFoundIcon />}
            text="Something Went Wrong !"
            className="h-full justify-center"
          />
        </div>
      ) : data ? (
        <TicketTable
          onDeleteItem={onDeleteItem}
          onMark={onMark}
          key={Math.random()}
          data={data}
        />
      ) : (
        <TicketTable
          onDeleteItem={onDeleteItem}
          onMark={onMark}
          key={Math.random()}
          data={tickets}
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
            pageSize={ticketPerPage}
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
