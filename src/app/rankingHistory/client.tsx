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
      defaultSortOrder: 'ascend',
      sorter: (a, b) => a.index - b.index,
    },
    {
      title: '比賽日期',
      dataIndex: 'date',
      key: 'date',

    },
    {
      title: '比賽時間',
      dataIndex: 'time',
      key: 'time',
    },
    {
      title: '選手 A',
      dataIndex: 'player_nameA1',
      key: 'player_nameA1',
    },
    {
      title: '比分',
      dataIndex: 'score',
      key: 'score',
      width: 120,
    },
    {
      title: '選手 B',
      dataIndex: 'player_nameB1',
      key: 'player_nameB1',
    },
    {
      title: '每局分數',
      dataIndex: 'resultItemList',
      key: 'resultItemList',
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
    <div className=" bg-gray-900 flex flex-col p-5">
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
          />
        </div>
      </div>
    </div>
  );
}
