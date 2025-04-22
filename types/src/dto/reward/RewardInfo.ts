import { Reward } from '@prisma/client';

export type RewardInfo = Reward & {
  earnedAt: Date | null;
};
