import { FactoryName } from '../../../prisma';

export interface CreateLaneParams {
  name: string;
  description?: string;
  configurationId: string;
  factoryName: FactoryName;
}
