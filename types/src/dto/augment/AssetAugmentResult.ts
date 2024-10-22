import { AssetAugmentMedia } from '../../../prisma';
import { AssetAugmentMediaData } from './AssetAugmentMediaData';

export interface AssetAugmentResult extends AssetAugment {
  media?: (Omit<AssetAugmentMedia, 'data'> & {
    data?: AssetAugmentMediaData;
    signedUrl?: string;
  })[];
}
