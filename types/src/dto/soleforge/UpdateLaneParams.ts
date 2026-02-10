import { FactoryName } from '../../../prisma';

export interface UpdateLaneParams {
  laneId: string;
  configurationId?: string;
  active?: boolean;
  factoryName?: FactoryName;
}
