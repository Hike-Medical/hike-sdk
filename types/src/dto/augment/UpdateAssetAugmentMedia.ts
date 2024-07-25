export interface UpdateAssetAugmentMedia {
  active?: boolean;
  inactiveReason?: string;
  data?: Record<string, any>;
  image?: string;
  canvas?: Record<string, any>[];
}
