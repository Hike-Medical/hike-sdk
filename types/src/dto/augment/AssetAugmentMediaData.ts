import { Side } from '../../../prisma';

export interface AssetAugmentMediaData {
  view?: string;
  footSide?: Side;
  imageWidth?: number;
  imageHeight?: number;
  image?: string;
  boundingBox?: { Box?: [number, number, number, number]; Confidence?: number }[];
  painMapCondition?: string;
  painMapOption?: string;
  viewpoints?: Record<string, number>;
}
