'use client';

import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import React, {
  useCallback, useEffect, useState,
} from 'react';
import { getResultRanking } from '@/api/result';
import DatePicker from '@/component/global/datePicker';
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
      <div className="flex my-6 gap-x-4">
        <DatePicker className="flex-auto" text="開始日期" date={startDate} setDate={setStartDate}/>
        <DatePicker className="flex-auto" text="結束日期" date={endDate} setDate={setEndDate}/>
        <button
          type="button"
          className="inline-block rounded-full bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white  transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(228,161,27,0.3),0_4px_18px_0_rgba(228,161,27,0.2)] active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(228,161,27,0.3),0_4px_18px_0_rgba(228,161,27,0.2)] dark:hover:shadow-[0_8px_9px_-4px_rgba(228,161,27,0.2),0_4px_18px_0_rgba(228,161,27,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(228,161,27,0.2),0_4px_18px_0_rgba(228,161,27,0.1)]"
          onClick={search}
      >
          搜尋
        </button>
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
