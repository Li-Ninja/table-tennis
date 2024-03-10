'use client';

import React, {
  useEffect, useState,
} from 'react';

import { getPlayer } from '@/api/player';
import { Player } from '@/types/player';

export default function Ranking() {
  const [apiData, setApiData] = useState<Player[]>([]);

  useEffect(() => {
    getPlayer().then(({ data }) => {
      setApiData(data.sort((a, b) => b.score - a.score));
    });
  }, []);

  function winningRate(item: Player) {
    if (item.resultCount === 0) {
      return '-';
    }

    return `${Math.round((item.winningCount / item.resultCount) * 100)}%`;
  }

  return (
    <div className="overflow-auto bg-gray-900 flex flex-col">
      <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
          <div className="overflow-auto">
            <table className="min-w-full text-left text-sm font-light">
              <thead
                className="border-b bg-white font-medium dark:border-neutral-500 dark:bg-neutral-600">
                <tr>
                  <th scope="col" className="px-6 py-4">#</th>
                  <th scope="col" className="px-6 py-4">選手</th>
                  <th scope="col" className="px-6 py-4">積分</th>
                  <th scope="col" className="px-6 py-4">累計場次</th>
                  <th scope="col" className="px-6 py-4">勝率</th>
                </tr>
              </thead>
              <tbody>

                {apiData.map((item, index) => (
                  <tr
                    key={index}
                    className="border-b bg-neutral-100 dark:border-neutral-500 dark:bg-neutral-700">
                    <td className="whitespace-nowrap px-6 py-4 font-medium">{index + 1}</td>
                    <td className="whitespace-nowrap px-6 py-4">{item.name}</td>
                    <td className="whitespace-nowrap px-6 py-4">{item.score}</td>
                    <td className="whitespace-nowrap px-6 py-4">{item.resultCount} 場</td>
                    <td className="whitespace-nowrap px-6 py-4">{winningRate(item)}</td>
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
