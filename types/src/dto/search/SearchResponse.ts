import { EvaluationExtended } from '../../entities/EvaluationExtended';
import { PatientExtended } from '../../entities/PatientExtended';
import { PagedResponse } from '../PagedResponse';

export interface SearchResponse {
  patients: PagedResponse<PatientExtended[]>;
  evaluations: PagedResponse<EvaluationExtended[]>;
}
