'use client';
import CategoryTable from '@/component/ecommerce/category/category-list/table';
import CategoryPageHeader from './category-page-header';
import { useContext } from 'react';
import { UserContext } from '@/store/user/context';

const pageHeader = {
  title: 'Categories',
  breadcrumb: [
    {
      href: '/',
      name: 'Home',
    },
    {
      href: '/categories',
      name: 'Categories',
    },
    {
      name: 'List',
    },
  ],
};

export default function CategoriesPage() {
  const { state } = useContext(UserContext);
  return (
    <>
      <CategoryPageHeader
        title={`${pageHeader.title} (${
          state?.user?.sellingCategory?.length ?? 0
        })`}
        breadcrumb={pageHeader.breadcrumb}
        data={state?.user?.sellingCategory}
      />
      <CategoryTable />
    </>
  );
}
