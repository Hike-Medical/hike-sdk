import { Evaluation, EvaluationAttachment, NotificationHistory, Patient } from '../../prisma';

export type EvaluationAttachmentExtended = EvaluationAttachment & {
  evaluation:
    | (Evaluation & {
        patient: Patient & {
          notificationHistory: NotificationHistory[];
        };
      })
    | null;
};
