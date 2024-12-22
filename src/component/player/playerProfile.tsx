import React from 'react';
import {
  RacketTypeEnum, RubberTypeEnum,
} from '@/enum/player';
import { usePlayerStore } from '@/store/player';
import { Player } from '@/types/player';

interface IProps {
  playerId: Player['id'];
  isComparing?: boolean;
}

export default function PlayerProfile({ playerId, isComparing = false }: IProps) {
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
        return '直板';
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

  const imageSize = isComparing ? 'h-[150px] w-[150px]' : 'h-[200px] md:h-[400px] md:w-[400px]';
  const nameSize = isComparing ? 'text-2xl md:text-3xl' : 'text-3xl md:text-6xl';
  const rankingSize = isComparing ? 'text-3xl md:text-4xl' : 'text-4xl md:text-7xl';
  const scoreSize = isComparing ? 'text-xl md:text-2xl' : 'text-2xl md:text-5xl';
  const gapSize = isComparing ? 'gap-1 sm:gap-2 md:gap-4' : 'gap-1 sm:gap-4 md:gap-8';
  const marginSize = isComparing ? 'mr-2 md:mr-6' : 'mr-2 sm:mr-10 md:mr-20';

  return (
    <div className={`flex flex-col md:flex-row justify-center xl:justify-start gap-y-3 md:gap-y-0 md:gap-x-5 ${isComparing ? 'scale-90' : ''}`}>
      <div className="flex md:flex-col justify-center">
        <img className={` object-cover ${imageSize} rounded-[20%]`} src={playerImage} alt="avatar" />
      </div>
      <div className={`flex flex-col justify-center items-center md:items-start ${gapSize}`}>
        <div className={`${nameSize} font-bold`}>{player.name}</div>
        <div className="flex flex-col sm:flex-row">
          <div className={`flex flex-col ${marginSize} items-center sm:items-start p-2 gap-y-0 sm:gap-y-10 whitespace-nowrap`}>
            <div className={isComparing ? 'text-sm' : ''}>Ttt51 Ranking</div>
            <div className={`${rankingSize} font-bold`}># {player.rank ?? 0}</div>
          </div>
          <div className="flex justify-center sm:border-l sm:border-dashed sm:border-slate-400 p-2 sm:pl-8 whitespace-nowrap">
            <div className={`flex flex-col gap-y-5 justify-center mr-3 ${isComparing ? 'text-sm' : ''}`}>
              <div className="w-2/3">Style</div>
              <div className="w-2/3">Forehand</div>
              <div className="w-2/3">Backhand</div>
            </div>
            <div className={`flex flex-col gap-y-5 justify-center ${isComparing ? 'text-sm' : ''}`}>
              <div className="w-1/3 font-bold">{handType}{racketType}</div>
              <div className="w-1/3 font-bold">{forehandRubberType}</div>
              <div className="w-1/3 font-bold">{backhandRubberType}</div>
            </div>
          </div>
        </div>
        <div className="flex items-end">
          <div className={`mr-5 ${isComparing ? 'text-sm' : ''}`}>Score</div>
          <div className={`${scoreSize} font-bold`}>{player.score}</div>
        </div>
      </div>
    </div>
  );
}
