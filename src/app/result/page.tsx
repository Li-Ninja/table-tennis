import { Metadata } from 'next';
import ClientPage from './client';

export const metadata: Metadata = {
  title: 'Ttt51 - 年終賽',
};

export default function Page() {
  return <ClientPage />;
}
