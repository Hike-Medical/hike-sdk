import { AssetAugmentMedia } from '@prisma/client';
import { AssetAugmentMediaData } from './AssetAugmentMediaData';

export interface AssetAugmentMediaResult extends Omit<AssetAugmentMedia, 'data'> {
  data?: AssetAugmentMediaData;
  signedUrl?: string;
}
