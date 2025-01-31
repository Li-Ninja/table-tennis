'use client';

import { useEffect } from 'react';
import { useEventStore } from '@/store/event';
import { usePlayerStore } from '@/store/player';

export default function ApiRegistry(): JSX.Element {
  const { fetchPlayerList, fetchDoublePlayerList } = usePlayerStore(state => state);
  const { fetchEventList } = useEventStore(state => state);

  useEffect(() => {
    fetchPlayerList();
    fetchDoublePlayerList();
    fetchEventList();
  }, []);

  return <></>;
}
