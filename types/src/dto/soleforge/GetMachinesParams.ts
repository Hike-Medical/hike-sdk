import { MachineType } from '../../../prisma';

export interface GetMachinesParams {
  types?: MachineType[];
}

