import { AssetAugment } from '../../../prisma';

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
