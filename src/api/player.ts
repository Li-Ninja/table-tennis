import { Player } from '@/types/player';

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
