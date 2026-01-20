import { FactoryId } from '../../../prisma';

export interface UpdateLaneParams {
  laneId: string;
  configurationId?: string;
  active?: boolean;
  factoryId?: FactoryId;
}
