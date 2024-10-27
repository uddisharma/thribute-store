'use client';

import Link from 'next/link';
import Image from 'next/image';
import cn from '@/utils/class-names';
import { Button } from '@/components/ui/button';
import { useMedia } from '@/hooks/use-media';
import { siteConfig } from '@/config/site.config';
import { useCookies } from 'react-cookie';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '@/store/user/context';
import { toast } from 'sonner';
import { HiLogout } from 'react-icons/hi';
import { Switch } from 'rizzui';
import { IoMdSunny, IoIosMoon } from 'react-icons/io';
import { useTheme } from 'next-themes';
import { updateThemeColor } from '@/utils/update-theme-color';
import { presetDark, presetLight } from '@/config/color-presets';

import { useColorPresetName } from '@/hooks/use-theme-color';

interface FooterProps {
  className?: string;
}

export default function Header({ className }: FooterProps) {
  const isMobile = useMedia('(max-width: 767px)', false);
  const [cookies, setCookie, removeCookie] = useCookies(['sellertoken']);
  const [auth, setAuth] = useState(false);
  const { state } = useContext(UserContext);

  useEffect(() => {
    const cookieValue = cookies.sellertoken;
    const seller = state?.user?.email;
    if (cookieValue && seller) {
      setAuth(true);
    }
  }, []);

  const { theme, setTheme } = useTheme();
  const { colorPresetName } = useColorPresetName();

  const switchTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);

    // Update theme colors based on your logic
    if (newTheme === 'light' && colorPresetName === 'black') {
      updateThemeColor(
        presetLight.lighter,
        presetLight.light,
        presetLight.default,
        presetLight.dark,
        presetLight.foreground
      );
    }
    if (newTheme === 'dark' && colorPresetName === 'black') {
      updateThemeColor(
        presetDark.lighter,
        presetDark.light,
        presetDark.default,
        presetDark.dark,
        presetDark.foreground
      );
    }
  };

  useEffect(() => {
    if (theme === 'light') {
      switchTheme();
    }
  }, []);
  return (
    <header
      className={cn(
        'flex w-full items-center justify-between px-4 py-5 md:h-20 md:px-5 lg:px-8 4xl:px-10',
        className
      )}
    >
      <Link href={'/'}>
        <Image
          src={ siteConfig.logo}
          alt={siteConfig.title}
          className="w-[150px] invert"
          priority
        />
      </Link>
      <div className="flex items-center gap-2">
        <Switch
          offIcon={<IoMdSunny className="h-3.5 w-3.5" />}
          onIcon={<IoIosMoon className="h-3 w-3" />}
          variant="outline"
          checked={theme === 'dark'}
          onChange={switchTheme}
        />
        {auth && (
          <Button
            onClick={() => {
              localStorage.removeItem('onboarding');
              removeCookie('sellertoken', { path: '/' });
              toast.success('Logout Successfull !');
              location.reload();
            }}
            rounded="pill"
            variant="outline"
            className="gap-2 whitespace-nowrap text-white hover:enabled:border-white dark:border-gray-800 dark:hover:enabled:border-white"
          >
            Logout
            <HiLogout className="h-4 w-4" />
          </Button>
        )}
      </div>
    </header>
  );
}
