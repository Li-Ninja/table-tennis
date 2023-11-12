'use client';

import React, { useState } from 'react';
import {
  TETabs,
  TETabsContent,
  TETabsItem,
  TETabsPane,
} from 'tw-elements-react';
import Bracket from '@/component/result/bracket';
import { ICustomRoundProps } from '@/types/result';

// TODO data from
const rounds: ICustomRoundProps[] = [
  {
    title: '十六強賽',
    seeds: [
      {
        id: 1,
        teams: [{ name: 'Team 1' }],
      },
      {
        id: 2,
        teams: [{ name: 'Team 2', score: 0, playerId: 1 }, { name: 'Team 3', score: 3, playerId: 2 }],
        winnerId: 2,
      },
      {
        id: 3,
        teams: [{ name: 'Team 4' }],
      },
      {
        id: 4,
        teams: [{ name: 'Team 5' }],
      },
      {
        id: 5,
        teams: [{ name: 'Team 6' }],
      },
      {
        id: 6,
        teams: [{ name: 'Team 7' }],
      },
      {
        id: 7,
        teams: [{ name: '王勵勤', score: 0 }, { name: '張繼科', score: 3 }],
      },
      {
        id: 8,
        teams: [{ name: 'Team 10' }],
      },
    ],
  },
  {
    title: '八強賽',
    seeds: [
      {
        id: 9,
        teams: [{ name: 'Team A' }, { name: 'Team C' }],
      },
      {
        id: 10,
        teams: [{ name: 'Team A' }, { name: 'Team C' }],
      },
      {
        id: 11,
        teams: [{ name: 'Team A' }, { name: 'Team C' }],
      },
      {
        id: 12,
        teams: [{ name: 'Team A' }, { name: 'Team C' }],
      },
    ],
  },
  {
    title: '半決賽',
    seeds: [
      {
        id: 13,
        teams: [{ name: 'Team A' }, { name: 'Team C' }],
      },
      {
        id: 14,
        teams: [{ name: 'Team A' }, { name: 'Team C' }],
      },
    ],
  },
  {
    title: '決賽',
    seeds: [
      {
        id: 15,
        teams: [{ name: 'Team A' }, { name: 'Team C' }],
      },
    ],
  },
];

export default function Result() {
  const [buttonActive, setButtonActive] = useState('tab1');

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
          <Bracket rounds={rounds} />
        </TETabsPane>
        <TETabsPane show={buttonActive === 'tab2'}>
          {/* TODO 雙打 */}
          Waiting
        </TETabsPane>
      </TETabsContent>
    </div>
  );
}
