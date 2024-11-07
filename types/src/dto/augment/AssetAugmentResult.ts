import { AssetAugment, AssetAugmentMedia, AssetAugmentType } from '../../../prisma';
import { AssetAugmentMediaData } from './AssetAugmentMediaData';

export interface AssetAugmentResult extends Omit<AssetAugment, 'type'> {
  type: AssetAugmentType;
  aggregatedData?: Record<string, number>;
  media?: (Omit<AssetAugmentMedia, 'data'> & {
    data?: AssetAugmentMediaData;
    signedUrl?: string;
  })[];
}
