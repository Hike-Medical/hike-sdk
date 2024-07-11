import { AugmentMedia } from '../../../prisma';
import { Augment } from '../../../prisma';
import { AugmentMediaData } from './AugmentMediaData';

export interface AugmentResult extends Augment {
  media?: (Omit<AugmentMedia, 'data'> & {
    data?: AugmentMediaData;
    signedUrl?: string;
  })[];
}
