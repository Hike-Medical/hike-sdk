import { Asset, AssetAugmentType, Side } from '../../../prisma';
import { AssetAugmentMediaResult } from './AssetAugmentMediaResult';

export interface AssetAugmentResult {
  id: string;
  assetId: string;
  footSide?: Side;
  type: AssetAugmentType;
  detectionType: any;
  data: any;
  active: boolean;
  createdAt: string | Date | null;
  updatedAt: string | Date | null;
  asset?: Asset;
  aggregatedData?: Record<string, number>;
  media?: AssetAugmentMediaResult[] | null;
}
