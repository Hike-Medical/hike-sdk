import { FootWithAssets, getFeet } from '@hike/services';
import { HikeError } from '@hike/types';
import { UseQueryOptions, useQuery } from '@tanstack/react-query';

export const useGetFeet = (
  workbenchId: string,
  queryOptions?: Omit<UseQueryOptions<FootWithAssets[], HikeError<null>>, 'queryKey' | 'queryFn'>
) =>
  useQuery({
    queryKey: ['activeFeet', workbenchId],
    queryFn: () => getFeet(workbenchId),
    ...queryOptions
  });
