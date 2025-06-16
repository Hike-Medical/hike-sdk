import { Evaluation, EvaluationAttachment, NotificationHistory, Patient } from '../../prisma';

export type EvaluationAttachmentExtended = EvaluationAttachment & {
  metadata: Record<string, any>;
  evaluation:
    | (Evaluation & {
        patient: Patient & {
          notificationHistory: NotificationHistory[];
        };
      })
    | null;
};
