'use client';

import classNames from 'classnames';
import dayjs from 'dayjs';
// import {
//   Bracket, IRoundProps,
// } from 'react-brackets';
import {
  Bracket, IRenderSeedProps, IRoundProps, SeedItem,
} from 'react-brackets';
import { Seed } from '@/component/result/seed';

// TODO date from api
const date = dayjs('2023-12-10').format('YYYY-MM-DD');

// TODO playerId is not undefined
type ExtendedSeed = {
  teams: Array<{
        name?: string;
        score?: number;
        playerId?: number;
    }>;
  winnerId?: number;
};

interface ICustomRoundProps extends IRoundProps {
  seeds: Array<IRoundProps['seeds'][number] & ExtendedSeed>;
}

interface ICustomRenderSeedProps extends IRenderSeedProps {
  seed: IRoundProps['seeds'][number] & ExtendedSeed;
}

// TODO data from
const rounds: ICustomRoundProps[] = [
  {
    title: '十六強賽',
    seeds: [
      {
        id: 1,
        date,
        teams: [{ name: 'Team 1' }],
      },
      {
        id: 2,
        date,
        teams: [{ name: 'Team 2', score: 0, playerId: 1 }, { name: 'Team 3', score: 3, playerId: 2 }],
        winnerId: 2,
      },
      {
        id: 3,
        date,
        teams: [{ name: 'Team 4' }],
      },
      {
        id: 4,
        date,
        teams: [{ name: 'Team 5' }],
      },
      {
        id: 5,
        date,
        teams: [{ name: 'Team 6' }],
      },
      {
        id: 6,
        date,
        teams: [{ name: 'Team 7' }],
      },
      {
        id: 7,
        date,
        teams: [{ name: '王勵勤', score: 0 }, { name: '張繼科', score: 3 }],
      },
      {
        id: 8,
        date,
        teams: [{ name: 'Team 10' }],
      },
    ],
  },
  {
    title: '八強賽',
    seeds: [
      {
        id: 9,
        date,
        teams: [{ name: 'Team A' }, { name: 'Team C' }],
      },
      {
        id: 10,
        date,
        teams: [{ name: 'Team A' }, { name: 'Team C' }],
      },
      {
        id: 11,
        date,
        teams: [{ name: 'Team A' }, { name: 'Team C' }],
      },
      {
        id: 12,
        date,
        teams: [{ name: 'Team A' }, { name: 'Team C' }],
      },
    ],
  },
  {
    title: '半決賽',
    seeds: [
      {
        id: 13,
        date,
        teams: [{ name: 'Team A' }, { name: 'Team C' }],
      },
      {
        id: 14,
        date,
        teams: [{ name: 'Team A' }, { name: 'Team C' }],
      },
    ],
  },
  {
    title: '決賽',
    seeds: [
      {
        id: 15,
        date,
        teams: [{ name: 'Team A' }, { name: 'Team C' }],
      },
    ],
  },
];

// TODO hover all seed when pointer the person
const CustomSeedTeam = (
  { name, score, isWinner }:
  {name: string | undefined; score: number | undefined; isWinner: boolean},
) => (
  <div className="flex px-4 py-3 justify-between items-center hover:bg-gradient-primary text-md group border border-[#ddd]/30">
    <div>{name}</div>
    <div className={classNames('font-bold', isWinner ? 'text-primary' : 'text-gray-400', 'group-hover:text-white')}>{score}</div>
  </div>
);

const CustomSeed = ({ seed }: ICustomRenderSeedProps) => (
  <Seed>
    <SeedItem>
      <div>
        {seed.teams.map((team, key) => (
          <CustomSeedTeam
            name={team?.name ?? '---'}
            score={team?.score}
            isWinner={seed.winnerId === team.playerId}
            key={key}
          />
        ))}
      </div>
    </SeedItem>
  </Seed>
);

const CustomTitle = (title: React.ReactNode) => <div className="text-primary text-center">{title}</div>;

export default function Result() {
  return (
    <div className="overflow-auto bg-gray-900">
      <Bracket
        bracketClassName="mt-4"
        rounds={rounds}
        mobileBreakpoint={0}
        renderSeedComponent={CustomSeed}
        roundTitleComponent={CustomTitle}
      />
    </div>
  );
}
