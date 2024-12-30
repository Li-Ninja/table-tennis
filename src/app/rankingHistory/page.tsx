import { Metadata } from 'next';
import ClientPage from './client';

export const metadata: Metadata = {
  title: 'Ttt51 - 積分記錄',
};

export default function Page() {
  return <ClientPage />;
}
