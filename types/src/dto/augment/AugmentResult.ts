import { AugmentMedia } from '../../../prisma';
import { Augment } from '../../../prisma';

export interface AugmentResult extends Augment {
  media?: (AugmentMedia & {
    signedUrl?: string;
  })[];
}
