import { EntityType } from '../../../prisma';

export interface UpsertTagParams {
  name: string;
  description?: string;
  entityId: string;
  entityType: EntityType;
}
