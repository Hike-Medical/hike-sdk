import { WorkflowStepStatus } from '../../../prisma';

export const WorkflowStepStatusEnum = {
  IN_PROGRESS: 'IN_PROGRESS',
  SUCCEEDED: 'SUCCEEDED',
  FAILED: 'FAILED',
  SKIPPED: 'SKIPPED',
  QUEUED: 'QUEUED'
} as const satisfies Record<WorkflowStepStatus, WorkflowStepStatus> & {
  [K in WorkflowStepStatus]: K;
};

export const WorkflowStepStatusList = Object.values(WorkflowStepStatusEnum);

export const WorkflowStatusEnum = {
  CREATED: 'CREATED',
  IN_PROGRESS: 'IN_PROGRESS',
  SUCCEEDED: 'SUCCEEDED',
  FAILED: 'FAILED',
  CANCELLED: 'CANCELLED',
  ACTIVE: 'ACTIVE',
  AWAITING_RESPONSE: 'AWAITING_RESPONSE',
  IDLE: 'IDLE'
} as const;

export type WorkflowStatus = (typeof WorkflowStatusEnum)[keyof typeof WorkflowStatusEnum];
