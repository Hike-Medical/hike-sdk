import { NotificationHistory } from '../../../prisma';

export interface WorkflowStepDto {
  id: string;
  stepName: string;
  startTime?: string;
  endTime?: string;
  status: string;
  metadata?: {
    numCycles: number;
    numRetries: number;
    jobId: string;
    workflowStateDto?: {
      facts: {
        key: string;
        value: any;
        source: string;
        sourceAttachmentId?: string;
        metadata?: any;
        acquiredAt: string;
        updatedAt: string;
      }[];
        attachments: WorkflowAttachmentDto[];
      dataErrors: {
        factKey: string;
        factValue?: string;
        errorType: string;
        sourceAttachmentId: string;
        conflictAttachmentId?: string;
        resolved: boolean;
        message?: string;
        metadata?: any;
      }[];
    };
  };
}

export interface WorkflowStatusUpdateDto {
  status: string;
  reason?: string;
  updatedAt: string;
}

export interface WorkflowStateDto {
  facts: {
    id: string;
    key: string;
    value: any;
    source: string;
    sourceAttachmentId?: string;
    metadata?: any;
    version: number;
    acquiredAt: string;
    updatedAt: string;
  }[];
  attachments: WorkflowAttachmentDto[];
  calculations?: {
    key: string;
    value: any;
    sourceAttachments: string[];
    sourceFactsIds: string[];
    evaluatedAt: string;
  }[];
  notificationHistory?: NotificationHistory[];
}

export interface WorkflowFactDto {
  id: string;
  key: string;
  value: any;
  source: string;
  sourceAttachmentId?: string;
  metadata?: any;
  active: boolean;
  acquiredAt: string;
  updatedAt: string;
}

export interface WorkflowAttachmentDto {
  id: string;
  name: string;
  bucket: string;
  key: string;
  region: string;
  types: string[];
  status: string;
  statusUpdatedAt?: string;
  statusReason?: string;
  companyId: string;
  metadata?: any;
}

export interface WorkflowErrorDto {
  errorType: string;
  facts: WorkflowFactDto[];
  attachments: WorkflowAttachmentDto[];
  message: string;
}

export interface StepPrerequisiteResultDto {
  name: string;
  passed: boolean;
  explanation: string;
}

export interface WorkflowStepReportDto {
  stepName: string;
  description?: string;
  runCount: number;
  prerequisitesMet: boolean;
  prerequisites: StepPrerequisiteResultDto[];
  unmetExplanations: string[];
}

export interface WorkflowDto {
  workflowId: string;
  workflowName: string;
  companyId: string;
  startTime: string;
  endTime?: string;
  status: string;
  workflowState: WorkflowStateDto;
  workflowSteps: WorkflowStepDto[];
  statusUpdates: WorkflowStatusUpdateDto[];
  parentWorkflowId?: string;
  childWorkflowIds: string[];
  dataErrors: WorkflowErrorDto[];
  exitConditionStatus?: {
    condition: string;
    result: {
      passed: boolean;
      predicates: {
        name: string;
        passed: boolean;
        explanation: string;
      }[];
    };
  }[];
  stepReports?: WorkflowStepReportDto[];
}
