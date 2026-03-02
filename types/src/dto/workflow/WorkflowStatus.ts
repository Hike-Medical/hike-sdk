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
  IDLE: 'IDLE',
  COMPLETED: 'COMPLETED'
} as const;

export type WorkflowStatus = (typeof WorkflowStatusEnum)[keyof typeof WorkflowStatusEnum];
export const WorkflowStatusList = Object.values(WorkflowStatusEnum);

/**
 * Workflow statuses that represent active (non-terminal) workflows.
 * Excludes terminal states: SUCCEEDED, FAILED, CANCELLED, COMPLETED.
 */
export const ACTIVE_WORKFLOW_STATUSES = [
  WorkflowStatusEnum.CREATED,
  WorkflowStatusEnum.ACTIVE,
  WorkflowStatusEnum.IN_PROGRESS,
  WorkflowStatusEnum.AWAITING_RESPONSE,
  WorkflowStatusEnum.IDLE
] as const;
