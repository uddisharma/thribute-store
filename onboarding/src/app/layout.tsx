'use client';
import dynamic from 'next/dynamic';
import { Toaster } from 'react-hot-toast';
import GlobalDrawer from './shared/drawer-views/container';
import GlobalModal from './shared/modal-views/container';
import { ThemeProvider } from './shared/theme-provider';
import { siteConfig } from '@/config/site.config';
import { inter, lexendDeca } from '@/app/fonts';
import cn from '@/utils/class-names';
import { Toaster1 } from '@/components/ui/toast';
const NextProgress = dynamic(() => import('@/components/next-progress'), {
  ssr: false,
});
// styles
import '@/app/globals.css';
import { UserProvider } from '@/store/user/context';
import Header from './multi-step/header';

const metadata = {
  title: siteConfig.title,
  description: siteConfig.description,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={cn(inter.variable, lexendDeca.variable, 'font-inter')}
      >
        <UserProvider>
          <ThemeProvider>
            <NextProgress />
            <div className="min-h-screen bg-gradient-to-r from-[#136A8A] to-[#267871] @container">
              <Header />

              {children}
            </div>
            <Toaster />
            <Toaster1 position="bottom-left" closeButton={true} />
            <GlobalDrawer />
            <GlobalModal />
          </ThemeProvider>
        </UserProvider>
      </body>
    </html>
  );
}
