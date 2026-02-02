// QC Rejection status enum - mirrors Prisma's QCRejectionStatus
export const QCRejectionStatus = {
  PENDING: 'PENDING',
  REVIEWED: 'REVIEWED',
  PENDING_KT: 'PENDING_KT',
  REPRINTJOB_SENT: 'REPRINTJOB_SENT'
} as const;

export type QCRejectionStatus = (typeof QCRejectionStatus)[keyof typeof QCRejectionStatus];
