import { fetchAnodyneProductStyleVariants } from '@hike/services';
import type { CatalogProductExtended, GetAnodyneProductStyleVariantsParams } from '@hike/types';
import { HikeError } from '@hike/types';
import { QueryKey, UseQueryOptions, useQuery } from '@tanstack/react-query';

interface UseAnodyneProductStyleVariantsOptions
  extends Omit<UseQueryOptions<CatalogProductExtended[], HikeError<null>>, 'queryKey' | 'queryFn'> {
  params: GetAnodyneProductStyleVariantsParams;
  queryKey?: QueryKey;
}

export const useAnodyneProductStyleVariants = ({
  params,
  queryKey = [],
  ...options
}: UseAnodyneProductStyleVariantsOptions) =>
  useQuery({
    queryKey: ['anodyneProductStyleVariants', params, queryKey],
    queryFn: async () => await fetchAnodyneProductStyleVariants(params),
    ...options
  });
