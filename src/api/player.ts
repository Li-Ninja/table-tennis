import type {
  DoublePlayer,
  Player,
  PlayerComparisonData,
} from '@/types/player';

export const getPlayer = async (): Promise<{ data: Player[] }> => {
  const url = 'player';
  const data = await fetch(`${process.env.NEXT_PUBLIC_API_DOMAIN}/api/${url}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then(res => res.json());

  if (data.error) {
    throw data.error;
  }

  return { data };
};

export const getDoublePlayer = async (): Promise<{ data: DoublePlayer[] }> => {
  const url = 'player/doublePlayer';
  const data = await fetch(`${process.env.NEXT_PUBLIC_API_DOMAIN}/api/${url}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then(res => res.json());

  if (data.error) {
    throw data.error;
  }

  return { data };
};

// const generatePlayerStats = (baseWinRate: number): PlayerStats => ({
//   winRate: baseWinRate,
//   gameWinRate: baseWinRate - 0.05,
//   averageScore: 9 + baseWinRate,
//   criticalGameWinRate: baseWinRate + 0.02,
//   longestWinStreak: Math.floor(baseWinRate * 10),
//   criticalPointRate: baseWinRate - 0.03,
//   gameDistribution: {
//     '3-0': 0.25,
//     '3-1': 0.35,
//     '3-2': 0.4,
//   },
//   scoreDistribution: {
//     '11-9': 0.3,
//     '11-7': 0.4,
//     '11-5': 0.3,
//   },
// });

export const getPlayerComparison = async (
  playerAId: number,
  playerBId: number,
): Promise<{ data: Record<'playerA' | 'playerB', PlayerComparisonData> }> => {
  const url = 'player/comparison';
  const query = `idA=${playerAId}&idB=${playerBId}`;
  const data = await fetch(`${process.env.NEXT_PUBLIC_API_DOMAIN}/api/${url}?${query}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then(res => res.json());

  if (data.error) {
    throw data.error;
  }

  return { data };
};
