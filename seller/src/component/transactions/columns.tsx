'use client';
import { HeaderCell } from '@/component/ui/table';
import { Text } from '@/component/ui/text';
import DateCell from '@/component/ui/date-cell';
import { ActionIcon, Tooltip } from 'rizzui';
import Link from 'next/link';
import { FaFileDownload } from 'react-icons/fa';

type Columns = {
  data: any[];
  sortConfig?: any;
  handleSelectAll: any;
  checkedItems: string[];
  onDeleteItem: (id: string) => void;
  onHeaderCellClick: (value: string) => void;
  onChecked?: (id: string) => void;
};

export const getColumns = ({
  data,
  sortConfig,
  checkedItems,
  onDeleteItem,
  onHeaderCellClick,
  handleSelectAll,
  onChecked,
}: Columns) => [
  {
    title: <HeaderCell title="Transaction ID" />,
    dataIndex: 'Transaction ID',
    key: 'transactionId',
    width: 80,
    render: (_: string, row: any) => (
      <Text className="truncate !text-sm ">
        {row?.transactionId?.toUpperCase()}
      </Text>
    ),
  },

  {
    title: <HeaderCell title="Amount" />,
    dataIndex: 'amount',
    key: 'amount',
    width: 80,
    render: (_: string, row: any) => (
      <Text className="truncate !text-sm ">₹{row?.amount}</Text>
    ),
  },
  {
    title: (
      <HeaderCell
        title="From date"
        sortable
        ascending={
          sortConfig?.direction === 'asc' && sortConfig?.key === 'from'
        }
      />
    ),
    onHeaderCell: () => onHeaderCellClick('from'),
    dataIndex: 'from',
    key: 'from',
    width: 150,
    render: (from: Date) => <DateCell date={from} />,
  },

  {
    title: (
      <HeaderCell
        title="To date"
        sortable
        ascending={sortConfig?.direction === 'asc' && sortConfig?.key === 'to'}
      />
    ),
    onHeaderCell: () => onHeaderCellClick('to'),
    dataIndex: 'to',
    key: 'to',
    width: 150,
    render: (to: Date) => <DateCell date={to} />,
  },

  {
    title: (
      <HeaderCell
        title="createdAt"
        sortable
        ascending={
          sortConfig?.direction === 'asc' && sortConfig?.key === 'createdAt'
        }
      />
    ),
    onHeaderCell: () => onHeaderCellClick('createdAt'),
    dataIndex: 'createdAt',
    key: 'createdAt',
    width: 150,
    render: (createdAt: Date) => <DateCell date={createdAt} />,
  },
  {
    title: <HeaderCell title="Actions" className="opacity-0" />,
    dataIndex: 'action',
    key: 'action',
    width: 120,
    render: (_: string, row: any) => (
      <div className="flex items-center justify-end gap-3 pe-4">
        <Tooltip
          size="sm"
          content={() => 'Download Reciept'}
          placement="top"
          color="invert"
        >
          <Link target="_blank" href={`/payout/${row?.id}`}>
            <ActionIcon
              size="sm"
              variant="outline"
              aria-label={'Download Reciept'}
            >
              <FaFileDownload className="h-4 w-4" />
            </ActionIcon>
          </Link>
        </Tooltip>
      </div>
    ),
  },
];