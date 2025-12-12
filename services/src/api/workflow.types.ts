import { FactKey, FactValueOf } from './workflow-facts.types';

export interface ConflictResolutionOutcome {
  selected: boolean;
  key: FactKey;
  value: FactValueOf<FactKey>;
  strategy: string;
}

export interface WorkflowLogUserDto {
  id: string;
  email: string;
  name: string;
}

export interface WorkflowLogDto {
  id: string;
  action: string;
  context?: Record<string, ConflictResolutionOutcome | unknown>;
  comment?: string;
  createdAt: Date;
  user?: WorkflowLogUserDto;
  interpretedAction?: string;
  interpretedDescription?: string;
}

export enum WorkflowDataErrorType {
  FACT_IS_WRONG_FORMAT = 'FACT_IS_WRONG_FORMAT',
  CONFLICT = 'CONFLICT',
  ATTACHMENT_MISSING_REQUIRED_FACT = 'ATTACHMENT_MISSING_REQUIRED_FACT',
  FACT_IS_MISSING_VALUE = 'FACT_IS_MISSING_VALUE',
  FACT_NOT_RECOGNIZED = 'FACT_NOT_RECOGNIZED',
  VALIDATION_ERROR = 'VALIDATION_ERROR',
  NO_MATCH_FOUND_ERROR = 'NO_MATCH_FOUND_ERROR',
  ATTACHMENT_ERROR = 'ATTACHMENT_ERROR'
}
