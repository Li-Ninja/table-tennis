import { getUtcDateTime } from '@/constant/common';
import {
  Result, ResultItem, ResultRanking, ResultRankingGet,
} from '@/types/result';

export const getResult = async (): Promise<{ data: Result[] }> => {
  const url = 'result';
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

export const getResultRanking = async (getData: ResultRankingGet):
Promise<{ data: ResultRanking[] }> => {
  const url = 'result/resultRanking';
  const startDate = getUtcDateTime(getData.startDate);
  const endDate = getUtcDateTime(getData.endDate);

  const data = await fetch(`${process.env.NEXT_PUBLIC_API_DOMAIN}/api/${url}?event_type=3&startDate=${startDate}&endDate=${endDate}`, {
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
