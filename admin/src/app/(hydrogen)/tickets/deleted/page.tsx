'use client';
import TicketsLoadingPage from '@/component/loading/tickets';
import ExportButton from '@/component/others/export-button';
import PageHeader from '@/component/others/pageHeader';
import Pagination from '@/component/ui/pagination';
import {
  BaseApi,
  admintickets,
  deleteTicket,
  errorRetry,
  markTicket,
  ticketPerPage,
  updateTicket,
} from '@/constants';
import { useFilterControls } from '@/hooks/use-filter-control';
import axios from 'axios';
import Link from 'next/link';
import { useContext, useState } from 'react';
import { PiPlusBold } from 'react-icons/pi';
import { Button, Empty, SearchNotFoundIcon } from 'rizzui';
import { toast } from 'sonner';
import useSWR from 'swr';
import { UserContext } from '@/store/user/context';
import { IoTicketOutline } from 'react-icons/io5';
import DeletedTicketTable from '@/component/admintickets/deleted/EventsTable';
import { useCookies } from 'react-cookie';
import { fetcher } from '@/constants/fetcher';
import { extractPathAndParams } from '@/utils/urlextractor';

export default function BlankPage() {
  const initialState = {
    page: '',
  };
  const { state: st, paginate } = useFilterControls<typeof initialState, any>(
    initialState
  );

  const [page, setPage] = useState(st?.page ? st?.page : 1);

  const { state } = useContext(UserContext);

  const [cookies] = useCookies(['admintoken']);

  let { data, isLoading, error, mutate } = useSWR(
    `${BaseApi}${admintickets}?page=${page}&limit=${ticketPerPage}&isDeleted=${true}`,
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

  const downlaodableTickets = data?.map((e: any) => {
    return {
      Seller: e?.seller?.shopname,
      TicketType: e?.type,
      Subject: e?.subject,
      Description: e?.description,
      isResolved: e?.closed ? 'Yes' : 'No',
      CreatedAt: e?.createdAt?.slice(0, 10),
      isDeleted: 'Yes',
    };
  });

  const onDeleteItem = async (id: any) => {
    try {
      const res = await axios.delete(`${BaseApi}${deleteTicket}/${id}`, {
        headers: {
          Authorization: `Bearer ${cookies?.admintoken}`,
        },
      });

      if (res.data?.status == 'SUCCESS') {
        await mutate();
        return toast.success(`Ticket is Deleted Successfully`);
      } else {
        return toast.error('Something went wrong !');
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
  const onMark = async (id: any, closed: any) => {
    try {
      await axios.patch(
        `${BaseApi}${markTicket}/${id}`,
        {
          closed: closed,
        },
        {
          headers: {
            Authorization: `Bearer ${cookies?.admintoken}`,
          },
        }
      );
      await mutate();
      return toast.success(
        `Ticket Marked as ${closed ? 'Resolved' : 'Active'}`
      );
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

  const onTemperoryDelete = async (id: string) => {
    try {
      await axios.patch(
        `${BaseApi}${updateTicket}/${id}`,
        {
          isDeleted: false,
        },
        {
          headers: {
            Authorization: `Bearer ${cookies?.admintoken}`,
          },
        }
      );
      await mutate();
      return toast.success('Ticket is Recycle Successfully !');
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

  const tickets: any = [];

  const pageHeader = {
    title: `Deleted Tickets (${pagininator?.itemCount ?? 0})`,
    breadcrumb: [
      {
        href: '/',
        name: 'Home',
      },
      {
        href: '/',
        name: 'Deleted Tickets',
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
        <div className="mt-4 flex flex-col gap-3 lg:flex-row lg:items-center lg:flex-wrap lg:mt-0">
          <ExportButton
            data={downlaodableTickets}
            fileName="deleted_tickets_data"
            header=""
            className="w-full lg:w-auto"
          />
          <div className="flex flex-col gap-3 sm:flex-row sm:gap-3 w-full lg:w-auto">
            <Link href={'/tickets/create'} className="w-full sm:w-1/2 lg:w-auto">
              <Button
                tag="span"
                className="w-full "
                variant='outline'
              >
                <PiPlusBold className="me-1.5 h-[17px] w-[17px]" />
                Create Ticket
              </Button>
            </Link>
            <Link href={'/tickets'} className="w-full sm:w-1/2 lg:w-auto">
              <Button
                tag="span"
                className="w-full "
                variant='outline'
              >
                <IoTicketOutline className="me-1.5 h-[17px] w-[17px]" />
                View All
              </Button>
            </Link>
          </div>
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
        <DeletedTicketTable
          onDeleteItem={onDeleteItem}
          onMark={onMark}
          key={Math.random()}
          data={data}
          user={state?.user?.id}
          onTemperoryDelete={onTemperoryDelete}
        />
      ) : (
        <DeletedTicketTable
          onDeleteItem={onDeleteItem}
          onMark={onMark}
          key={Math.random()}
          data={tickets}
          user={state?.user?.id}
          onTemperoryDelete={onTemperoryDelete}
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
