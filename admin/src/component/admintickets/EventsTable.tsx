'use client';
import BasicTableWidget from '@/component/controlled-table/basic-table-widget';
import { EventsColumn } from './EventColumn';
import { useModal } from '@/component/modal-views/use-modal';

export default function TicketTable({ data, onDeleteItem, onMark, user }: any) {
  const { openModal } = useModal();

  return (
    <div>
      {data && (
        <BasicTableWidget
          title="Tickets"
          variant="minimal"
          data={data}
          // @ts-ignore
          getColumns={(columns: any) =>
            EventsColumn({
              ...columns,
              onDeleteItem: onDeleteItem,
              openModal: openModal,
              onMark: onMark,
              user: user,
            })
          }
          searchPlaceholder="Search tickets..."
          className="min-h-[480px] [&_.widget-card-header]:items-center [&_.widget-card-header_h5]:font-medium"
        />
      )}
    </div>
  );
}
