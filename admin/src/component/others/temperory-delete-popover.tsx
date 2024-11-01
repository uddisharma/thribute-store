'use client';

import { Title, Text } from '@/component/ui/text';
import { ActionIcon } from '@/component/ui/action-icon';
import { Button } from '@/component/ui/button';
import { Popover } from '@/component/ui/popover';
import { MdOutlineAutoDelete } from 'react-icons/md';

type DeletePopoverProps = {
  title: string;
  description: string;
  onDelete: () => void;
};

export default function TemperoryDeletePopover({
  title,
  description,
  onDelete,
}: DeletePopoverProps) {
  return (
    <Popover
      placement="left"
      className="z-50"
      content={({ setOpen }) => (
        <div className="w-56 pb-2 pt-1 text-left rtl:text-right">
          <Title
            as="h6"
            className="mb-0.5 flex items-start text-sm text-gray-700 sm:items-center"
          >
            <MdOutlineAutoDelete className="me-1 h-[17px] w-[17px]" /> {title}
          </Title>
          <Text className="mb-2 leading-relaxed text-gray-500">
            {description}
          </Text>
          <div className="flex items-center justify-end">
            <Button size="sm" className="me-1.5 h-7" onClick={onDelete}>
              Yes
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="h-7"
              onClick={() => setOpen(false)}
            >
              No
            </Button>
          </div>
        </div>
      )}
    >
      <ActionIcon
        size="sm"
        variant="outline"
        aria-label={'Delete Item'}
        className="cursor-pointer hover:!border-gray-900 hover:text-gray-700"
      >
        <MdOutlineAutoDelete className="h-4 w-4" />
      </ActionIcon>
    </Popover>
  );
}
