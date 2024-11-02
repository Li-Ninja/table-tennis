import {
  RacketTypeEnum, RubberTypeEnum,
} from '@/enum/player';

export interface Player {
  id: number;
  name: string;
  score: number;
  rank?: number;
  isMan:boolean;
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
