import { fetchClinicians } from '@hike/services';
import type { ClinicianExtended, GetCliniciansParams, PagedResponse } from '@hike/types';
import { HikeError } from '@hike/types';
import { QueryKey, UseQueryOptions, useQuery } from '@tanstack/react-query';

interface UseCliniciansOptions
  extends Omit<UseQueryOptions<PagedResponse<ClinicianExtended[]>, HikeError<null>>, 'queryKey' | 'queryFn'> {
  params?: GetCliniciansParams;
  queryKey?: QueryKey;
}

export const useClinicians = ({ params, queryKey = [], ...options }: UseCliniciansOptions = {}) =>
  useQuery({
    queryKey: ['clinicians', params, queryKey],
    queryFn: async () => await fetchClinicians(params),
    ...options
  });
