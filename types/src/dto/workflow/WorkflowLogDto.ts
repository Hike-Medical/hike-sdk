import { FactKey, FactValueOf } from '../../workflow/facts.registry';

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
