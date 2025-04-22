import { Reward } from '../../../prisma/index';

export type RewardInfo = Reward & {
  earnedAt: Date | null;
};
