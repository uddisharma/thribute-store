'use client';

import { useAtomValue } from 'jotai';
import { useState, useContext } from 'react';
import { Title } from '@/component/ui/text';
import { Badge } from '@/component/ui/badge';
import { Button } from '@/component/ui/button';
import { Avatar } from '@/component/ui/avatar';
import { dataAtom, messageIdAtom } from '@/component/chat/message-list';
import MessageBody from './messageBody';
import cn from '@/utils/class-names';
import SimpleBar from '@/component/ui/simplebar';
import { useElementSize } from '@/hooks/use-element-size';
import { useMedia } from '@/hooks/use-media';
import Spinner from '@/component/ui/spinner';
import { ActionIcon, Empty, Input, SearchNotFoundIcon } from 'rizzui';
import axios from 'axios';
import useSWR from 'swr';
import { useParams } from 'next/navigation';
import { FaTelegramPlane } from 'react-icons/fa';
import { BaseApi, errorRetry, singleTicket, ticketReply } from '@/constants';
import { UserContext } from '@/store/user/context';
import { toast } from 'sonner';
import { useCookies } from 'react-cookie';
import { extractPathAndParams } from '@/utils/urlextractor';
import { fetcher } from '@/constants/fetcher';

export default function ReplyDetails({ className }: { className?: string }) {
  const data = useAtomValue(dataAtom);
  const messageId = useAtomValue(messageIdAtom);
  const params = useParams();
  const { state } = useContext(UserContext);
  const [ref, { width }] = useElementSize();
  const isWide = useMedia('(min-width: 1280px) and (max-width: 1440px)', false);

  function formWidth() {
    if (isWide) return width - 64;
    return width - 44;
  }

  const isMobile = useMedia('(max-width: 767px)', true);

  const [cookies] = useCookies(['admintoken']);

  let {
    data: data2,
    isLoading,
    error,
    mutate,
  } = useSWR(
    `${BaseApi}${singleTicket}/${params?.id}`,
    (url) => fetcher(url, cookies.admintoken),
    {
      refreshInterval: 3600000,
      revalidateOnMount: true,
      revalidateOnFocus: true,
      onErrorRetry({ retrycount }: any) {
        if (retrycount > errorRetry) {
          return false;
        }
      },
    }
  );

  const authstatus = error?.response?.data?.status == 'UNAUTHORIZED' && true;

  const message = data.find((m) => m.id === messageId) ?? data[0];

  const initials = `${message?.firstName.charAt(0)}${message?.lastName.charAt(
    0
  )}`;

  function getCurrentDateTimeIndia() {
    const now = new Date(
      new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' })
    );

    const day = now.getDate().toString().padStart(2, '0');
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    const year = now.getFullYear();

    const hours = now.getHours() % 12 || 12;
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const ampm = now.getHours() < 12 ? 'AM' : 'PM';

    const formattedDateTime = `${day}-${month}-${year}  ${hours}:${minutes}${ampm}`;

    return formattedDateTime;
  }
  const [r_message, setRMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const sendReply = async () => {
    try {
      if (r_message == '') {
        return;
      }
      setLoading(true);
      await axios.patch(
        `${BaseApi}${ticketReply}`,
        {
          ticketId: params?.id,
          from: state?.user?.id,
          message: r_message,
          time: getCurrentDateTimeIndia(),
        },
        {
          headers: {
            Authorization: `Bearer ${cookies?.admintoken}`,
          },
        }
      );
      await mutate();
      setRMessage('');
    } catch (error: any) {
      if (error?.response?.data?.status == 'UNAUTHORIZED') {
        localStorage.removeItem('admin');
        const currentUrl = window.location.href;
        const path = extractPathAndParams(currentUrl);
        if (typeof window !== 'undefined') {
          location.href = `/auth/sign-in?ref=${path}`;
        }
        return toast.error('Session Expired');
      }
      return toast.error('Something went wrong');
    } finally {
      setLoading(false);
    }
  };
  if (authstatus) {
    localStorage.removeItem('admin');
    toast.error('Session Expired');
    const currentUrl = window.location.href;
    const path = extractPathAndParams(currentUrl);
    if (typeof window !== 'undefined') {
      location.href = `/auth/sign-in?ref=${path}`;
    }
  }

  if (isLoading) {
    return (
      <div
        className={cn(
          '!grid h-full min-h-[128px] flex-grow place-content-center items-center justify-center',
          className
        )}
      >
        <Spinner size="xl" />
      </div>
    );
  }

  if (error) {
    return (
      <div
        className={cn(
          '!grid h-full min-h-[128px] flex-grow place-content-center items-center justify-center',
          className
        )}
      >
        {error && (
          <div style={{ paddingBottom: '100px' }}>
            <Empty
              image={<SearchNotFoundIcon />}
              text="Something Went Wrong !"
              className="h-full justify-center"
            />
          </div>
        )}
      </div>
    );
  }

  return (
    <div
      className={cn(
        'relative  lg:rounded-lg lg:border lg:border-gray-200 lg:px-4 lg:py-7 xl:px-5 xl:py-5  2xl:pt-6',
        className
      )}
    >
      <div>
        <header className="flex flex-col justify-between gap-4 border-b border-gray-200  3xl:flex-row 3xl:items-center">
          <div className="flex items-start justify-between gap-3 xs:flex-row xs:items-center xs:gap-6 lg:justify-normal">
            <Title as="h4" className="font-semibold">
            {data2?.data?.subject}
            </Title>
            
            <Badge variant="outline" color="primary" size="sm">
              {data2?.data?.type}
            </Badge>
            {data2?.data?.closed === false ? (
              <Badge variant="outline" color="success" size="sm">
                Active
              </Badge>
            ) : (
              <Badge variant="outline" color="danger" size="sm">
                Closed
              </Badge>
            )}
          </div>
          <div dangerouslySetInnerHTML={{ __html: data2?.data?.description }} />

        </header>

        <div
          style={{
            minHeight: isMobile ? '400px' : '350px',
            maxHeight: isMobile ? '400px' : '350px',
            overflowY: 'scroll',
          }}
          className="[&_.simplebar-content]:grid [&_.simplebar-content]:gap-8 [&_.simplebar-content]:py-5"
        >
          <SimpleBar className="@3xl:max-h-[calc(100dvh-34rem)] @4xl:max-h-[calc(100dvh-32rem)] @7xl:max-h-[calc(100dvh-31rem)]">
            <MessageBody chat={data2} />
          </SimpleBar>
        </div>

        <div  className="border-gray-100 border-[1px] grid grid-cols-[32px_1fr] items-start gap-3 rounded-b-lg bg-white @3xl:pt-4 lg:gap-4 lg:pl-0 xl:grid-cols-[48px_1fr] dark:bg-transparent dark:lg:pt-0">
          <div className="relative rounded-lg p-4 2xl:p-5">
            <div className="flex gap-3">
              <div className="flex-grow">
                <Input
                  onChange={(e) => {
                    setRMessage(e.target.value);
                  }}
                  value={r_message}
                  placeholder="Reply..."
                  className="w-full min-w-[250px] md:min-w-[750px]"
                />
              </div>
              <div className="flex items-center">
                <Button
                  isLoading={loading}
                  type="button"
                  onClick={sendReply}
                  className="dark:bg-gray-200 dark:text-white"
                >
                  <ActionIcon
                    size="sm"
                    variant="text"
                    className="p-0 text-gray-500 hover:!text-gray-900"
                  >
                    <FaTelegramPlane className="h-[18px] w-[18px]" />
                  </ActionIcon>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function DotSeparator({ ...props }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="4"
      height="4"
      viewBox="0 0 4 4"
      fill="none"
      {...props}
    >
      <circle cx="2" cy="2" r="2" fill="#D9D9D9" />
    </svg>
  );
}
