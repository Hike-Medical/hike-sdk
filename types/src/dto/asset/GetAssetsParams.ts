import { Prisma } from '../../../prisma';
import type { PagedParams } from '../PagedParams';

export interface GetAssetsParams extends PagedParams {
  sortBy?: 'createdAt' | 'updatedAt' | 'detectionUpdatedAt';
  sortOrder?: Prisma.SortOrder;
}
