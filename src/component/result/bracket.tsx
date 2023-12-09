'use client';

import classNames from 'classnames';
import {
  Bracket, SeedItem,
} from 'react-brackets';
import { Seed } from '@/component/result/seed';
import {
  ICustomRenderSeedProps,
  ICustomRoundProps,
  ResultItem,
} from '@/types/result';

// TODO hover all seed when pointer the person
const CustomSeedTeam = (
  { name, score, isWinner, str }:
  {name: string | undefined; score: number | undefined; isWinner: boolean; str: string},
) => (
  <div className="flex flex-col px-4 pt-3 pb-1 hover:bg-gradient-primary border border-[#ddd]/30">
    <div className="flex justify-between items-center text-md group">
      <div>{name}</div>
      <div className={classNames('font-bold', isWinner ? 'text-primary' : 'text-gray-400', 'group-hover:text-white')}>{score}</div>
    </div>
    <div className="text-xs text-left mt-1">{str}</div>
  </div>
);

const CustomSeed = ({ seed }: ICustomRenderSeedProps) => {
  let str = '';

  (seed.scoreList as ResultItem[]).forEach(item => {
    str += `${item.scoreA}:${item.scoreB}  `;
  });

  return (
    <Seed>
      <SeedItem>
        <div>
          {seed.teams.map((team, key) => (
            <CustomSeedTeam
              name={team?.name ?? '---'}
              score={team?.score}
              isWinner={team?.score === 3}
              key={key}
              str={str}
            />
          ))}
        </div>
      </SeedItem>
    </Seed>
  );
};

const CustomTitle = (title: React.ReactNode) => <div className="text-primary text-center">{title}</div>;

export default function BracketComponent({ rounds }: { rounds: ICustomRoundProps[]}) {
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
