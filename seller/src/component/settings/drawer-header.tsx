'use client';

import { PiXBold } from 'react-icons/pi';
import cn from '@/utils/class-names';
import { Title } from '@/component/ui/text';
import { ActionIcon } from '@/component/ui/action-icon';

export default function DrawerHeader({ onClose }: { onClose: () => void }) {
  return (
    <div className="flex items-center justify-between border-b border-gray-200 px-5 py-3.5">
      <Title as="h5" className={cn('font-semibold')}>
        Settings
      </Title>
      <ActionIcon
        variant="text"
        onClick={onClose}
        className={cn('h-7 w-7')}
        rounded="full"
      >
        <PiXBold className="h-[18px] w-[18px]" />
      </ActionIcon>
    </div>
  );
}
