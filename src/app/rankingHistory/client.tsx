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
import SingleDoubleSelect from '@/component/global/singleDoubleSelect';
import { SubEventTypeEnum } from '@/enum/Event';
import { useEventStore } from '@/store/event';
import { ResultRanking } from '@/types/result';

dayjs.extend(utc);
dayjs.extend(timezone);

interface DataType {
  key: number;
  index: number;
  date: string;
  time: string;
  player_name_a_1: string;
  player_name_a_2?: string;
  score: string;
  player_name_b_1: string;
  player_name_b_2?: string;
  doublePlayer_name_a?: string | null;
  doublePlayer_name_b?: string | null;
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

const MatchDisplay = ({
  playerNameA1, playerNameA2, playerNameB1, playerNameB2,
  score, subEventType, doublePlayerNameA, doublePlayerNameB,
}: {
  playerNameA1: string;
  playerNameA2?: string;
  playerNameB1: string;
  playerNameB2?: string;
  score: string;
  subEventType: SubEventTypeEnum;
  doublePlayerNameA?: string | null;
  doublePlayerNameB?: string | null;
}) => {
  const [scoreA, scoreB] = score.split(':').map(s => s.trim());
  const isAWinner = Number(scoreA) > Number(scoreB);

  return (
    <div className="inline-flex items-center">
      <div className="w-24 text-right">
        <span className={`${isAWinner ? 'text-secondary font-bold' : 'text-gray-400'}`}>
          {doublePlayerNameA && (<span className="text-xs block text-secondary-light mb-1">{doublePlayerNameA}</span>)}
          {playerNameA1}
          {subEventType === SubEventTypeEnum.Double && playerNameA2 && (
            <span className="block">{playerNameA2}</span>
          )}
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

      <div className="w-24 text-left">
        <span className={`${!isAWinner ? 'text-secondary font-bold' : 'text-gray-400'}`}>
          {doublePlayerNameB && (<span className="text-xs block text-secondary-light mb-1">{doublePlayerNameB}</span>)}
          {playerNameB1}
          {subEventType === SubEventTypeEnum.Double && playerNameB2 && (
            <span className="block">{playerNameB2}</span>
          )}
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
  const [playerA1, setPlayerA1] = useState<number | undefined>(undefined);
  const [playerA2, setPlayerA2] = useState<number | undefined>(undefined);
  const [playerB1, setPlayerB1] = useState<number | undefined>(undefined);
  const [playerB2, setPlayerB2] = useState<number | undefined>(undefined);
  const [eventId, setEventId] = useState<number | undefined>(undefined);
  const [subEventType, setEventType] = useState<SubEventTypeEnum>(SubEventTypeEnum.Single);
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
          playerNameA1={record.player_name_a_1}
          playerNameA2={record.player_name_a_2}
          playerNameB1={record.player_name_b_1}
          playerNameB2={record.player_name_b_2}
          doublePlayerNameA={record.doublePlayer_name_a}
          doublePlayerNameB={record.doublePlayer_name_b}
          score={record.score}
          subEventType={subEventType}
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
        player_name_a_1: item.player_name_a_1,
        player_name_a_2: item.player_name_a_2,
        score: `${item.scoreA} : ${item.scoreB}`,
        player_name_b_1: item.player_name_b_1,
        player_name_b_2: item.player_name_b_2,
        doublePlayer_name_a: item.doublePlayer_name_a,
        doublePlayer_name_b: item.doublePlayer_name_b,
        resultItemList: item.resultItemList.map(resultItem => `${resultItem.scoreA}:${resultItem.scoreB} `),
        scores: item.resultItemList.map(resultItem => `${resultItem.scoreA}:${resultItem.scoreB} `).join(' '),
      })),
    );
  }

  // TODO: 改成 next 的寫法

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const searchId = queryParams.get('id');
    const searchId1 = queryParams.get('id1');
    const searchId2 = queryParams.get('id2');
    const querySubEventType = queryParams.get('subEventType');

    if (searchId) {
      if (Number(searchId)) {
        setPlayerA1(Number(searchId));
      }

      // TODO: 這邊的顯示沒有跟著改動
      setStartDate('2024-01-01');
    }

    if (searchId1 && searchId2) {
      setEventType(SubEventTypeEnum.Double);
      setPlayerA1(Number(searchId1));
      setPlayerA2(Number(searchId2));
    }

    if (querySubEventType) {
      setEventType(Number(querySubEventType));
    }
  }, []);

  const search = useCallback(() => {
    setIsLoading(true);
    getResultRanking({
      startDate,
      endDate,
      playerA1,
      playerA2: subEventType === SubEventTypeEnum.Double ? playerA2 : undefined,
      playerB1,
      playerB2: subEventType === SubEventTypeEnum.Double ? playerB2 : undefined,
      subEventType,
    }).then(({ data }) => {
      solveData(data);
      setIsLoading(false);
    });
  }, [startDate, endDate, playerA1, playerA2, playerB1, playerB2, subEventType]);

  // TODO: refactor
  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const searchId = queryParams.get('id');
    const searchId1 = queryParams.get('id1');
    const searchId2 = queryParams.get('id2');

    if (searchId) {
      setIsLoading(true);
      getResultRanking({ startDate: '2024-01-01', endDate, playerA1: Number(searchId), playerB1, subEventType }).then(({ data }) => {
        solveData(data);
        setIsLoading(false);
      });
    } else if (searchId1 && searchId2) {
      setIsLoading(true);
      getResultRanking({ startDate: '2024-01-01', endDate, playerA1: Number(searchId1), playerA2: Number(searchId2), playerB1, subEventType: SubEventTypeEnum.Double }).then(({ data }) => {
        solveData(data);
        setIsLoading(false);
      });
    } else {
      search();
    }
  }, []);

  useEffect(() => {
    switch (subEventType) {
      case SubEventTypeEnum.Single:
        if (!playerA1) {
          setPlayerB1(undefined);
        }

        break;
      case SubEventTypeEnum.Double:
        if (!playerA1 && !playerA2) {
          setPlayerB1(undefined);
          setPlayerB2(undefined);
        }

        break;
      default:
        break;
    }
  }, [playerA1, playerA2, subEventType]);

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

  function clearDoublePlayer() {
    setPlayerA2(undefined);
    setPlayerB2(undefined);
  }

  return (
    <div className="bg-gray-900 flex flex-col p-2 md:p-5">
      <div className="flex flex-col md:flex-row mb-2 gap-4 md:gap-y-0 justify-between">
        <EventSelect
          className="flex-1"
          id={eventId}
          setId={setEventId}
        />
        <SingleDoubleSelect
          className='flex-1'
          type={subEventType}
          setType={setEventType}
          onChange={newType => {
            if (newType === SubEventTypeEnum.Single) {
              clearDoublePlayer();
            }
          }}
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
      <div className="flex flex-col md:flex-row mb-6 gap-4 md:gap-y-0 justify-between">
        <div className={`
          flex-1 flex gap-4
          ${subEventType === SubEventTypeEnum.Double ? 'bg-gray-800/30 p-2 rounded-lg border border-gray-700/30' : ''}
        `}>
          <PlayerSelect
            className="flex-1"
            id={playerA1}
            setId={setPlayerA1}
            placeholder={`選手 A${subEventType === SubEventTypeEnum.Double ? '1' : ''}`}
            excludeIdList={
              [playerA2, playerB1, playerB2].filter((id): id is number => id !== undefined)
            }
          />
          {subEventType === SubEventTypeEnum.Double && (
            <PlayerSelect
              className="flex-1"
              id={playerA2}
              setId={setPlayerA2}
              placeholder='選手 A2'
              excludeIdList={
                [playerA1, playerB1, playerB2].filter((id): id is number => id !== undefined)
              }
            />
          )}
        </div>

        <div className={`
          flex-1 flex gap-4
          ${subEventType === SubEventTypeEnum.Double ? 'bg-gray-800/30 p-2 rounded-lg border border-gray-700/30' : ''}
        `}>
          <PlayerSelect
            className="flex-1"
            id={playerB1}
            setId={setPlayerB1}
            disable={
              subEventType === SubEventTypeEnum.Double ? (!playerA1 && !playerA2) : !playerA1
            }
            placeholder={`選手 B${subEventType === SubEventTypeEnum.Double ? '1' : ''}`}
            excludeIdList={
              [playerA1, playerA2, playerB2].filter((id): id is number => id !== undefined)
            }
          />
          {subEventType === SubEventTypeEnum.Double && (
            <PlayerSelect
              className="flex-1"
              id={playerB2}
              setId={setPlayerB2}
              disable={
                subEventType === SubEventTypeEnum.Double ? (!playerA1 && !playerA2) : !playerA1
              }
              placeholder='選手 B2'
              excludeIdList={
                [playerA1, playerA2, playerB1].filter((id): id is number => id !== undefined)
              }
            />
          )}
        </div>

        <Button
          loading={isLoading}
          type="primary"
          size="large"
          icon={<SearchOutlined />}
          onClick={search}
          className={`bg-primary flex-1 md:max-w-[120px]
          ${subEventType === SubEventTypeEnum.Double && 'md:mt-[9px]'}`
          }
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
