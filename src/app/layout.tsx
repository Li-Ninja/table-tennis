import classNames from 'classnames';
import type { Metadata } from 'next';
import { Noto_Sans_SC as noto } from 'next/font/google';
import Header from '@/component/global/header';
import 'tw-elements-react/dist/css/tw-elements-react.min.css';
import './globals.css';

export const metadata: Metadata = {
  title: 'Table Tennis Mystery Zone 51',
  description: 'Table Tennis Mystery Zone 51"',
};

const font = noto({ weight: ['200', '400', '500', '700'], subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={classNames('mx-2 mt-2', font.className)}>
        <Header />
        {children}
      </body>
    </html>
  );
}
