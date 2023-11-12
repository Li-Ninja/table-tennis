'use client';

import classNames from 'classnames';
import {
  Bracket, SeedItem,
} from 'react-brackets';
import { Seed } from '@/component/result/seed';
import {
  ICustomRenderSeedProps,
  ICustomRoundProps,
} from '@/types/result';

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
