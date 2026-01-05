import { MachineStatus } from '../../../prisma';

export type MachineStateAction = 'SET_MAINTENANCE' | 'SET_OFFLINE' | 'SET_ERROR' | 'SET_PRINTING' | 'CLEAR_AND_RESUME';

export interface MachineStateTransition {
  status: MachineStatus;
  action: MachineStateAction;
  label: string;
  isTestOnly: boolean;
}

export interface ValidMachineStateTransitions {
  currentStatus: MachineStatus;
  validTransitions: MachineStateTransition[];
}


