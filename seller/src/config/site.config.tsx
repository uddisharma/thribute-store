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
  title: 'Seller Panel | The Small Cart',
  description: `Seller Panel | The Small Cart`,
  logo: logoImg,
  logoWhite: logoWhite,
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
    title: 'Seller Panel | The Small Cart',
    description,
    openGraph: openGraph ?? {
      title: 'Seller Panel | The Small Cart',
      description,
      url: '',
      siteName: 'Seller Panel | The Small Cart', // https://developers.google.com/search/docs/appearance/site-names
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
