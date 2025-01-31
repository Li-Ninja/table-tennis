'use client';

import {
  Empty, Tabs,
} from 'antd';
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import React, {
  useEffect, useState,
} from 'react';
import PlayerSelect from '@/component/global/playerSelect';
import ComparisonStats from '@/component/player/comparisonStats';
import PlayerProfile from '@/component/player/playerProfile';
import { usePlayerStore } from '@/store/player';
import type { Player } from '@/types/player';

dayjs.extend(utc);
dayjs.extend(timezone);

export default function Page() {
  const [playerAId, setPlayerAId] = useState<Player['id'] | undefined>(undefined);
  const [playerBId, setPlayerBId] = useState<Player['id'] | undefined>(undefined);
  const [activeTab, setActiveTab] = useState('1');
  const { playerList, fetchComparisonData, comparisonData } = usePlayerStore();
  const playerA = playerList.find((p: Player) => p.id === playerAId);
  const playerB = playerList.find((p: Player) => p.id === playerBId);

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const searchId = queryParams.get('id');

    if (searchId && Number(searchId)) {
      setPlayerAId(Number(searchId));
    }
  }, []);

  useEffect(() => {
    if (playerAId && playerBId) {
      fetchComparisonData(playerAId, playerBId);
    }
  }, [playerAId, playerBId, fetchComparisonData]);

  // 處理選手A變更
  const handlePlayerAChange = (id: number) => setPlayerAId(id);

  // 處理選手B變更
  const handlePlayerBChange = (id: number) => setPlayerBId(id);

  const SinglePlayerMode = () => (
    <div className="flex flex-col gap-4">
      <PlayerSelect
        className="flex-1"
        id={playerAId}
        setId={setPlayerAId}
      />
      {playerAId ? <PlayerProfile playerId={playerAId} /> : <Empty description={false} />}
    </div>
  );

  const ComparisonMode = () => (
    <div className="flex flex-col gap-4">
      <div className="flex gap-4">
        <PlayerSelect
          className="flex-1"
          id={playerAId}
          setId={handlePlayerAChange}
          excludeIdList={playerBId ? [playerBId] : []}
        />
        <PlayerSelect
          className="flex-1"
          id={playerBId}
          setId={handlePlayerBChange}
          excludeIdList={playerAId ? [playerAId] : []}
        />
      </div>
      {playerA && playerB ? (
        <>
          <div className="grid grid-cols-2 gap-4">
            <div className="border-r border-gray-700 pr-4">
              <PlayerProfile playerId={playerA.id} isComparing={true} />
            </div>
            <div className="pl-4">
              <PlayerProfile playerId={playerB.id} isComparing={true} />
            </div>
          </div>
          <ComparisonStats playerA={playerA} playerB={playerB} data={comparisonData} />
        </>
      ) : (
        <Empty
          description={
            <span className="text-gray-400">請選擇兩位選手進行比較</span>
          }
        />
      )}
    </div>
  );

  return (
    <div className="p-5 bg-[#333] text-white">
      <Tabs
        activeKey={activeTab}
        onChange={setActiveTab}
        items={[
          {
            key: '1',
            label: '單一選手資料',
            children: <SinglePlayerMode />,
          },
          {
            key: '2',
            label: '選手比較',
            children: <ComparisonMode />,
          },
        ]}
        className="custom-dark-tabs"
      />
      <style jsx global>{`
        .custom-dark-tabs .ant-tabs-tab {
          @apply text-white/65 !important;
        }
        .custom-dark-tabs .ant-tabs-tab:hover {
          @apply text-white/85 !important;
        }
        .custom-dark-tabs .ant-tabs-tab.ant-tabs-tab-active {
          @apply text-white !important;
        }
        .custom-dark-tabs .ant-tabs-ink-bar {
          @apply bg-primary !important;
        }
        .custom-dark-tabs .ant-tabs-nav::before {
          @apply border-b border-white/10 !important;
        }
      `}</style>
    </div>
  );
}
