'use client';

import {
  ExclamationCircleOutlined, QuestionCircleOutlined,
} from '@ant-design/icons';
import { Tooltip } from 'antd';
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import React, {
  useEffect, useState,
} from 'react';
import { getPlayer } from '@/api/player';
import { Player } from '@/types/player';

dayjs.extend(utc);
dayjs.extend(timezone);

const styles = {
  firstPlace: { backgroundColor: '#c9b037' },
  secondPlace: { backgroundColor: '#a8a8a8' },
  thirdPlace: { backgroundColor: '#ad6f69' },
};

export default function Ranking() {
  const [apiData, setApiData] = useState<Player[]>([]);

  useEffect(() => {
    getPlayer().then(({ data }) => {
      const twoMonthsAgo = dayjs().subtract(2, 'month');

      const filteredData = data
        .filter(player => {
          if (player.latestResultDateTime === null) {
            return false;
          }

          const playerUpdateDate = dayjs(player.latestResultDateTime);

          return playerUpdateDate.isAfter(twoMonthsAgo);
        })
        .sort((a, b) => b.score - a.score);

      setApiData(filteredData);
    });
  }, []);

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

  return (
    <div className="overflow-auto bg-gray-900 flex flex-col">
      <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
          <div className="overflow-auto">
            <table className="min-w-full text-left text-sm font-light">
              <thead
                className="border-b font-medium border-neutral-500 bg-neutral-600">
                <tr>
                  <th scope="col" className="px-6 py-4">#</th>
                  <th scope="col" className="px-6 py-4">選手</th>
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

                {apiData.map((item, index) => (
                  <tr
                    key={index}
                    style={
                    index === 0 ? styles.firstPlace
                      : index === 1 ? styles.secondPlace
                        : index === 2 ? styles.thirdPlace : {}
                    }
                    className="border-b border-neutral-500 bg-neutral-700">
                    <td className="whitespace-nowrap px-6 py-4 font-medium">{index + 1}</td>
                    <td className="whitespace-nowrap px-6 py-4">
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
    </div>
  );
}
