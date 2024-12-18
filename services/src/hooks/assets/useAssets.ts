import type { AssetExtended, GetAssetsParams, PagedResponse } from '@hike/types';
import { QueryKey, UseQueryOptions, useQuery } from '@tanstack/react-query';
import { findAssets } from '../../api/asset.service';
import { HikeError } from '../../errors/HikeError';

export interface UseAssetsOptions
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
