'use client';

import { SearchOutlined } from '@ant-design/icons';
import {
  Button, DatePicker,
} from 'antd';
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import React, {
  useCallback, useEffect, useState,
} from 'react';
import { getResultRanking } from '@/api/result';
import { ResultRanking } from '@/types/result';

dayjs.extend(utc);
dayjs.extend(timezone);

export default function RankingHistory() {
  const [apiData, setApiData] = useState<ResultRanking[]>([]);
  const [startDate, setStartDate] = useState(dayjs().format('YYYY-MM-DD'));
  const [endDate, setEndDate] = useState(dayjs().format('YYYY-MM-DD'));

  const search = useCallback(() => {
    getResultRanking({ startDate, endDate }).then(({ data }) => {
      setApiData(data);
    });
  }, [startDate, endDate]);

  useEffect(() => {
    search();
  }, []);

  return (
    <div className="overflow-auto bg-gray-900 flex flex-col p-5">
      <div className="flex flex-col md:flex-row mb-6 gap-y-4 md:gap-0 justify-between">
        <DatePicker
          format="YYYY-MM-DD"
          defaultValue={dayjs(startDate)}
          size="large"
          allowClear={false}
          onChange={(_, d) => {
            if (typeof d === 'string') {
              setStartDate(d);
            }
          }}
        />
        <DatePicker
          format="YYYY-MM-DD"
          defaultValue={dayjs(endDate)}
          size="large"
          allowClear={false}
          onChange={(_, d) => {
            if (typeof d === 'string') {
              setEndDate(d);
            }
          }}
        />
        <Button
          type="primary"
          size="large"
          icon={<SearchOutlined />}
          onClick={search}
          // TODO: type 用 primary 效果沒有出來，可能是被 tailwind 影響，所以這裡還會要額外加上 bg-primary
          className="bg-primary"
        >
          搜尋
        </Button>
      </div>
      <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
          <div className="overflow-auto">
            <table className="min-w-full text-left text-sm font-light">
              <thead
                className="border-b font-medium border-neutral-500 bg-neutral-600">
                <tr>
                  <th scope="col" className="px-6 py-4">#</th>
                  <th scope="col" className="px-6 py-4">比賽日期</th>
                  <th scope="col" className="px-6 py-4">比賽時間</th>
                  <th scope="col" className="px-6 py-4">選手A</th>
                  <th scope="col" className="px-6 py-4">比分</th>
                  <th scope="col" className="px-6 py-4">選手B</th>
                  <th scope="col" className="px-6 py-4">每局分數</th>
                </tr>
              </thead>
              <tbody>

                {apiData.map((item, index) => (
                  <tr
                    key={index}
                    className="border-b border-neutral-500 bg-neutral-700">
                    <td className="whitespace-nowrap px-6 py-4 font-medium">{index + 1}</td>
                    <td className="whitespace-nowrap px-6 py-4">{item.resultDateTime ? dayjs(item.resultDateTime).tz('Asia/Taipei').format('YYYY-MM-DD') : ''}</td>
                    <td className="whitespace-nowrap px-6 py-4">{item.resultDateTime ? dayjs(item.resultDateTime).tz('Asia/Taipei').format('HH:mm') : ''}</td>
                    <td className="whitespace-nowrap px-6 py-4">{item.player_nameA1}</td>
                    <td className="whitespace-nowrap px-6 py-4">{item.scoreA} : {item.scoreB}</td>
                    <td className="whitespace-nowrap px-6 py-4">{item.player_nameB1}</td>
                    <td className="whitespace-nowrap px-6 py-4">{item.resultItemList.map(resultItem => `${resultItem.scoreA}:${resultItem.scoreB} `)}</td>
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
