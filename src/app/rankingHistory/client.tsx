'use client';

import { SearchOutlined } from '@ant-design/icons';

import {
  Button, DatePicker, Table,
} from 'antd';
import type { TableColumnsType } from 'antd';
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import React, {
  useCallback, useEffect, useState,
} from 'react';
import { getResultRanking } from '@/api/result';
import EventSelect from '@/component/global/eventSelect';
import PlayerSelect from '@/component/global/playerSelect';
import { useEventStore } from '@/store/event';
import { ResultRanking } from '@/types/result';

dayjs.extend(utc);
dayjs.extend(timezone);

interface DataType {
  key: number;
  index: number;
  date: string;
  time: string;
  player_nameA1: string;
  score: string;
  player_nameB1: string;
  resultItemList: string[];
}

const ScoreDisplay = ({ scores }: { scores: string }) => {
  const scoreArray = scores.split(' ').filter(s => s.trim());
  const totalGames = scoreArray.length;
  const gamesPerRow = 3; // 每行顯示的局數
  const rows = Math.ceil(totalGames / gamesPerRow);

  return (
    <div className="flex flex-col gap-2 mt-1 md:mt-0">
      {[...Array(rows)].map((_, rowIndex) => (
        <div
          key={rowIndex}
          className={`
            flex
            ${rowIndex > 0 ? 'border-gray-700/30' : ''}
          `}
        >
          {scoreArray.slice(rowIndex * gamesPerRow, (rowIndex + 1) * gamesPerRow)
            .map((score, index) => {
              const [scoreA, scoreB] = score.split(':');
              const isWinningScore = Number(scoreA) > Number(scoreB);
              const isCloseGame = Math.abs(Number(scoreA) - Number(scoreB)) <= 2;

              return (
                <div
                  key={index}
                  className={`
                    flex items-center justify-center
                    min-w-[70px] py-1 px-2 mr-2
                    rounded-md
                    ${isCloseGame ? 'bg-gray-700/50' : 'bg-gray-800/50'}
                    border border-gray-700
                    transition-all duration-200
                    hover:scale-105
                    relative
                  `}
                >
                  <div className="absolute -top-2 left-2 text-xs text-gray-500">
                    {rowIndex * gamesPerRow + index + 1}
                  </div>
                  <span className={`${isWinningScore ? 'text-secondary font-bold' : 'text-gray-300'}`}>
                    {scoreA}
                  </span>
                  <span className="mx-1 text-gray-500">:</span>
                  <span className={`${!isWinningScore ? 'text-secondary font-bold' : 'text-gray-300'}`}>
                    {scoreB}
                  </span>
                </div>
              );
            })}
        </div>
      ))}
    </div>
  );
};

const MatchDisplay = ({ playerA, playerB, score }: {
  playerA: string;
  playerB: string;
  score: string;
}) => {
  const [scoreA, scoreB] = score.split(':').map(s => s.trim());
  const isAWinner = Number(scoreA) > Number(scoreB);

  return (
    <div className="inline-flex items-center">
      <div className="w-16 text-right">
        <span className={`${isAWinner ? 'text-secondary font-bold' : 'text-gray-400'}`}>
          {playerA}
        </span>
      </div>

      <div className="flex items-center mx-2 px-2 py-1 bg-gray-800/50 rounded-lg border border-gray-700/50">
        <span className={`${isAWinner ? 'text-secondary font-bold' : 'text-gray-300'} w-[12px] text-center`}>
          {scoreA}
        </span>
        <span className="mx-1 text-gray-500">-</span>
        <span className={`${!isAWinner ? 'text-secondary font-bold' : 'text-gray-300'} w-[12px] text-center`}>
          {scoreB}
        </span>
      </div>

      <div className="w-16 text-left">
        <span className={`${!isAWinner ? 'text-secondary font-bold' : 'text-gray-400'}`}>
          {playerB}
        </span>
      </div>
    </div>
  );
};

// 新增日期時間顯示組件
const DateTimeDisplay = ({ date, time }: { date: string; time: string }) => (
  <div className="flex flex-col items-center">
    <span className="text-gray-300">{date}</span>
    <span className="text-sm text-gray-500">{time}</span>
  </div>
);

