import { Reward } from '../../../prisma';

export interface RewardInfo extends Reward {
  earnedAt: Date | null;
}
