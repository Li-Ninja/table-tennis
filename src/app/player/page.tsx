'use client';

import { Empty } from 'antd';
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import React, {
  useEffect, useState,
} from 'react';
import PlayerSelect from '@/component/global/playerSelect';
import PlayerProfile from '@/component/player/playerProfile';

dayjs.extend(utc);
dayjs.extend(timezone);

export default function Page() {
  const [playerA, setPlayerA] = useState<number | undefined>(undefined);

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const searchId = queryParams.get('id');

    if (searchId) {
      if (Number(searchId)) {
        setPlayerA(Number(searchId));
      }
    }
  }, []);

  return (
    <div className="p-5" style={{ backgroundColor: '#333', color: '#fff' }}>
      <div className="flex flex-col mb-6  gap-4 md:gap-y-0 justify-between">
        <PlayerSelect
          className="flex-1"
          id={playerA}
          setId={setPlayerA}
        />
        {/* <PlayerSelect
          className="flex-1"
          id={playerB}
          setId={setPlayerB}
          disable={!playerA}
        /> */}
        {/* <Button
          loading={isLoading}
          type="primary"
          size="large"
          icon={<SearchOutlined />}
          onClick={search}
          // TODO: type 用 primary 效果沒有出來，可能是被 tailwind 影響，所以這裡還會要額外加上 bg-primary
          className="bg-primary flex-1"
        >
          搜尋
        </Button> */}
      </div>
      {playerA ? <PlayerProfile playerId={playerA} /> : <Empty description={false} />}
    </div>
  );
}
