import { AssetAugment } from '@prisma/client';

export interface DetectionStatusResponse {
  rightFoot: FootDetectionStatus;
  leftFoot: FootDetectionStatus;
}

interface FootDetectionStatus {
  isActive: boolean;
  detectedAt?: Date;
  isPending: boolean;
  augments: AssetAugment[];
}
