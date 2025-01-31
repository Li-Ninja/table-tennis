import {
  IRenderSeedProps, IRoundProps,
} from 'react-brackets';
import { SubEventTypeEnum } from '@/enum/Event';

// TODO playerId is not undefined
type ExtendedSeed = {
  teams: Array<{
        name?: string;
        score?: number;
        playerId?: number;
    }>;
  winnerId?: number;
};

interface ICustomRoundProps extends IRoundProps {
  seeds: Array<IRoundProps['seeds'][number] & ExtendedSeed>;
}

interface ICustomRenderSeedProps extends IRenderSeedProps {
  seed: IRoundProps['seeds'][number] & ExtendedSeed;
}

export interface Result {
  id: number;
  event_id: number;
  event_name: number;
  round: number;
  player_name_a_1: Player['name'] | null;
  player_name_a_2: Player['name'] | null;
  player_name_b_1: Player['name'] | null;
  player_name_b_2: Player['name'] | null;
  doublePlayer_name_a: string | null;
  doublePlayer_name_b: string | null;
  player_id_a_1: Player['id'] | null;
  player_id_a_2: Player['id'] | null;
  player_id_b_1: Player['id'] | null;
  player_id_b_2: Player['id'] | null;
  scoreA: number | null;
  scoreB: number | null;
}

export interface ResultItem {
  result_id: Result['id'];
  matchIndex: number;
  scoreA: number;
  scoreB: number;
}

export interface ResultRanking extends Pick<Result,
'id' |
'event_id' |
'event_name' |
'player_id_a_1' |
'player_id_b_1' |
'player_name_a_1' |
'player_name_b_1' |
'player_id_a_2' |
'player_id_b_2' |
'player_name_a_2' |
'player_name_b_2' |
'doublePlayer_name_a' |
'doublePlayer_name_b' |
'scoreA' |
'scoreB'
> {
  resultDateTime: string;
  resultItemList: ResultItem[];
}

export interface ResultRankingGet {
  startDate: string;
  endDate: string;
  subEventType?: SubEventTypeEnum;
  playerA1?: Player['id'];
  playerB1?: Player['id'];
  playerA2?: Player['id'];
  playerB2?: Player['id'];
}
