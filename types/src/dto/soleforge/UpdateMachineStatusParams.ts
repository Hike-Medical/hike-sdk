import { MachineStatus } from '../../../prisma';

export interface UpdateMachineStatusParams {
  machineId: string;
  status: MachineStatus;
}


