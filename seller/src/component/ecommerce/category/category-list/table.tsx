'use client';
import { useColumn } from '@/hooks/use-column';
import ControlledTable from '@/component/controlled-table';
import { categories } from '@/data/product-categories';
import { useCallback, useContext, useMemo, useState } from 'react';
import { useTable } from '@/hooks/use-table';
import { getColumns } from '@/component/ecommerce/category/category-list/columns';
import { UserContext } from '@/store/user/context';
import { BaseApi, deleteCategory } from '@/constants';
import axios from 'axios';
import { toast } from 'sonner';
import { useCookies } from 'react-cookie';
import { extractPathAndParams } from '@/utils/urlextractor';

export default function CategoryTable() {
  const { state, setUser } = useContext(UserContext);
  const [pageSize, setPageSize] = useState(10);
  const [cookies] = useCookies(['sellertoken']);

  const onHeaderCellClick = (value: string) => ({
    onClick: () => {
      handleSort(value);
    },
  });

  const onDeleteItem = useCallback((id: string) => {
    axios
      .delete(`${BaseApi}${deleteCategory}/${id}`, {
        headers: {
          Authorization: `Bearer ${cookies?.sellertoken}`,
        },
      })
      .then((res) => {
        if (res.data?.status == 'SUCCESS') {
          toast.success('Category Deleted Success');
          setUser(res.data?.data);
        } else {
          return toast.error('Something went wrong');
        }
      })
      .catch((err: any) => {
        console.log(err);
        if (err?.response?.data?.status == 'UNAUTHORIZED') {
          localStorage.removeItem('seller');
          toast.error('Session Expired');
          const currentUrl = window.location.href;
          const path = extractPathAndParams(currentUrl);
          if (typeof window !== 'undefined') {
            location.href = `/auth/sign-in?ref=${path}`;
          }
        }
        return toast.error('Something went wrong');
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [checkedItems, setCheckedItems] = useState<string[]>([]);
  const onChecked = (
    event: React.ChangeEvent<HTMLInputElement>,
    id: string
  ) => {
    if (event.target.checked) {
      setCheckedItems((prevItems) => [...prevItems, id]);
    } else {
      setCheckedItems((prevItems) => prevItems.filter((item) => item !== id));
    }
  };

  const {
    isLoading,
    isFiltered,
    tableData,
    currentPage,
    totalItems,
    handlePaginate,
    searchTerm,
    handleSearch,
    sortConfig,
    handleSort,
    handleDelete,
  } = useTable(categories, pageSize);

  const columns = useMemo(
    () =>
      getColumns({ sortConfig, onHeaderCellClick, onDeleteItem, onChecked }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      onHeaderCellClick,
      sortConfig.key,
      sortConfig.direction,
      onDeleteItem,
      onChecked,
    ]
  );

  const { visibleColumns, checkedColumns, setCheckedColumns } =
    useColumn(columns);

  return (
    <ControlledTable
      variant="modern"
      isLoading={isLoading}
      showLoadingText={true}
      data={state?.user?.sellingCategory}
      // @ts-ignore
      columns={visibleColumns}
      paginatorOptions={{
        pageSize,
        setPageSize,
        total: totalItems,
        current: currentPage,
        onChange: (page: number) => handlePaginate(page),
      }}
      filterOptions={{
        searchTerm,
        onSearchClear: () => {
          handleSearch('');
        },
        onSearchChange: (event) => {
          handleSearch(event.target.value);
        },
        hasSearched: isFiltered,
        columns,
        checkedColumns,
        setCheckedColumns,
      }}
      className="overflow-hidden rounded-md border border-gray-200 text-sm shadow-sm [&_.rc-table-placeholder_.rc-table-expanded-row-fixed>div]:h-60 [&_.rc-table-placeholder_.rc-table-expanded-row-fixed>div]:justify-center [&_.rc-table-row:last-child_td.rc-table-cell]:border-b-0 [&_thead.rc-table-thead]:border-t-0"
    />
  );
}
