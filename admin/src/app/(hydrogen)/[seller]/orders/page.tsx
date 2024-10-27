'use client';
import { Button } from '@/component/ui/button';
import PageHeader from '@/component/others/pageHeader';
import OrdersTable from '@/component/ecommerce/order/order-list/table';
import { PiXBold } from 'react-icons/pi';
import ExportButton from '@/component/others/export-button';
import { CiFilter } from 'react-icons/ci';
import { useModal } from '@/component/modal-views/use-modal';
import { ActionIcon, Empty, SearchNotFoundIcon, Title } from 'rizzui';
import dynamic from 'next/dynamic';
import SelectLoader from '@/component/loader/select-loader';
import { Input } from '@/component/ui/input';
import cn from '@/utils/class-names';
import { useState } from 'react';
import { useFilterControls } from '@/hooks/use-filter-control';
import Pagination from '@/component/ui/pagination';
import axios from 'axios';
import useSWR from 'swr';
import {
  BaseApi,
  errorRetry,
  orderPerPage,
  sellerOrders,
  softOrderDelete,
  updateOrders,
} from '@/constants';
import OrderLoading from '@/component/loading/orders';
import { toast } from 'sonner';
import { useParams } from 'next/navigation';
import { MdOutlineAutoDelete } from 'react-icons/md';
import Link from 'next/link';
import { useCookies } from 'react-cookie';
import { fetcher } from '@/constants/fetcher';
import { extractPathAndParams } from '@/utils/urlextractor';

const Select = dynamic(() => import('@/component/ui/select'), {
  ssr: false,
  loading: () => <SelectLoader />,
});

const sortOptions = [
  {
    value: 'All',
    name: 'All',
  },
  {
    value: 'Received',
    name: 'Received',
  },
  {
    value: 'Dispatched',
    name: 'Dispatched',
  },
];

const Courieres = [
  {
    value: 'All',
    name: 'All',
  },
  {
    value: 'Local',
    name: 'Local',
  },
  {
    value: 'Serviceable',
    name: 'Serviceable',
  },
];

const orders: any = [];

