import type { Diagnosis, PagedParams, PagedResponse } from '@hike/types';
import { useQuery } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import { fetchDiagnoses, searchDiagnoses } from '../api/diagnosis.service';
import { ResponseError } from '../errors/ResponseError';

export interface UseDiagnosesOptions extends PagedParams {
  key?: string[];
  searchTerm?: string | null;
  enabled?: boolean;
}

export const useDiagnoses = ({ key = [], searchTerm, enabled = true, ...params }: UseDiagnosesOptions) =>
  useQuery<PagedResponse<Diagnosis[]>, ResponseError<null>>({
    queryKey: ['diagnoses', ...key, ...(searchTerm ? [searchTerm] : []), params],
    queryFn: async () => {
      try {
        return searchTerm ? await searchDiagnoses(searchTerm, params) : await fetchDiagnoses(params);
      } catch (error) {
        const status = isAxiosError(error) ? error.status ?? 500 : 500;
        // TODO: Extract message from backend response
        throw new ResponseError<null>('There was an error retrieving diagnoses', status, null);
      }
    },
    enabled
  });
