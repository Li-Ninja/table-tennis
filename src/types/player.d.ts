import {
  RacketTypeEnum, RubberTypeEnum,
} from '@/enum/player';

export interface Player {
  id: number;
  name: string;
  score: number;
  rank?: number;
  isMan: boolean;
  isRightHand: boolean;
  racketType: RacketTypeEnum;
  forehandRubberType: RubberTypeEnum;
  backhandRubberType: RubberTypeEnum;
  resultCount: number;
  winningCount: number;
  latestResultDateTime?: string;
  updateDateTime?: string;
  isOnLeave: boolean;
}

export interface PlayerStats {
  winRate: number;
  gameWinRate: number;
  averageScore: number;
  criticalGameWinRate: number;
  longestWinStreak: number;
  criticalPointRate: number;
  // gameDistribution: {
  //   '3-0': number;
  //   '3-1': number;
  //   '3-2': number;
  // };
  // scoreDistribution: {
  //   '11-9': number;
  //   '11-7': number;
  //   '11-5': number;
  // };
}

export interface PlayerComparisonData {
  all: PlayerStats;
  recent: PlayerStats;
  // yearly: Record<number, PlayerStats>;
}
