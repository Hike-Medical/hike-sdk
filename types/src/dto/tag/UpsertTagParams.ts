import { EntityType } from '../../../prisma/index';

export interface UpsertTagParams {
  name: string;
  description?: string;
  entityId: string;
  entityType: EntityType;
}
