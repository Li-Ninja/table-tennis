import { create } from 'zustand';
import {
  getDoublePlayer,
  getPlayer,
  getPlayerComparison,
} from '@/api/player';
import type {
  DoublePlayer,
  Player,
  PlayerComparisonData,
} from '@/types/player';

interface ComparisonData {
  playerA: PlayerComparisonData;
  playerB: PlayerComparisonData;
}

interface Store {
  playerList: Player[];
  doublePlayerList: DoublePlayer[];
  comparisonData: ComparisonData | null;
  fetchPlayerList: () => Promise<void>;
  fetchDoublePlayerList: () => Promise<void>;
  fetchComparisonData: (playerAId: number, playerBId: number) => Promise<void>;
  clearComparisonData: () => void;
}

export const usePlayerStore = create<Store>(set => ({
  playerList: [] as Player[],
  doublePlayerList: [] as DoublePlayer[],
  comparisonData: null,

  fetchPlayerList: async () => {
    const { data } = await getPlayer();

    set({ playerList: data });
  },

  fetchDoublePlayerList: async () => {
    const { data } = await getDoublePlayer();

    set({ doublePlayerList: data });
  },

  fetchComparisonData: async (playerAId: number, playerBId: number) => {
    const { data } = await getPlayerComparison(playerAId, playerBId);

    set({ comparisonData: data });
  },

  clearComparisonData: () => {
    set({ comparisonData: null });
  },
}));
