import type { ClinicianExtended, GetCliniciansParams, PagedResponse } from '@hike/types';
import { QueryKey, UseQueryOptions, useQuery } from '@tanstack/react-query';
import { fetchClinicians } from '../../api/user.service';
import { ResponseError } from '../../errors/ResponseError';

export interface UseCliniciansOptions
  extends Omit<UseQueryOptions<PagedResponse<ClinicianExtended[]>, ResponseError<null>>, 'queryKey' | 'queryFn'> {
  params?: GetCliniciansParams;
  queryKey?: QueryKey;
}

export const useClinicians = ({ params, queryKey = [], ...options }: UseCliniciansOptions = {}) =>
  useQuery({
    queryKey: ['clinicians', params, queryKey],
    queryFn: async () => await fetchClinicians(params),
    ...options
  });
