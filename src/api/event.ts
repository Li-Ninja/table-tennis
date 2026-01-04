import { getApiDomain } from '@/config/api';
import { Event } from '@/types/event';

export const getEvent = async (): Promise<{ data: Event[] }> => {
  const url = 'event';
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
