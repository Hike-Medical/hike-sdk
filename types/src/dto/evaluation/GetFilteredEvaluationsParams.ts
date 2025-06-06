import { PagedParams } from '../PagedParams';

export const GetFilteredEvaluationsFilter = [
  'id',
  'poNumber',
  'type',
  'deviceType.name',
  'patient.id',
  'patient.firstName',
  'patient.lastName',
  'clinicians.name',
  'facility.name',
  'diagnosis.code',
  'status',
  'isDiabetic'
] as const;

export type GetFilteredEvaluationsFilter = (typeof GetFilteredEvaluationsFilter)[number];

export interface GetFilteredEvaluationsParams extends PagedParams {
  filter?: Partial<Record<GetFilteredEvaluationsFilter, string>>;
}
