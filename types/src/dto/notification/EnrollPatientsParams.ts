export interface SendTimeWindow {
  enabled: boolean;
  startHour: number;
  endHour: number;
  timeZone: string;
}

export interface EnrollPatientsParams {
  patientIds?: string[];
  status?: 'ALL' | 'ACTIVE' | 'INACTIVE';
  tags?: string[];
  onlyExternalId?: boolean;
  allowResend?: boolean;
  search?: string;
  staggeredBatchSize?: number;
  staggeredBatchDelayMinutes?: number;
  sendTimeWindow?: SendTimeWindow;
}

export type PreviewEnrollPatientsParams = Omit<
  EnrollPatientsParams,
  'staggeredBatchSize' | 'staggeredBatchDelayMinutes' | 'sendTimeWindow'
>;
