'use client';

import { Tabs } from 'antd';
import type { TabsProps } from 'antd';
import React, {
  useEffect, useState,
} from 'react';
import {
  getResult, getResultItem,
} from '@/api/result';
import Bracket from '@/component/result/bracket';
import {
  ICustomRoundProps, Result, ResultItem,
} from '@/types/result';

function getRounds(list: Result[], apiData2: ResultItem[]) {
  // solve single
  const roundNumber = list?.[0]?.round;
  const rounds:ICustomRoundProps[] = [];

  for (let i = roundNumber; i >= 2; i /= 2) {
    rounds.push(
      { title: i === 2 ? '決賽' : (i === 4 ? '半決賽' : `${i} 強賽`),
        round: i,
        seeds: [],
        scoreList: [] },
    );
  }

  for (let i = 0; i < rounds.length; i += 1) {
    const newList = list.filter(item => item.round === rounds[i].round);

    rounds[i].seeds = newList.map(item => ({
      id: item.id,
      teams: [
        {
          name: (() => {
            if (item.player_name_a_1 && item.player_name_a_2) {
              return `${item.player_name_a_1} / ${item.player_name_a_2}`;
            }

            if (item.player_name_a_1 !== null || item.player_name_a_2 !== null) {
              return item.player_name_a_1 ? item.player_name_a_1 : item.player_name_a_2;
            }

            return '-';
          })(),
          score: item.scoreA ?? undefined,
          playerId: 0,
        },
        {
          name: (() => {
            if (item.player_name_b_1 && item.player_name_b_2) {
              return `${item.player_name_b_1} / ${item.player_name_b_2}`;
            }

            if (item.player_name_b_1 !== null || item.player_name_b_2 !== null) {
              return item.player_name_b_1 ? item.player_name_b_1 : item.player_name_b_2;
            }

            return '-';
          })(),
          score: item.scoreB ?? undefined,
          playerId: 0,
        },
      ],
      scoreList: apiData2.filter(item2 => item2.result_id === item.id),
    }));
  }

  return rounds;
}

// eslint-disable-next-line max-len
function ResultComponent({ apiData, id, apiData2 }: { apiData: Result[]; id: number; apiData2: ResultItem[] }) {
  const list = apiData.filter(item => item.event_id === id);

  const rounds = getRounds(list, apiData2);

  return (
    <Bracket rounds={rounds} />
  );
}

export default function Result() {
  const [activeKey, setActiveKey] = useState('single');
  const [apiData, setApiData] = useState<Result[]>([]);
  const [apiResultItem, setApiResultItem] = useState<ResultItem[]>([]);

  useEffect(() => {
    getResult().then(({ data }) => {
      setApiData(data);
    });
    getResultItem().then(({ data }) => {
      setApiResultItem(data);
    });
  }, []);

  const items: TabsProps['items'] = [
    {
      key: 'single',
      label: '單打',
      children: <ResultComponent apiData={apiData} id={1} apiData2={apiResultItem} />,
    },
    {
      key: 'double',
      label: '雙打',
      children: <ResultComponent apiData={apiData} id={2} apiData2={apiResultItem} />,
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
