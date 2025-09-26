import { WorkflowDataErrorType } from '../../../prisma';

export const WorkflowDataErrorTypeEnum = {
  FACT_IS_WRONG_FORMAT: 'FACT_IS_WRONG_FORMAT',
  CONFLICT: 'CONFLICT',
  ATTACHMENT_MISSING_REQUIRED_FACT: 'ATTACHMENT_MISSING_REQUIRED_FACT',
  FACT_IS_MISSING_VALUE: 'FACT_IS_MISSING_VALUE',
  FACT_NOT_RECOGNIZED: 'FACT_NOT_RECOGNIZED',
  VALIDATION_ERROR: 'VALIDATION_ERROR'
} as const satisfies Record<WorkflowDataErrorType, WorkflowDataErrorType> & {
  [K in WorkflowDataErrorType]: K;
};

export const WorkflowDataErrorTypeList = Object.values(WorkflowDataErrorTypeEnum);