export default function OrdersPage() {
  const { openModal } = useModal();
  const initialState = {
    page: '',
    date: '',
    status: '',
    courior: '',
  };
  const { state, paginate } = useFilterControls(initialState);

  const params = useParams();

  const [page, setPage] = useState(state?.page ? state?.page : 1);

  const today = new Date();

  const formattedDate = today.toISOString().split('T')[0];

  const [filters, setFilters] = useState({
    date: state?.date ? state?.date : formattedDate,
    status: state?.status ? state?.status : 'All',
    courier: state?.courier ? state?.courier : 'All',
  });

  const { date, status, courier } = filters;

  const handleApplyFilter = (newFilters: any) => {
    setFilters(newFilters);
  };

  const [cookies] = useCookies(['admintoken']);

  let { data, isLoading, error, mutate } = useSWR(
    `${BaseApi}${sellerOrders}/${params?.seller}?date=${date}&status=${status}&courior=${courier}&page=${page}&limit=${orderPerPage}`,
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

  const calculateTotalQuantity = (orderItems: any) => {
    let totalQuantity = 0;
    for (const item of orderItems) {
      totalQuantity += item.quantity;
    }
    return totalQuantity;
  };

  const newdata =
    pagininator?.itemCount > 0
      ? data?.map((e: any) => {
          return {
            orderId: e.order_id,
            customer: e.customerId
              ? `${e.customerId.name} ${e.customerId.email}`
              : '',
            shippingAddress: e.customerId
              ? `${e.customerId.shippingAddress.find(
                  (address: any) => address._id === e.addressId
                )?.address} ${e.customerId.shippingAddress.find(
                  (address: any) => address._id === e.addressId
                )?.district} ${e.customerId.shippingAddress.find(
                  (address: any) => address._id === e.addressId
                )?.state}`
              : '',
            orderedProducts: e.orderItems
              .map((item: any) => {
                const formattedProduct = item.productId
                  ? `name : ${item.productId.name} - qty : ${item.quantity} - color : ${item.color} - size : ${item.size}`
                  : '';
                return formattedProduct;
              })
              .join(' | '),
            totalAmount: e.totalAmount,
            totalItems: calculateTotalQuantity(e.orderItems),
            shippingCost: e.shipping,
            discount: e.discount,
            courier: e.courior == 'Local' ? 'Local' : 'Serviceable',
            note: e.note,
            paymentStatus: e.payment ? 'paid' : 'Not Paid',
            orderStatus: e.status,
            charge: e.charge,
          };
        })
      : [];
  const updateStatus = async (id: any, status: any) => {
    try {
      await axios.patch(
        `${BaseApi}${updateOrders}/${id}`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${cookies?.admintoken}`,
          },
        }
      );
      await mutate();
      return toast.success(`Order Marked as ${status}`);
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

  const temperoryDelete = async (id: any) => {
    try {
      await axios.patch(
        `${BaseApi}${softOrderDelete}/${id}`,
        {
          isDeleted: true,
        },
        {
          headers: {
            Authorization: `Bearer ${cookies?.admintoken}`,
          },
        }
      );
      await mutate();
      return toast.success(`Order is temperory deleted successfully !`);
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

  const pageHeader = {
    title: `Orders (${pagininator?.itemCount ?? 0})`,
    breadcrumb: [
      {
        href: '/',
        name: 'Home',
      },
      {
        href: `/${params?.seller}/dashboard`,
        name: 'Seller',
      },
      {
        name: 'Orders',
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
        <div className="mt-4 flex items-center gap-3 @lg:mt-0">
          <ExportButton
            data={newdata}
            fileName={`order_data_${date}`}
            header=""
          />
          <Button
            onClick={() =>
              openModal({
                view: <Filters onApplyFilter={handleApplyFilter} />,
                customSize: '720px',
              })
            }
            className="w-full gap-2 @lg:w-auto"
            variant="outline"
          >
            <CiFilter className="h-4 w-4" />
            Filters
          </Button>
          <Link href={`/${params?.seller}/orders/deleted`}>
            <Button className=" w-full gap-2 @lg:w-auto" variant="outline">
              <MdOutlineAutoDelete className="h-4 w-4" />
              Deleted
            </Button>
          </Link>
        </div>
      </PageHeader>

      {isLoading ? (
        <OrderLoading />
      ) : error ? (
        <div style={{ paddingBottom: '100px' }}>
          <Empty
            image={<SearchNotFoundIcon />}
            text="Something Went Wrong !"
            className="h-full justify-center"
          />
        </div>
      ) : data ? (
        <OrdersTable
          key={Math.random()}
          data={data}
          updateStatus={updateStatus}
          temperoryDelete={temperoryDelete}
        />
      ) : (
        <OrdersTable
          key={Math.random()}
          data={orders}
          updateStatus={updateStatus}
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
            pageSize={orderPerPage}
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
function Filters({ onApplyFilter }: any) {
  const { closeModal } = useModal();
  const initialState = {
    page: '',
    date: '',
    status: '',
    courior: '',
  };
  const { state, applyFilter, reset } = useFilterControls(initialState);

  const today = new Date();

  const formattedDate = today.toISOString().split('T')[0];

  const [filters, setFilters] = useState({
    date: state?.date ? state?.date : formattedDate,
    status: state?.status ? state?.status : 'All',
    courier: state?.courier ? state?.courier : 'All',
  });
  const { date, status, courier } = filters;
  const resetDate = () => {
    const today = new Date();
    const formattedDate = today.toISOString().split('T')[0];
    setFilters({ ...filters, date: formattedDate });
  };
  return (
    <div className="m-auto px-5 pb-8 pt-5 @lg:pt-6 @2xl:px-7">
      <div className="mb-7 flex items-center justify-between">
        <Title as="h4" className="font-semibold">
          Apply Filters
        </Title>
        <ActionIcon size="sm" variant="text" onClick={() => closeModal()}>
          <PiXBold className="h-auto w-5" />
        </ActionIcon>
      </div>
      <div className="flex-grow pb-10">
        <div
          className={cn(
            'grid grid-cols-1 ',
            '1 grid grid-cols-1  gap-8 @2xl:gap-10'
          )}
        >
          <Select
            value={courier}
            onChange={(e: any) => {
              setFilters({ ...filters, courier: e });
            }}
            options={Courieres}
            label="Courier Service"
            getOptionValue={(option) => option.name}
          />

          <Select
            options={sortOptions}
            label="Status"
            value={status}
            onChange={(e: any) => {
              setFilters({ ...filters, status: e });
            }}
            getOptionValue={(option) => option.name}
          />
          <Input
            value={date}
            onChange={(e) => {
              setFilters({ ...filters, date: e.target.value });
            }}
            label="Order Date"
            placeholder="Date"
            type="date"
          />
          <div
            className={cn(
              'flex items-center justify-end gap-3   @lg:gap-4 @xl:grid @xl:auto-cols-max @xl:grid-flow-col'
            )}
          >
            <Button
              onClick={() => {
                const today = new Date();
                const formattedDate = today.toISOString().split('T')[0];
                reset();
                setFilters({
                  ...filters,
                  date: formattedDate,
                  status: 'All',
                  courier: 'All',
                });
                onApplyFilter({
                  ...filters,
                  date: formattedDate,
                  status: 'All',
                  courier: 'All',
                });
                closeModal();
              }}
              variant="outline"
              className="w-full @xl:w-auto"
            >
              Clear Filter
            </Button>
            <Button
              onClick={() => {
                applyFilter({
                  date: date,
                  status: status,
                  courier: courier,
                });
                onApplyFilter(filters);
                closeModal();
              }}
              variant="outline"
              className="w-full @xl:w-auto"
            >
              Apply Filter
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
