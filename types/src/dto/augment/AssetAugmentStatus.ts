export interface AssetAugmentStatus {
  leftAssetAugmentId: string | null;
  rightAssetAugmentId: string | null;
  leftFootAssetAugment: boolean;
  leftFootAssetMediaLength: number;
  rightFootAssetAugment: boolean;
  rightFootAssetMediaLength: number;
  hasReviewedLeftFoot: boolean;
  hasReviewedRightFoot: boolean;
  hasLeftFootDetections?: boolean;
  hasRightFootDetections?: boolean;
}
