import { Metadata } from 'next';
import logoImg from '@public/logo.png';
import logoWhite from '@public/whitelogo.png';
import { LAYOUT_OPTIONS } from '@/config/enums';
import logoIconImg from '@public/logo-short.svg';
import { OpenGraph } from 'next/dist/lib/metadata/types/opengraph-types';

enum MODE {
  DARK = 'dark',
  LIGHT = 'light',
}

export const siteConfig = {
  title: 'Admin Panel | Thribute Store',
  description: `Admin Panel | Thribute Store`,
  logo: logoImg,
  logoWhite,
  icon: logoIconImg,
  mode: MODE.LIGHT,
  layout: LAYOUT_OPTIONS.HYDROGEN,
  // TODO: favicon
};

export const metaObject = (
  title?: string,
  openGraph?: OpenGraph,
  description: string = siteConfig.description
): Metadata => {
  return {
    title: 'Admin Panel | Thribute Store',
    description,
    openGraph: openGraph ?? {
      title: 'Admin Panel | Thribute Store',
      description,
      url: '',
      siteName: 'Admin Panel | Thribute Store', // https://developers.google.com/search/docs/appearance/site-names
      images: {
        url: '',
        width: 1200,
        height: 630,
      },
      locale: 'en_US',
      type: 'website',
    },
  };
};
