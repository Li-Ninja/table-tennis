import { create } from 'zustand';
import { getEvent } from '@/api/event';
import { Event } from '@/types/event';

// 定義 store 狀態和操作的接口
interface Store {
  eventList: Event[];
  fetchEventList: () => Promise<void>;
}

export const useEventStore = create<Store>(set => ({
  eventList: [] as Event[],
  fetchEventList: async () => {
    const { data } = await getEvent();

    set({ eventList: data });
  },
}));
