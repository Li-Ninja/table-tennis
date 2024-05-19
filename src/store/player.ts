import { create } from 'zustand';
import { getPlayer } from '@/api/player';
import { Player } from '@/types/player';

// 定義 store 狀態和操作的接口
interface Store {
  playerList: Player[];
  fetchPlayerList: () => Promise<void>;
}

export const usePlayerStore = create<Store>(set => ({
  playerList: [] as Player[],
  fetchPlayerList: async () => {
    const { data } = await getPlayer();

    set({ playerList: data });
  },
}));
