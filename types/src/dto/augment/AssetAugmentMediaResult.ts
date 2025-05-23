export interface AssetAugmentMediaResult {
  id: string;
  augmentId: string;
  data: Record<string, any>;
  originalData: Record<string, any>;
  region: string | null;
  bucket: string | null;
  key: string | null;
  active: boolean;
  inactiveReason: any | null;
  reviewedAt: string | Date | null;
  createdAt: string | Date | null;
  updatedAt: string | Date | null;
  signedUrl?: string;
}
