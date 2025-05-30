export const EvaluationStatus = {
  NOT_STARTED: 'NOT_STARTED',
  CANCELLED: 'CANCELLED',
  INCOMPLETE: 'INCOMPLETE',
  AWAITING_AUTH: 'AWAITING_AUTH',
  AWAITING_ORDER: 'AWAITING_ORDER',
  PROCESSING: 'PROCESSING',
  COMPLETED: 'COMPLETED',
  DELIVERED: 'DELIVERED'
} as const;

export type EvaluationStatus = (typeof EvaluationStatus)[keyof typeof EvaluationStatus];
