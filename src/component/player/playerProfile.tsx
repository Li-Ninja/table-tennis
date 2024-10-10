import React from 'react';
import {
  RacketTypeEnum, RubberTypeEnum,
} from '@/enum/player';
import { usePlayerStore } from '@/store/player';
import { Player } from '@/types/player';

interface IProps {
  playerId: Player['id'];
}

export default function PlayerProfile({ playerId }: IProps) {
  const { playerList } = usePlayerStore(state => state);
  const player = playerList.find(item => item.id === playerId);

  if (!player) {
    return <div />;
  }

  const playerImage = `/player/player-${player.isMan ? 'man' : 'woman'}-right-shakehand.webp`;
  const handType = player.isRightHand ? '右手' : '左手';
  const racketType = (() => {
    switch (player.racketType) {
      case RacketTypeEnum.Penhold:
        return '直拍';
      case RacketTypeEnum.ChinesePenhold:
        return '中直';
      case RacketTypeEnum.Shakehand:
      default:
        return '橫板';
    }
  })();

  function getRubberType(rubberType: RubberTypeEnum) {
    switch (rubberType) {
      case RubberTypeEnum.None:
        return '無';
      case RubberTypeEnum.ShortPimple:
        return '短顆';
      case RubberTypeEnum.MiddlePimple:
        return '中顆';
      case RubberTypeEnum.LongPimple:
        return '長顆';
      case RubberTypeEnum.Anti:
        return 'Anti';
      case RubberTypeEnum.Inverted:
      default:
        return '平面';
    }
  }

  const forehandRubberType = getRubberType(player.forehandRubberType);
  const backhandRubberType = getRubberType(player.backhandRubberType);

  return (
    <div className="flex flex-col md:flex-row justify-center xl:justify-start gap-10">
      <div className="flex justify-center">
        <img className="object-cover" src={playerImage} alt="avatar" style={{ width: 400, height: 400, borderRadius: '20%' }} />
      </div>
      <div className="flex flex-col justify-center items-center md:items-start gap-8">
        <div className="text-6xl font-bold">{player.name}</div>
        <div className="flex">
          <div className="flex flex-col mr-20 p-2  gap-y-10 whitespace-nowrap">
            <div>TTT Ranking</div>
            <div className="text-7xl font-bold"># {player.rank ?? 0}</div>
          </div>
          <div className="flex justify-center border-l border-dashed border-slate-400 p-2 pl-8 whitespace-nowrap">
            <div className="flex flex-col gap-y-5 justify-center mr-3">
              <div className="w-2/3">Style</div>
              <div className="w-2/3">Forehand</div>
              <div className="w-2/3">Backhand</div>
            </div>
            <div className="flex flex-col gap-y-5 justify-center">
              <div className="w-1/3 font-bold">{handType}{racketType}</div>
              <div className="w-1/3 font-bold">{forehandRubberType}</div>
              <div className="w-1/3 font-bold">{backhandRubberType}</div>
            </div>
          </div>
        </div>
        <div className="flex items-end">
          <div className="mr-5">Score</div>
          <div className="text-5xl font-bold">{player.score}</div>
        </div>
      </div>
    </div>
  );
}
