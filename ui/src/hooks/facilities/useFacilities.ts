import { fetchFacilities } from '@hike/services';
import { FacilityExtended, GetFacilitiesParams, HikeError } from '@hike/types';
import { QueryKey, UseQueryOptions, useQuery } from '@tanstack/react-query';

interface UseFacilitiesOptions
  extends Omit<UseQueryOptions<FacilityExtended[], HikeError<null>>, 'queryKey' | 'queryFn'> {
  params?: GetFacilitiesParams;
  queryKey?: QueryKey;
}

export const useFacilities = ({ params, queryKey = [], ...options }: UseFacilitiesOptions = {}) =>
  useQuery({
    queryKey: ['facilities', params, queryKey],
    queryFn: async () => await fetchFacilities(params),
    ...options
  });
