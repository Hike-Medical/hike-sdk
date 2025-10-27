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
