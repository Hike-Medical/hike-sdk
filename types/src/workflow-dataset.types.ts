/**
 * Workflow dataset types for frontend table displays
 */

export enum WorkflowDatasetStatus {
  ACTIVE = 'ACTIVE',
  FINISHED = 'FINISHED',
  NON_COMPLIANT = 'NON_COMPLIANT'
}

export interface WorkflowProgressStep {
  time: string;
  label: string;
  status: 'complete' | 'current' | 'pending';
  variant?: 'normal' | 'error' | 'warning';
}

export interface WorkflowDatasetItem {
  id: string;
  patientName?: string;
  patientId?: string;
  caseId?: string;
  issue?: string;
  steps: WorkflowProgressStep[];
  timeSaved?: {
    hours: number;
    minutes: number;
  };
}

export interface WorkflowDatasetResponse {
  status: WorkflowDatasetStatus;
  count: number;
  items: WorkflowDatasetItem[];
  hasMore: boolean;
}

