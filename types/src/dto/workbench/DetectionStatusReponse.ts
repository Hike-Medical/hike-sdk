import { AssetAugment } from '@prisma/client';

export interface DetectionStatusResponse {
  rightFoot: FootDetectionStatus;
  leftFoot: FootDetectionStatus;
}

interface FootDetectionStatus {
  isActive: boolean;
  isApproved: boolean;
  hasScan: boolean;
  isPending: boolean;
  augments: AssetAugment[];
}
