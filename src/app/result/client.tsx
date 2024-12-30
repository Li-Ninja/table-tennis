'use client';

import React, {
  useEffect, useState,
} from 'react';
import {
  TETabs,
  TETabsContent,
  TETabsItem,
  TETabsPane,
} from 'tw-elements-react';
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
            if (item.player_nameA1 && item.player_nameA2) {
              return `${item.player_nameA1} / ${item.player_nameA2}`;
            }

            if (item.player_nameA1 !== null || item.player_nameA2 !== null) {
              return item.player_nameA1 ? item.player_nameA1 : item.player_nameA2;
            }

            return '-';
          })(),
          score: item.scoreA ?? undefined,
          playerId: 0,
        },
        {
          name: (() => {
            if (item.player_nameB1 && item.player_nameB2) {
              return `${item.player_nameB1} / ${item.player_nameB2}`;
            }

            if (item.player_nameB1 !== null || item.player_nameB2 !== null) {
              return item.player_nameB1 ? item.player_nameB1 : item.player_nameB2;
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
  const [buttonActive, setButtonActive] = useState('tab1');
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

  const handleButtonClick = (value: string) => {
    if (value === buttonActive) {
      return;
    }

    setButtonActive(value);
  };

  return (
    <div className="overflow-auto bg-gray-900">
      <TETabs>
        <TETabsItem
          onClick={() => handleButtonClick('tab1')}
          active={buttonActive === 'tab1'}
          tag="button"
          color={buttonActive === 'tab1' ? 'primary' : 'light'}
          >
          單打
        </TETabsItem>
        <TETabsItem
          onClick={() => handleButtonClick('tab2')}
          active={buttonActive === 'tab2'}
          tag="button"
          color={buttonActive === 'tab2' ? 'primary' : 'light'}
        >
          雙打
        </TETabsItem>
      </TETabs>

      <TETabsContent>
        <TETabsPane show={buttonActive === 'tab1'}>
          <ResultComponent apiData={apiData} id={1} apiData2={apiResultItem} />
        </TETabsPane>
        <TETabsPane show={buttonActive === 'tab2'}>
          <ResultComponent apiData={apiData} id={2} apiData2={apiResultItem} />

        </TETabsPane>
      </TETabsContent>
    </div>
  );
}
