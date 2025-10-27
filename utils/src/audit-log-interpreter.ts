import type { ConflictResolutionOutcome, WorkflowLogDto } from '@hike/types';

interface UpdateWorkflowStateDto {
  attachmentFacts?: {
    attachmentId: string;
    facts: {
      key: string;
      value: any;
    }[];
  }[];
  facts?: {
    key: string;
    value: any;
  }[];
  resolvedFactIds?: string[];
}

interface InterpretedAuditLog extends WorkflowLogDto {
  interpretedAction?: string;
  interpretedDescription?: string;
}

/**
 * Interprets audit log context to provide more readable descriptions
 */
export const interpretAuditLog = (log: WorkflowLogDto): InterpretedAuditLog => {
  const logWithUser = log;
  if (log.user === null) {
    logWithUser.user = {
      id: 'system',
      email: 'system@hike.com',
      name: 'System'
    };
  }
  // Early return if no context
  if (!logWithUser.context) {
    return logWithUser;
  }

  const { context } = logWithUser;
  const newStateDto = context?.newStateDto as UpdateWorkflowStateDto;

  if (context.resolvedConflict !== undefined) {
    const resolvedConflicts = context.resolvedConflict as Record<string, ConflictResolutionOutcome>;
    const factKeys = Object.values(resolvedConflicts)
      .map((f: ConflictResolutionOutcome) => f.key)
      .join(', ');
    return {
      ...logWithUser,
      interpretedAction: 'Auto-Resolved Conflicts',
      interpretedDescription: `Automatically resolved conflicts with facts: ${factKeys}`
    };
  }

  // Early return if no newStateDto
  if (!newStateDto) {
    return logWithUser;
  }

  const { attachmentFacts, facts, resolvedFactIds } = newStateDto;

  // Early return if all are empty/undefined
  if (!resolvedFactIds?.length && !facts?.length && !attachmentFacts?.length) {
    return logWithUser;
  }

  // Case 1: Just resolvedFactIds - user resolved some facts
  if (resolvedFactIds && resolvedFactIds?.length > 0 && !facts?.length && !attachmentFacts?.length) {
    return {
      ...logWithUser,
      interpretedAction: 'Resolved Facts',
      interpretedDescription: `Resolved ${resolvedFactIds.length} fact${resolvedFactIds.length > 1 ? 's' : ''}`
    };
  }

  // Case 2: Just facts - user created/updated facts
  if (facts && facts?.length > 0 && !attachmentFacts?.length && !resolvedFactIds?.length) {
    const factKeys = facts.map((f) => f.key).join(', ');
    return {
      ...logWithUser,
      interpretedAction: 'Updated Facts',
      interpretedDescription: `Updated facts: ${factKeys}`
    };
  }

  // Case 3: Just attachmentFacts - user attached files
  if (attachmentFacts && attachmentFacts?.length > 0 && !facts?.length && !resolvedFactIds?.length) {
    const attachmentCount = attachmentFacts.length;
    const totalFacts = attachmentFacts.reduce((sum, af) => sum + (af.facts?.length || 0), 0);
    return {
      ...logWithUser,
      interpretedAction: 'Attached Files',
      interpretedDescription: `Attached ${attachmentCount} file${attachmentCount > 1 ? 's' : ''} with ${totalFacts} fact${totalFacts > 1 ? 's' : ''}`
    };
  }

  // Case 4: Combination of actions
  const actions: string[] = [];

  if (resolvedFactIds && resolvedFactIds?.length > 0) {
    actions.push(`resolved ${resolvedFactIds.length} fact${resolvedFactIds.length > 1 ? 's' : ''}`);
  }
  if (facts && facts?.length > 0) {
    actions.push(`updated ${facts.length} fact${facts.length > 1 ? 's' : ''}`);
  }
  if (attachmentFacts && attachmentFacts?.length > 0) {
    actions.push(`attached ${attachmentFacts.length} file${attachmentFacts.length > 1 ? 's' : ''}`);
  }

  if (actions.length > 0) {
    return {
      ...logWithUser,
      interpretedAction: 'Multiple Actions',
      interpretedDescription: `User ${actions.join(', ')}`
    };
  }

  return logWithUser;
};

/**
 * Interprets an array of audit logs
 */
export const interpretAuditLogs = (logs: WorkflowLogDto[]): InterpretedAuditLog[] => {
  if (!logs || logs.length === 0) {
    return [];
  }
  return logs.map(interpretAuditLog);
};
