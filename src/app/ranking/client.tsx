'use client';

import {
  ExclamationCircleOutlined, QuestionCircleOutlined,
} from '@ant-design/icons';
import {
  Button, Tabs, Tooltip,
} from 'antd';
import type { TabsProps } from 'antd';
import classNames from 'classnames';
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import { useRouter } from 'next/navigation';
import React, {
  useEffect, useState,
} from 'react';
import { usePlayerStore } from '@/store/player';
import {
  DoublePlayer, Player,
} from '@/types/player';

dayjs.extend(utc);
dayjs.extend(timezone);

const styles = {
  firstPlace: { backgroundColor: '#c9b037' },
  secondPlace: { backgroundColor: '#a8a8a8' },
  thirdPlace: { backgroundColor: '#ad6f69' },
};

export default function Ranking() {
  const [activeKey, setActiveKey] = useState('single');
  const [newPlayerList, setNewPlayerList] = useState<Player[]>([]);
  const [newDoublePlayerList, setNewDoublePlayerList] = useState<DoublePlayer[]>([]);
  const { playerList, doublePlayerList } = usePlayerStore(state => state);
  const router = useRouter();

  useEffect(() => {
    const twoMonthsAgo = dayjs().subtract(2, 'month');

    const filteredPlayerData = playerList
      .filter(player => {
        if (player.latestResultDateTime === null) {
          return false;
        }

        const playerUpdateDate = dayjs(player.latestResultDateTime);

        return player.isOnLeave || playerUpdateDate.isAfter(twoMonthsAgo);
      })
      .sort((a, b) => {
        if (b.score !== a.score) {
          return b.score - a.score;
        }

        const bWinningRate = (b.winningCount / b.resultCount);
        const aWinningRate = (a.winningCount / a.resultCount);

        return bWinningRate - aWinningRate;
      });

    setNewPlayerList(filteredPlayerData);

    const filteredDoublePlayerData = doublePlayerList
      .sort((a, b) => {
        if (b.score !== a.score) {
          return b.score - a.score;
        }

        const bWinningRate = (b.winningCount / b.resultCount);
        const aWinningRate = (a.winningCount / a.resultCount);

        return bWinningRate - aWinningRate;
      });

    setNewDoublePlayerList(filteredDoublePlayerData);
  }, [playerList, doublePlayerList]);

  function winningRate(item: Player | DoublePlayer) {
    if (item.resultCount === 0) {
      return '-';
    }

    return `${Math.round((item.winningCount / item.resultCount) * 100)}%`;
  }

  const updateDateTimeTips = <span>超過 2 個月沒有新的比賽記錄時，會先暫時隱藏該選手的排名</span>;

  function isMoreThanOneMonthOld(date: string | Date | undefined) {
    if (!date) {
      return false;
    }

    const oneMonthAgo = dayjs().subtract(1, 'month');
    const inputDate = dayjs(date);

    return inputDate.isBefore(oneMonthAgo);
  }

  function daysFromTodayTips(date: string | Date | undefined) {
    if (!date) {
      return false;
    }

    const today = dayjs();
    const inputDate = dayjs(date);

    const daysDifference = today.diff(inputDate, 'day');

    return <span>有 {daysDifference} 天沒有新的比賽記錄</span>;
  }

  const rankTips = <span>點擊排名可以查看選手的比賽記錄</span>;
  const playerTips = <span>點擊名字可以查看選手的資訊</span>;

  // NOTE: 如果是 12 月，就顯示明年
  const getResultCountByYearlyTitle = (date = dayjs()) => `${date.month() === 11 ? date.year() + 1 : date.year()} 累計場次`;

  const RankingTable = ({ type }: { type: 'single' | 'double' }) => (
    <div className="inline-block min-w-full">
      <div className="overflow-auto">
        <table className="min-w-full text-left text-sm font-light">
          <thead
            className="border-b font-medium border-neutral-500 bg-neutral-600">
            <tr>
              <th scope="col" className="px-3 py-4 sticky top-0 left-0 z-20 bg-neutral-600">
                #
                <Tooltip className="ml-1" placement="bottom" title={rankTips}>
                  <QuestionCircleOutlined />
                </Tooltip>
              </th>
              <th scope="col" className="px-2 py-4 sticky top-0 left-70px z-10 bg-neutral-600">
                選手
                <Tooltip className="ml-1" placement="bottom" title={playerTips}>
                  <QuestionCircleOutlined />
                </Tooltip>
              </th>
              <th scope="col" className="px-6 py-4">積分</th>
              <th scope="col" className="px-6 py-4">{getResultCountByYearlyTitle()}</th>
              <th scope="col" className="px-6 py-4">總累計場次</th>
              <th scope="col" className="px-6 py-4">勝率</th>
              <th scope="col" className="px-6 py-4">
                最近比賽時間
                <Tooltip className="ml-1" placement="bottom" title={updateDateTimeTips}>
                  <QuestionCircleOutlined />
                </Tooltip>
              </th>
              <th scope="col" className="px-6 py-4">
                積分更新時間
              </th>
            </tr>
          </thead>
          <tbody>

            {(type === 'single' ? newPlayerList : newDoublePlayerList).map((item, index) => (
              <tr
                key={index}
                style={
                  item.rank === 1 ? styles.firstPlace
                    : item.rank === 2 ? styles.secondPlace
                      : item.rank === 3 ? styles.thirdPlace : {}
                  }
                className="border-b border-neutral-500 bg-neutral-700">
                <td
                  className="whitespace-nowrap px-3 py-4 font-medium sticky top-0 left-0 z-20 bg-neutral-700 border-b border-neutral-500"
                  style={
                  item.rank === 1 ? styles.firstPlace
                    : item.rank === 2 ? styles.secondPlace
                      : item.rank === 3 ? styles.thirdPlace : {}
                  }>
                  <Button
                    type="primary"
                    autoInsertSpace={false}
                    onClick={() => router.push(`/rankingHistory?subEventType=${type === 'single' ? 1 : 2}${type === 'single' ? `&id=${(item as Player).id}` : `&id1=${(item as DoublePlayer).player_id_1}&id2=${(item as DoublePlayer).player_id_2}`}`)}
                  >
                    {item.rank}
                  </Button>
                </td>
                <td
                  className="whitespace-nowrap px-2 py-4 sticky top-0 left-70px z-10 bg-neutral-700 border-b border-neutral-500"
                  style={
                  item.rank === 1 ? styles.firstPlace
                    : item.rank === 2 ? styles.secondPlace
                      : item.rank === 3 ? styles.thirdPlace : {}
                  }
                >
                  {type === 'single'
                    ? (<Button
                        type="primary"
                        autoInsertSpace={false}
                        className="w-auto"
                        onClick={() => router.push(`/player?id=${item.id}`)}
                    >
                      {item.rank === 1 ? '🏆 '
                        : item.rank === 2 ? '🥈 '
                          : item.rank === 3 ? '🥉 '
                            : item.rank === 4 ? '🏅 '
                              : item.rank === 5 ? '🎖 ' : ''
                      }
                      {(item as Player).name}
                    </Button>)
                    : (
                      <div>
                        <div className={classNames('text-sm font-bold mb-1', item.rank === 1 || item.rank === 2 || item.rank === 3 ? 'text-gray-900' : 'text-gray-50')}>
                          {(item as DoublePlayer).teamName}
                        </div>
                        <div className={classNames('text-xs', item.rank === 1 || item.rank === 2 || item.rank === 3 ? 'text-gray-800' : 'text-gray-50')}>
                          <div>{(item as DoublePlayer).player_name_1}</div>
                          <div>{(item as DoublePlayer).player_name_2}</div>
                        </div>
                      </div>
                    )
                    }
                </td>
                <td className="whitespace-nowrap px-6 py-4">{item.score}</td>
                <td className="whitespace-nowrap px-6 py-4">{item.resultCountByYearly} 場</td>
                <td className="whitespace-nowrap px-6 py-4">{item.resultCount} 場</td>
                <td className="whitespace-nowrap px-6 py-4">{winningRate(item)}</td>
                <td className="whitespace-nowrap px-6 py-4">
                  {(item as Player).isOnLeave ? '休賽中' : item.latestResultDateTime ? dayjs(item.latestResultDateTime).tz('Asia/Taipei').format('YYYY-MM-DD HH:mm') : '-'}
                  {!(item as Player).isOnLeave && isMoreThanOneMonthOld(item.latestResultDateTime)
                    ? <Tooltip className="ml-1" placement="bottom" title={daysFromTodayTips(item.latestResultDateTime)}>
                      <ExclamationCircleOutlined style={{ color: 'gray' }} />
                    </Tooltip>
                    : ''}
                </td>
                <td className="whitespace-nowrap px-6 py-4">{item.updateDateTime ? dayjs(item.updateDateTime).tz('Asia/Taipei').format('YYYY-MM-DD HH:mm') : '-'}</td>
              </tr>
            ))}

          </tbody>
        </table>
      </div>
    </div>
  );

  const items: TabsProps['items'] = [
    {
      key: 'single',
      label: '單打',
      children: <RankingTable type="single" />,
    },
    {
      key: 'double',
      label: '雙打',
      children: <RankingTable type="double" />,
    },
  ];

  return (
    <div className="overflow-auto bg-gray-900">
      <Tabs
        activeKey={activeKey}
        onChange={setActiveKey}
        items={items}
        className="p-4"
      />
    </div>
  );
}
