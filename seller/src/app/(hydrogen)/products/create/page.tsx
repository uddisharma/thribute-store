import Link from 'next/link';
import { metaObject } from '@/config/site.config';
import PageHeader from '@/component/others/pageHeader';
import { Button } from '@/component/ui/button';
import CreateEditProduct1 from '@/component/ecommerce/product/create-edit';

export const metadata = {
  ...metaObject('Create Product'),
};

const pageHeader = {
  title: 'Create Product',
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
      name: 'Create',
    },
  ],
};

export default function CreateProductPage() {
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        <Link href={'/products'} className="mt-4 w-full @lg:mt-0 @lg:w-auto">
          <Button
            tag="span"
            className="w-full @lg:w-auto "
            variant='outline'
          >
            View all Products
          </Button>
        </Link>
      </PageHeader>

      <CreateEditProduct1 />
    </>
  );
}
