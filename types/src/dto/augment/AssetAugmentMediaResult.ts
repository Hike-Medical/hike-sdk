import { AssetAugmentMedia } from '../../../prisma/index';
import { AssetAugmentMediaData } from './AssetAugmentMediaData';

export interface AssetAugmentMediaResult extends Omit<AssetAugmentMedia, 'data'> {
  data?: AssetAugmentMediaData;
  signedUrl?: string;
}
