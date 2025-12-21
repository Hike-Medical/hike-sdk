import { MachineType } from '../../../prisma';

export interface AddLabelPrinterParams {
  name: string;
  type: MachineType;
  externalId: string;
  configurationId: string;
  laneId?: string;
}
