import {
  Card,
  Select,
  Tabs,
} from 'antd';
import { TabsProps } from 'antd/lib/tabs';
import dayjs from 'dayjs';
import Decimal from 'decimal.js';
import { useState } from 'react';
import type {
  Player, PlayerComparisonData,
} from '@/types/player';

interface ComparisonStatsProps {
  playerA: Player;
  playerB: Player;
  data: {
    playerA: PlayerComparisonData;
    playerB: PlayerComparisonData;
  } | null;
}

interface ComparisonComponentProps extends ComparisonStatsProps {
  type: 'all' | 'recent';
}

interface StatCardProps {
  title: string;
  playerAValue?: string | number;
  playerBValue?: string | number;
  description?: string;
  playerAName: string;
  playerBName: string;
}

const StatCard = ({
  title,
  playerAValue,
  playerBValue,
  description,
  playerAName,
  playerBName,
}: StatCardProps) => (
  <Card className="bg-gray-800 border-gray-700">
    <h3 className="text-lg font-bold text-gray-200 mb-4">{title}</h3>
    <div className="grid grid-cols-2 gap-4">
      <div className="text-center">
        <div className="text-2xl font-bold text-primary">{playerAValue}</div>
        <div className="text-sm text-gray-400">{playerAName}</div>
      </div>
      <div className="text-center">
        <div className="text-2xl font-bold text-primary">{playerBValue}</div>
        <div className="text-sm text-gray-400">{playerBName}</div>
      </div>
    </div>
    {description && (
      <div className="mt-2 text-sm text-gray-400 text-center">{description}</div>
    )}
  </Card>
);

const StatsSection = ({ playerA, playerB, data, type }: ComparisonComponentProps) => (
  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
    <StatCard
      title="整體勝率"
      playerAValue={data?.playerA[type].winRate !== undefined ? `${new Decimal(data.playerA[type].winRate).mul(100).toFixed(0)}%` : '-'}
      playerBValue={data?.playerB[type].winRate !== undefined ? `${new Decimal(data.playerB[type].winRate).mul(100).toFixed(0)}%` : '-'}
      playerAName={playerA.name}
      playerBName={playerB.name}
    />
    <StatCard
      title="每局勝率"
      playerAValue={data?.playerA[type].gameWinRate !== undefined ? `${new Decimal(data.playerA[type].gameWinRate).mul(100).toFixed(0)}%` : '-'}
      playerBValue={data?.playerB[type].gameWinRate !== undefined ? `${new Decimal(data.playerB[type].gameWinRate).mul(100).toFixed(0)}%` : '-'}
      playerAName={playerA.name}
      playerBName={playerB.name}
    />
    <StatCard
      title="每局平均得分"
      playerAValue={data?.playerA[type].averageScore !== undefined ? new Decimal(data.playerA[type].averageScore).toFixed(1) : '-'}
      playerBValue={data?.playerB[type].averageScore !== undefined ? new Decimal(data.playerB[type].averageScore).toFixed(1) : '-'}
      playerAName={playerA.name}
      playerBName={playerB.name}
    />
    <StatCard
      title="關鍵局勝率"
      playerAValue={data?.playerA[type].criticalGameWinRate !== undefined ? `${new Decimal(data.playerA[type].criticalGameWinRate).mul(100).toFixed(0)}%` : '-'}
      playerBValue={data?.playerB[type].criticalGameWinRate !== undefined ? `${new Decimal(data.playerB[type].criticalGameWinRate).mul(100).toFixed(0)}%` : '-'}
      description="第五局或決勝局的表現"
      playerAName={playerA.name}
      playerBName={playerB.name}
    />
    <StatCard
      title="最長連勝"
      playerAValue={data?.playerA[type].longestWinStreak !== undefined ? `${data.playerA[type].longestWinStreak}局` : '-'}
      playerBValue={data?.playerB[type].longestWinStreak !== undefined ? `${data.playerB[type].longestWinStreak}局` : '-'}
      playerAName={playerA.name}
      playerBName={playerB.name}
    />
    <StatCard
      title="關鍵分表現"
      playerAValue={data?.playerA[type].criticalPointRate !== undefined ? `${new Decimal(data.playerA[type].criticalPointRate).mul(100).toFixed(0)}%` : '-'}
      playerBValue={data?.playerB[type].criticalPointRate !== undefined ? `${new Decimal(data.playerB[type].criticalPointRate).mul(100).toFixed(0)}%` : '-'}
      description="10分以上的得分率"
      playerAName={playerA.name}
      playerBName={playerB.name}
    />
  </div>
);

