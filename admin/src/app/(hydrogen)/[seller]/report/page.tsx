import { metaObject } from '@/config/site.config';
import PageHeader from '@/component/others/pageHeader';
import EventCalendarView1 from '@/component/event-calendar/index1';

export const metadata = {
  ...metaObject('Event Calendar'),
};

const pageHeader = {
  title: 'Downlaod Report',
  breadcrumb: [
    {
      href: '/',
      name: 'Home',
    },
    {
      name: 'Download Report',
    },
  ],
};

export default function EventCalendarPage() {
  return (
    <>
      <PageHeader
        title={pageHeader.title}
        breadcrumb={pageHeader.breadcrumb}
      ></PageHeader>

      <EventCalendarView1 />
    </>
  );
}
