import { WorkflowStatus, WorkflowStepStatus } from '../../../prisma';

export const WorkflowStatusEnum = {
  CREATED: 'CREATED',
  IN_PROGRESS: 'IN_PROGRESS',
  MANUAL: 'MANUAL',
  SUCCEEDED: 'SUCCEEDED',
  FAILED: 'FAILED',
  CANCELLED: 'CANCELLED'
} as const satisfies Record<WorkflowStatus, WorkflowStatus> & {
  [K in WorkflowStatus]: K;
};

export const WorkflowStatusList = Object.values(WorkflowStatusEnum);

export const WorkflowStepStatusEnum = {
  IN_PROGRESS: 'IN_PROGRESS',
  SUCCEEDED: 'SUCCEEDED',
  FAILED: 'FAILED',
  SKIPPED: 'SKIPPED'
} as const satisfies Record<WorkflowStepStatus, WorkflowStepStatus> & {
  [K in WorkflowStepStatus]: K;
};

export const WorkflowStepStatusList = Object.values(WorkflowStepStatusEnum);