import {
  IRenderSeedProps, IRoundProps,
} from 'react-brackets';

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
