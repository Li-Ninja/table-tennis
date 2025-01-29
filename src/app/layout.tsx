import { GoogleTagManager } from '@next/third-parties/google';
import classNames from 'classnames';
import type { Metadata } from 'next';
import { Noto_Sans_SC as noto } from 'next/font/google';
import Header from '@/component/global/header';
import AntdRegistry from '@/component/registry/antdRegistry';
import ApiRegistry from '@/component/registry/apiRegistry';
import './globals.css';

export const metadata: Metadata = {
  title: 'Ttt51 - 首頁',
  description: 'Taiwan Table Tennis 51',
};

const font = noto({ weight: ['200', '400', '500', '700'], subsets: ['latin'] });

const gtmId = process.env.NEXT_PUBLIC_GTM_ID;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={classNames('md:mx-2 mt-2', font.className)}>
        <ApiRegistry />
        <AntdRegistry>
          <Header />
          {children}
        </AntdRegistry>
      </body>
      {process.env.isProduction === 'true' && gtmId && <GoogleTagManager gtmId={gtmId} />}
    </html>
  );
}
