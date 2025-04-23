import { Reward } from '../../../prisma';

export type RewardInfo = Reward & {
  earnedAt: Date | null;
};
