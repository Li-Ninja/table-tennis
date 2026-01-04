import { getApiDomain } from '@/config/api';
import { getUtcDateTime } from '@/constant/common';
import { EventTypeEnum } from '@/enum/Event';
import {
  Result, ResultItem, ResultRanking, ResultRankingGet,
} from '@/types/result';

export const getResult = async (): Promise<{ data: Result[] }> => {
  const url = 'result';
  const data = await fetch(`${getApiDomain()}/api/${url}`, {
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

export const getResultRanking = async (getData: ResultRankingGet):
Promise<{ data: ResultRanking[] }> => {
  const url = 'result/resultRanking';
  const startDate = getUtcDateTime(getData.startDate);
  const endDate = getUtcDateTime(getData.endDate);
  let query = `startDate=${startDate}&endDate=${endDate}`;

  query += `&event_type=${EventTypeEnum.Score}`;

  if (getData.subEventType) {
    query += `&subEventType=${getData.subEventType}`;
  }

  if (getData.playerA1) {
    query += `&player_Id_A_1=${getData.playerA1}`;
  }

  if (getData.playerB1) {
    query += `&player_Id_B_1=${getData.playerB1}`;
  }

  if (getData.playerA2) {
    query += `&player_Id_A_2=${getData.playerA2}`;
  }

  if (getData.playerB2) {
    query += `&player_Id_B_2=${getData.playerB2}`;
  }

  const data = await fetch(`${getApiDomain()}/api/${url}?${query}`, {
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

export const getResultItem = async (): Promise<{ data: ResultItem[] }> => {
  const url = 'resultItem';
  const data = await fetch(`${getApiDomain()}/api/${url}`, {
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
