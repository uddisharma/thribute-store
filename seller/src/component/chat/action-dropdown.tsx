'use client';

import {
  PiCheckCircle,
  PiTrashSimple,
  PiWarningCircle,
  PiProhibitInset,
  PiDotsThreeBold,
} from 'react-icons/pi';
import { ActionIcon } from '@/component/ui/action-icon';
import { Dropdown, DropdownItem } from '@/component/ui/dropdown ';

const actions = [
  {
    id: 1,
    icon: <PiCheckCircle className="h-4 w-4" />,
    name: 'Mark as Resolved',
  },
];

export default function ActionDropdown({ className }: { className?: string }) {
  return (
    <Dropdown
      className={className}
      trigger={
        <ActionIcon
          rounded="full"
          variant="outline"
          className="h-auto w-auto p-1"
        >
          <PiDotsThreeBold className="h-auto w-6" />
        </ActionIcon>
      }
      dropdownClassName="w-48 mt-4 right-0 p-2 gap-1 grid"
    >
      {actions.map((action) => (
        <DropdownItem
          key={action.id}
          className="gap-2 p-2 text-xs sm:text-sm"
          activeClassName="bg-gray-100 rounded-md"
        >
          {({ active }) => (
            <>
              {action.icon}
              {action.name}
            </>
          )}
        </DropdownItem>
      ))}
    </Dropdown>
  );
}
