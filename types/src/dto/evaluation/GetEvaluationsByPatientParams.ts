import { GetEvaluationsParams } from './GetEvaluationsParams';

export interface GetEvaluationsByPatientParams
  extends Omit<GetEvaluationsParams, 'patientId' | 'patientExternalId' | 'assignedOnly'> {}
