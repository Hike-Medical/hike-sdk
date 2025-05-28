import { findAssets } from '@hike/services';
import type { AssetExtended, GetAssetsParams, PagedResponse } from '@hike/types';
import { HikeError } from '@hike/types';
import { QueryKey, UseQueryOptions, useQuery } from '@tanstack/react-query';

interface UseAssetsOptions
  extends Omit<UseQueryOptions<PagedResponse<AssetExtended[]>, HikeError<null>>, 'queryKey' | 'queryFn'> {
  params: GetAssetsParams;
  queryKey?: QueryKey;
}

export const useAssets = ({ params, queryKey = [], ...options }: UseAssetsOptions) =>
  useQuery({
    queryKey: ['assets', params, queryKey],
    queryFn: async () => await findAssets(params),
    ...options
  });
