import { fetchDiagnoses, HikeError, searchDiagnoses } from '@hike/services';
import type { Diagnosis, PagedParams, PagedResponse } from '@hike/types';
import { useQuery } from '@tanstack/react-query';

interface UseDiagnosesOptions extends PagedParams {
  key?: string[];
  searchTerm?: string | null;
  enabled?: boolean;
}

export const useDiagnoses = ({ key = [], searchTerm, enabled = true, ...params }: UseDiagnosesOptions) =>
  useQuery<PagedResponse<Diagnosis[]>, HikeError<null>>({
    queryKey: ['diagnoses', ...key, ...(searchTerm ? [searchTerm] : []), params],
    queryFn: async () => (searchTerm ? await searchDiagnoses(searchTerm, params) : await fetchDiagnoses(params)),
    enabled
  });
