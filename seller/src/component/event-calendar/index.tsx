'use client';

import type { CalendarEvent } from '@/types';
import dayjs from 'dayjs';
import { useCallback, useMemo } from 'react';
import { Calendar, dayjsLocalizer } from 'react-big-calendar';
import DetailsEvents from './details-event';
import { useModal } from '@/component/modal-views/use-modal';
import useEventCalendar from '@/hooks/use-event-calendar';
import cn from '@/utils/class-names';
import { useRouter } from 'next/navigation';

const localizer = dayjsLocalizer(dayjs);

// rbc-active -> black button active
const calendarToolbarClassName =
  '[&_.rbc-toolbar_.rbc-toolbar-label]:whitespace-nowrap [&_.rbc-toolbar_.rbc-toolbar-label]:my-2 [&_.rbc-toolbar]:flex [&_.rbc-toolbar]:flex-col [&_.rbc-toolbar]:items-center @[56rem]:[&_.rbc-toolbar]:flex-row [&_.rbc-btn-group_button:hover]:bg-gray-300 [&_.rbc-btn-group_button]:duration-200 [&_.rbc-btn-group_button.rbc-active:hover]:bg-gray-600 dark:[&_.rbc-btn-group_button.rbc-active:hover]:bg-gray-300 [&_.rbc-btn-group_button.rbc-active:hover]:text-gray-50 dark:[&_.rbc-btn-group_button.rbc-active:hover]:text-gray-900';

export default function EventCalendarView() {
  const { events } = useEventCalendar();
  const { openModal } = useModal();
  const router = useRouter();
  const handleSelectSlot = useCallback(
    ({ start }: { start: Date; end: Date }) => {
      router?.push(
        `/report/${start.toString()?.slice(0, 15)?.split(' ').join('-')}`
      );
    },
    []
  );

  const handleSelectEvent = useCallback(
    (event: CalendarEvent) => {
      openModal({
        view: <DetailsEvents event={event} />,
        customSize: '500px',
      });
    },
    [openModal]
  );

  const { views, scrollToTime, formats } = useMemo(
    () => ({
      views: {
        month: true,
        week: true,
        day: true,
        agenda: true,
      },
      scrollToTime: new Date(2023, 10, 27, 6),
      formats: {
        dateFormat: 'D',
        weekdayFormat: (date: Date, culture: any, localizer: any) =>
          localizer.format(date, 'ddd', culture),
        dayFormat: (date: Date, culture: any, localizer: any) =>
          localizer.format(date, 'ddd M/D', culture),
        timeGutterFormat: (date: Date, culture: any, localizer: any) =>
          localizer.format(date, 'hh A', culture),
      },
    }),
    []
  );

  return (
    <div className="@container">
      <Calendar
        localizer={localizer}
        events={events}
        views={views}
        formats={formats}
        startAccessor="start"
        endAccessor="end"
        dayLayoutAlgorithm="no-overlap"
        onSelectEvent={handleSelectEvent}
        onSelectSlot={handleSelectSlot}
        selectable
        scrollToTime={scrollToTime}
        className={cn('h-[650px] md:h-[1000px]', calendarToolbarClassName)}
      />
    </div>
  );
}
