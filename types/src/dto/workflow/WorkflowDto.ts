import { WorkflowStatus } from '../../../prisma';

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
      attachments: {
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
      }[];
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
  status: WorkflowStatus;
  reason?: string;
  updatedAt: string;
}

export interface WorkflowStateDto {
  facts: {
    key: string;
    value: any;
    source: string;
    sourceAttachmentId?: string;
    metadata?: any;
    version: number;
    acquiredAt: string;
    updatedAt: string;
  }[];
  attachments: {
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
  }[];
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

export interface WorkflowErrorDto {
  errorType: string;
  facts: WorkflowFactDto[];
  message: string;
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
}
