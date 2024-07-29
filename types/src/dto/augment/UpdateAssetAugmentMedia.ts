import { AssetAugmentMediaData } from './AssetAugmentMediaData';

export interface UpdateAssetAugmentMedia {
  active?: boolean;
  inactiveReason?: string;
  data?: AssetAugmentMediaData;
  image?: string;
  canvas?: Record<string, any>[];
}
