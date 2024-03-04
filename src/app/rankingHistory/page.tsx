'use client';

import React, {
  useEffect, useState,
} from 'react';
import { getResultRanking } from '@/api/result';
import { ResultRanking } from '@/types/result';

export default function RankingHistory() {
  const [apiData, setApiData] = useState<ResultRanking[]>([]);

  useEffect(() => {
    getResultRanking().then(({ data }) => {
      setApiData(data);
    });
  }, []);

  return (
    <div className="overflow-hidden bg-gray-900 flex flex-col">
      <div className="overflow-x-hidden sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
          <div className="overflow-hidden">
            <table className="min-w-full text-left text-sm font-light">
              <thead
                className="border-b bg-white font-medium dark:border-neutral-500 dark:bg-neutral-600">
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
                    className="border-b bg-neutral-100 dark:border-neutral-500 dark:bg-neutral-700">
                    <td className="whitespace-nowrap px-6 py-4 font-medium">{index + 1}</td>
                    <td className="whitespace-nowrap px-6 py-4">{item.resultDate ? item.resultDate.split('T')[0] : ''}</td>
                    <td className="whitespace-nowrap px-6 py-4">{item.resultDate ? item.resultDate.split('T')[1].replace('Z', '') : ''}</td>
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
