'use client';

import { useEffect } from 'react';
import { usePlayerStore } from '@/store/player';

export default function ApiRegistry(): JSX.Element {
  const { fetchPlayerList } = usePlayerStore(state => state);

  useEffect(() => {
    fetchPlayerList();
  }, []);

  return <></>;
}