const DetailedAnalysis = ({ playerA, playerB, data }: ComparisonComponentProps) => (
  <div className="mt-6 space-y-6">
    <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
      <h3 className="text-lg font-bold text-gray-200 mb-4">局數分析</h3>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <h4 className="text-gray-300 mb-2">{playerA.name}</h4>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-400">3-0</span>
              <span className="text-primary">25%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">3-1</span>
              <span className="text-primary">35%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">3-2</span>
              <span className="text-primary">40%</span>
            </div>
          </div>
        </div>
        <div>
          <h4 className="text-gray-300 mb-2">{playerB.name}</h4>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-400">3-0</span>
              <span className="text-primary">30%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">3-1</span>
              <span className="text-primary">45%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">3-2</span>
              <span className="text-primary">25%</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
      <h3 className="text-lg font-bold text-gray-200 mb-4">得分分佈</h3>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <h4 className="text-gray-300 mb-2">{playerA.name}</h4>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-400">11-9以下</span>
              <span className="text-primary">30%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">11-7以下</span>
              <span className="text-primary">45%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">11-5以下</span>
              <span className="text-primary">25%</span>
            </div>
          </div>
        </div>
        <div>
          <h4 className="text-gray-300 mb-2">{playerB.name}</h4>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-400">11-9以下</span>
              <span className="text-primary">35%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">11-7以下</span>
              <span className="text-primary">40%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">11-5以下</span>
              <span className="text-primary">25%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const YearlyStats = ({ playerA, playerB, data }: ComparisonComponentProps) => {
  const currentYear = dayjs().year();
  const startYear = 2024;
  const [selectedYear, setSelectedYear] = useState(currentYear);

  const years = Array.from(
    { length: currentYear - startYear + 1 },
    (_, i) => currentYear - i,
  ).filter(year => year >= startYear);

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <Select
          value={selectedYear}
          onChange={setSelectedYear}
          options={years.map(year => ({
            value: year,
            label: `${year}年`,
          }))}
          className="w-32"
        />
      </div>
      <StatsSection playerA={playerA} playerB={playerB} data={data} type={'all'} />
      <DetailedAnalysis playerA={playerA} playerB={playerB} data={data} type={'all'} />
    </div>
  );
};

export default function ComparisonStats({ playerA, playerB, data }: ComparisonStatsProps) {
  const items: TabsProps['items'] = [
    {
      key: 'all',
      label: '歷史數據',
      children: (
        <div className="space-y-6">
          <StatsSection playerA={playerA} playerB={playerB} data={data} type={'all'} />
          {/* <DetailedAnalysis playerA={playerA} playerB={playerB} data={data} /> */}
        </div>
      ),
    },
    {
      key: 'recent',
      label: '近10場',
      children: (
        <div className="space-y-6">
          <StatsSection playerA={playerA} playerB={playerB} data={data} type={'recent'} />
          {/* <DetailedAnalysis playerA={playerA} playerB={playerB} data={data} /> */}
        </div>
      ),
    },
    // {
    //   key: 'yearly',
    //   label: '年度統計',
    //   children: <YearlyStats playerA={playerA} playerB={playerB} />,
    // },
  ];

  return (
    <div className="mt-8 p-6 bg-gray-900 rounded-lg border border-gray-700">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-200">選手比較數據</h2>
      <Tabs
        items={items}
        className="custom-dark-tabs"
        defaultActiveKey="all"
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
