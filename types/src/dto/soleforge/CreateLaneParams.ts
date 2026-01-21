import { FactoryId } from '../../../prisma';

export interface CreateLaneParams {
  name: string;
  description?: string;
  configurationId: string;
  factoryId: FactoryId;
}
