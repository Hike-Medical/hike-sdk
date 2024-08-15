export interface AssetAugmentStatusForAugmentId {
  assetAugmentId: string;
  assetAugment: boolean;
  mediaLength: number;
  hasReviewed: boolean;
  hasDetections?: boolean;
}
