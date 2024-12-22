import { create } from 'zustand';
import {
  getPlayer,
  getPlayerComparison,
} from '@/api/player';
import type {
  Player,
  PlayerComparisonData,
} from '@/types/player';

interface ComparisonData {
  playerA: PlayerComparisonData;
  playerB: PlayerComparisonData;
}

interface Store {
  playerList: Player[];
  comparisonData: ComparisonData | null;
  fetchPlayerList: () => Promise<void>;
  fetchComparisonData: (playerAId: number, playerBId: number) => Promise<void>;
  clearComparisonData: () => void;
}

export const usePlayerStore = create<Store>(set => ({
  playerList: [] as Player[],
  comparisonData: null,

  fetchPlayerList: async () => {
    const { data } = await getPlayer();

    set({ playerList: data });
  },

  fetchComparisonData: async (playerAId: number, playerBId: number) => {
    const { data } = await getPlayerComparison(playerAId, playerBId);

    set({ comparisonData: data });
  },

  clearComparisonData: () => {
    set({ comparisonData: null });
  },
}));
