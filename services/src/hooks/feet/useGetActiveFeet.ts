import { UseQueryOptions, useQuery } from '@tanstack/react-query';
import { FootWithAssets, getActiveFeet } from '../../api/workbench.service';
import { HikeError } from '../../errors/HikeError';

export const useGetActiveFeet = (
  workbenchId: string,
  queryOptions?: Omit<UseQueryOptions<FootWithAssets[], HikeError<null>>, 'queryKey' | 'queryFn'>
) => {
  return useQuery({
    queryKey: ['activeFeet', workbenchId],
    queryFn: () => getActiveFeet(workbenchId),
    ...queryOptions
  });
};
