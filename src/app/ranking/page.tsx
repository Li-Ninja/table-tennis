'use client';

import {
  ExclamationCircleOutlined, QuestionCircleOutlined,
} from '@ant-design/icons';
import {
  Button, Tooltip,
} from 'antd';
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import React, {
  useEffect, useState,
} from 'react';
import { usePlayerStore } from '@/store/player';
import { Player } from '@/types/player';

dayjs.extend(utc);
dayjs.extend(timezone);

const styles = {
  firstPlace: { backgroundColor: '#c9b037' },
  secondPlace: { backgroundColor: '#a8a8a8' },
  thirdPlace: { backgroundColor: '#ad6f69' },
};

export default function Ranking() {
  const [list, setList] = useState<Player[]>([]);
  const { playerList } = usePlayerStore(state => state);

  useEffect(() => {
    const twoMonthsAgo = dayjs().subtract(2, 'month');

    const filteredData = playerList
      .filter(player => {
        if (player.latestResultDateTime === null) {
          return false;
        }

        const playerUpdateDate = dayjs(player.latestResultDateTime);

        return playerUpdateDate.isAfter(twoMonthsAgo);
      })
      .sort((a, b) => b.score - a.score);

    setList(filteredData);
  }, [playerList]);

  function winningRate(item: Player) {
    if (item.resultCount === 0) {
      return '-';
    }

    return `${Math.round((item.winningCount / item.resultCount) * 100)}%`;
  }

  const updateDateTimeTips = <span>超過 2 個月沒有新的比賽記錄時，會先暫時隱藏該選手的排名</span>;

  function isMoreThanOneMonthOld(date: string | undefined) {
    if (!date) {
      return false;
    }

    const oneMonthAgo = dayjs().subtract(1, 'month');
    const inputDate = dayjs(date);

    return inputDate.isBefore(oneMonthAgo);
  }

  function daysFromTodayTips(date: string | undefined) {
    if (!date) {
      return false;
    }

    const today = dayjs();
    const inputDate = dayjs(date);

    const daysDifference = today.diff(inputDate, 'day');

    return <span>有 {daysDifference} 天沒有新的比賽記錄</span>;
  }

  const rankTips = <span>點擊排名可以查看選手的比賽記錄</span>;

  // #region router
  const handleRouteChange = (id: number) => {
    window.location.href = `${window.location.origin}/rankingHistory?id=${id}`;
  };
  // #endregion

  return (
    <div className="overflow-auto bg-gray-900 flex flex-col">
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
                <th scope="col" className="px-2 py-4 sticky top-0 left-70px z-10 bg-neutral-600">選手</th>
                <th scope="col" className="px-6 py-4">積分</th>
                <th scope="col" className="px-6 py-4">累計場次</th>
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

              {list.map((item, index) => (
                <tr
                  key={index}
                  style={
                    index === 0 ? styles.firstPlace
                      : index === 1 ? styles.secondPlace
                        : index === 2 ? styles.thirdPlace : {}
                    }
                  className="border-b border-neutral-500 bg-neutral-700">
                  <td
                    className="whitespace-nowrap px-3 py-4 font-medium sticky top-0 left-0 z-20 bg-neutral-700 border-b border-neutral-500"
                    style={
                    index === 0 ? styles.firstPlace
                      : index === 1 ? styles.secondPlace
                        : index === 2 ? styles.thirdPlace : {}
                    }>
                    <Button type="primary" onClick={() => handleRouteChange(item.id)}>
                      {index + 1}
                    </Button>

                  </td>
                  <td
                    className="whitespace-nowrap px-2 py-4 sticky top-0 left-70px z-10 bg-neutral-700 border-b border-neutral-500"
                    style={
                    index === 0 ? styles.firstPlace
                      : index === 1 ? styles.secondPlace
                        : index === 2 ? styles.thirdPlace : {}
                    }
                  >
                    {index === 0 ? '🏆 '
                      : index === 1 ? '🥈 '
                        : index === 2 ? '🥉 '
                          : index === 3 ? '🏅 '
                            : index === 4 ? '🎖 ' : ''
                      }
                    {item.name}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">{item.score}</td>
                  <td className="whitespace-nowrap px-6 py-4">{item.resultCount} 場</td>
                  <td className="whitespace-nowrap px-6 py-4">{winningRate(item)}</td>
                  <td className="whitespace-nowrap px-6 py-4">
                    {item.latestResultDateTime ? dayjs(item.latestResultDateTime).tz('Asia/Taipei').format('YYYY-MM-DD HH:mm') : ''}
                    {isMoreThanOneMonthOld(item.latestResultDateTime)
                      ? <Tooltip className="ml-1" placement="bottom" title={daysFromTodayTips(item.latestResultDateTime)}>
                        <ExclamationCircleOutlined style={{ color: 'gray' }} />
                      </Tooltip>
                      : ''}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">{item.updateDateTime ? dayjs(item.updateDateTime).tz('Asia/Taipei').format('YYYY-MM-DD HH:mm') : ''}</td>
                </tr>
              ))}

            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
