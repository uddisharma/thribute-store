'use client';
import Link from 'next/link';
import { PiPlusBold } from 'react-icons/pi';
import { Button } from '@/component/ui/button';
import PageHeader from '@/component/others/pageHeader';
import ProductsTable from '@/component/ecommerce/product/product-list/table';
import ExportButton from '@/component/others/export-button';
import ProductLoadingPage from '@/component/loading/products';
import Pagination from '@/component/ui/pagination';
import axios from 'axios';
import useSWR from 'swr';
import {
  BaseApi,
  ItemperPage,
  SellerProducts,
  productsSoftDelete,
} from '@/constants';
import { useState } from 'react';
import { useFilterControls } from '@/hooks/use-filter-control';
import { Empty, SearchNotFoundIcon } from 'rizzui';
import { toast } from 'sonner';
import { MdOutlineAutoDelete } from 'react-icons/md';
import { useCookies } from 'react-cookie';
import { fetcher } from '@/constants/fetcher';
import { extractPathAndParams } from '@/utils/urlextractor';

export default function ProductsPage() {
  const initialState = {
    page: '',
  };
  const { state: st, paginate } = useFilterControls<typeof initialState, any>(
    initialState
  );

  const [page, setPage] = useState(st?.page ? st?.page : 1);

  const [cookies, _removeCookie] = useCookies(['sellertoken']);

  let { data, isLoading, error, mutate } = useSWR(
    `${BaseApi}${SellerProducts}?page=${page}&limit=${ItemperPage}&isDeleted=${false}`,
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

  const productsdata = data?.map((e: any) => {
    return {
      name: e?.name,
      price: e?.price,
      mrp: e?.mrp,
      stockleft: e?.stock,
      isActive: e?.isDeleted ? 'No' : 'Yes',
    };
  });

  const onDelete = async (id: any) => {
    try {
      await axios.patch(
        `${BaseApi}${productsSoftDelete}/${id}`,
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
      return toast.success('Product is Temperory deleted Successfully !');
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
  const products: any = [];

  const pageHeader = {
    title: `Products (${pagininator?.itemCount ?? 0})`,
    breadcrumb: [
      {
        href: '/',
        name: 'Home',
      },
      {
        href: '/products',
        name: 'Products',
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
            data={productsdata}
            fileName="product_data"
            header=""
            className="w-full @lg:w-auto"
          />
          <Link href={'products/create'} className="w-full @lg:w-auto">
            <Button tag="span" className="w-full @lg:w-auto" variant="outline">
              <PiPlusBold className="me-1.5 h-[17px] w-[17px]" />
              Add Product
            </Button>
          </Link>
          <Link href={`/products/deleted`} className="w-full @lg:w-auto">
            <Button className="w-full gap-2 @lg:w-auto" variant="outline">
              <MdOutlineAutoDelete className="h-4 w-4" />
              Deleted Products
            </Button>
          </Link>
        </div>
      </PageHeader>
      {isLoading ? (
        <ProductLoadingPage />
      ) : error ? (
        <div style={{ paddingBottom: '100px' }}>
          <Empty
            image={<SearchNotFoundIcon />}
            text="Something Went Wrong !"
            className="h-full justify-center"
          />
        </div>
      ) : data ? (
        <ProductsTable key={Math.random()} data={data} onDelete={onDelete} />
      ) : (
        data == null && (
          <ProductsTable
            key={Math.random()}
            data={products}
            onDelete={onDelete}
          />
        )
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
            pageSize={ItemperPage}
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