export default function RankingHistory() {
  const [dataSource, setDataSource] = useState<DataType[]>([]);
  const { eventList } = useEventStore(state => state);
  const [playerA, setPlayerA] = useState<number | undefined>(undefined);
  const [playerB, setPlayerB] = useState<number | undefined>(undefined);
  const [eventId, setEventId] = useState<number | undefined>(undefined);
  const [startDate, setStartDate] = useState(dayjs().subtract(6, 'day').format('YYYY-MM-DD'));
  const [endDate, setEndDate] = useState(dayjs().format('YYYY-MM-DD'));
  const [isLoading, setIsLoading] = useState(false);
  const columns: TableColumnsType<DataType> = [
    {
      title: '#',
      dataIndex: 'index',
      key: 'index',
      align: 'center',
      width: 20,
      defaultSortOrder: 'ascend',
      sorter: (a, b) => a.index - b.index,
    },
    {
      title: '比賽時間',
      key: 'datetime',
      align: 'center',
      width: 130,
      render: (_, record: DataType) => (
        <DateTimeDisplay
          date={record.date}
          time={record.time}
        />
      ),
    },
    {
      title: '對戰',
      key: 'match',
      align: 'center',
      render: (_, record: DataType) => (
        <MatchDisplay
          playerA={record.player_nameA1}
          playerB={record.player_nameB1}
          score={record.score}
        />
      ),
    },
    {
      title: '每局分數',
      dataIndex: 'scores',
      key: 'scores',
      align: 'center',
      render: (scores: string) => <ScoreDisplay scores={scores} />,
    },
  ];

  function solveData(data: ResultRanking[]) {
    setDataSource(
      data.reverse().map((item, index) => ({
        key: index,
        index: index + 1,
        date: item.resultDateTime ? dayjs(item.resultDateTime).tz('Asia/Taipei').format('YYYY-MM-DD') : '',
        time: item.resultDateTime ? dayjs(item.resultDateTime).tz('Asia/Taipei').format('HH:mm') : '',
        player_nameA1: item.player_nameA1,
        score: `${item.scoreA} : ${item.scoreB}`,
        player_nameB1: item.player_nameB1,
        resultItemList: item.resultItemList.map(resultItem => `${resultItem.scoreA}:${resultItem.scoreB} `),
        scores: item.resultItemList.map(resultItem => `${resultItem.scoreA}:${resultItem.scoreB} `).join(' '),
      })),
    );
  }

  // TODO: 改成 next 的寫法

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const searchId = queryParams.get('id');

    if (searchId) {
      if (Number(searchId)) {
        setPlayerA(Number(searchId));
      }

      // TODO: 這邊的顯示沒有跟著改動
      setStartDate('2024-01-01');
    }
  }, []);

  const search = useCallback(() => {
    setIsLoading(true);
    getResultRanking({ startDate, endDate, playerA, playerB }).then(({ data }) => {
      solveData(data);
      setIsLoading(false);
    });
  }, [startDate, endDate, playerA, playerB]);

  // TODO: refactor
  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const searchId = queryParams.get('id');

    if (searchId) {
      setIsLoading(true);
      getResultRanking({ startDate: '2024-01-01', endDate, playerA: Number(searchId), playerB }).then(({ data }) => {
        solveData(data);
        setIsLoading(false);
      });
    } else {
      search();
    }
  }, []);

  useEffect(() => {
    if (!playerA) {
      setPlayerB(undefined);
    }
  }, [playerA]);

  // #region 處理切換 event 或是 date 時候要處理的事情
  useEffect(() => {
    if (!eventId) {
      return;
    }

    const eventDate = eventList.find(item => item.id === eventId)?.date;

    if (!eventDate) {
      return;
    }

    setStartDate(dayjs(eventDate).format('YYYY-MM-DD'));
    setEndDate(dayjs(eventDate).endOf('month').format('YYYY-MM-DD'));
  }, [eventId]);

  useEffect(() => {
    const eventDate = eventList.find(item => item.id === eventId)?.date;
    const eventStartDate = dayjs(eventDate).format('YYYY-MM-DD');
    const eventEndDate = dayjs(eventDate).endOf('month').format('YYYY-MM-DD');

    // 如果 event 的日期跟現在的日期一樣，就不用重新搜尋
    if (eventStartDate === startDate && eventEndDate === endDate) {
      return;
    }

    setEventId(undefined);
  }, [startDate, endDate]);
  // #endregion

  return (
    <div className="bg-gray-900 flex flex-col p-2 md:p-5">
      <div className="flex flex-col md:flex-row mb-2 gap-4 md:gap-y-0 justify-between">
        <EventSelect
          className="flex-1"
          id={eventId}
          setId={setEventId}
        />
        <DatePicker
          className="flex-1"
          format="YYYY-MM-DD"
          value={dayjs(startDate)}
          size="large"
          allowClear={false}
          onChange={(_, d) => {
            if (typeof d === 'string') {
              setStartDate(d);
            }
          }}
        />
        <DatePicker
          className="flex-1"
          format="YYYY-MM-DD"
          value={dayjs(endDate)}
          size="large"
          allowClear={false}
          onChange={(_, d) => {
            if (typeof d === 'string') {
              setEndDate(d);
            }
          }}
        />
      </div>
      <div className="flex flex-col md:flex-row mb-6  gap-4 md:gap-y-0 justify-between">
        <PlayerSelect
          className="flex-1"
          id={playerA}
          setId={setPlayerA}
          placeholder='選手 A'
        />
        <PlayerSelect
          className="flex-1"
          id={playerB}
          setId={setPlayerB}
          disable={!playerA}
          placeholder='選手 B'
        />
        <Button
          loading={isLoading}
          type="primary"
          size="large"
          icon={<SearchOutlined />}
          onClick={search}
          // TODO: type 用 primary 效果沒有出來，可能是被 tailwind 影響，所以這裡還會要額外加上 bg-primary
          className="bg-primary flex-1"
        >
          搜尋
        </Button>
      </div>
      <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
          <Table
            dataSource={dataSource}
            columns={columns}
            scroll={{ x: 'max-content' }}
            pagination={{ pageSize: 20, position: ['bottomLeft', 'bottomLeft'] }}
            className="custom-table"
          />
        </div>
      </div>
      <style jsx global>{`
        /* 基礎表格樣式 */
        .custom-table .ant-table-thead > tr > th,
        .custom-table .ant-table-tbody > tr > td {
          padding: 4px;
        }

        /* 排序圖標 - 手機版隱藏 */
        .custom-table .ant-table-column-sorter {
          display: none;
        }

        /* 平板以上樣式 */
        @media (min-width: 640px) {
          .custom-table .ant-table-thead > tr > th,
          .custom-table .ant-table-tbody > tr > td {
            padding: 8px;
          }

          .custom-table .ant-table-column-sorter {
            display: block;
          }
        }

        /* 桌面版樣式 */
        @media (min-width: 1024px) {
          .custom-table .ant-table-thead > tr > th,
          .custom-table .ant-table-tbody > tr > td {
            padding: 16px;
          }
        }
      `}</style>
    </div>
  );
}
