import { GoogleTagManager } from '@next/third-parties/google';
import classNames from 'classnames';
import type { Metadata } from 'next';
import { Noto_Sans_SC as noto } from 'next/font/google';
import AntdRegistry from '@/component/global/antdRegistry';
import Header from '@/component/global/header';
import 'tw-elements-react/dist/css/tw-elements-react.min.css';
import './globals.css';

export const metadata: Metadata = {
  title: 'Table Tennis Mystery Zone 51',
  description: 'Table Tennis Mystery Zone 51"',
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
      <body className={classNames('mx-2 mt-2', font.className)}>
        <AntdRegistry>
          <Header />
          {children}
        </AntdRegistry>
      </body>
      {process.env.isProduction === 'true' && gtmId && <GoogleTagManager gtmId={gtmId} />}
    </html>
  );
}
