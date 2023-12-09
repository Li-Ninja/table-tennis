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
import { getResult } from '@/api/result';
import Bracket from '@/component/result/bracket';
import {
  ICustomRoundProps, Result,
} from '@/types/result';

function getRounds(list: Result[]) {
  // solve single
  const roundNumber = list?.[0]?.round;
  const rounds:ICustomRoundProps[] = [];

  for (let i = roundNumber; i >= 2; i /= 2) {
    rounds.push(
      { title: i === 2 ? '決賽' : (i === 4 ? '半決賽' : `${i} 強賽`),
        round: i,
        seeds: [],
        winnerId: 0 },
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
      winnerId: 0,
    }));
  }

  return rounds;
}

function ResultComponent({ apiData, id }: { apiData: Result[]; id: number}) {
  const list = apiData.filter(item => item.event_id === id);

  const rounds = getRounds(list);

  return (
    <Bracket rounds={rounds} />
  );
}

export default function Result() {
  const [buttonActive, setButtonActive] = useState('tab1');
  const [apiData, setApiData] = useState<Result[]>([]);

  useEffect(() => {
    getResult().then(({ data }) => {
      setApiData(data);
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
          color="light"
          >
          單打
        </TETabsItem>
        <TETabsItem
          onClick={() => handleButtonClick('tab2')}
          active={buttonActive === 'tab2'}
          tag="button"
          color="light"
        >
          雙打
        </TETabsItem>
      </TETabs>

      <TETabsContent>
        <TETabsPane show={buttonActive === 'tab1'}>
          <ResultComponent apiData={apiData} id={1} />
        </TETabsPane>
        <TETabsPane show={buttonActive === 'tab2'}>
          <ResultComponent apiData={apiData} id={2} />

        </TETabsPane>
      </TETabsContent>
    </div>
  );
}
