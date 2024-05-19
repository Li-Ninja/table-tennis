import {
  IRenderSeedProps, IRoundProps,
} from 'react-brackets';

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
  player_nameA1: Player['name'] | null;
  player_nameA2: Player['name'] | null;
  player_nameB1: Player['name'] | null;
  player_nameB2: Player['name'] | null;
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
'player_nameA1' |
'player_nameB1' |
'scoreA' |
'scoreB'
> {
  resultDateTime: string;
  resultItemList: ResultItem[];
}

export interface ResultRankingGet {
  startDate: string;
  endDate: string;
  playerA?: Player['id'];
  playerB?: Player['id'];
}
