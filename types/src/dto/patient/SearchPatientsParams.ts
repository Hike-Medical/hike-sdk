import { GetPatientsParams } from './GetPatientsParams';

export interface SearchPatientsParams extends GetPatientsParams {
  term: string;
}
