import { statsForAssets } from '@hike/services';
import { AssetStatus, HikeError } from '@hike/types';
import { QueryKey, UseQueryOptions, useQuery } from '@tanstack/react-query';

interface UseAssetStatsOptions
  extends Omit<UseQueryOptions<{ status: AssetStatus; count: number }[], HikeError<null>>, 'queryKey' | 'queryFn'> {
  queryKey?: QueryKey;
}

export const useAssetStats = ({ queryKey = [], ...options }: UseAssetStatsOptions = {}) =>
  useQuery({
    queryKey: ['assetStats', queryKey],
    queryFn: async () => await statsForAssets(),
    ...options
  });
