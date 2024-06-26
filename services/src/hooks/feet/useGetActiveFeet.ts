import { UseQueryOptions, useQuery } from '@tanstack/react-query';
import { FootWithAssets, getActiveFeet } from '../../api/workbench.service';
import { ResponseError } from '../../errors/ResponseError';

export const useGetActiveFeet = (
  workbenchId: string,
  queryOptions?: Omit<UseQueryOptions<FootWithAssets[], ResponseError<null>>, 'queryKey' | 'queryFn'>
) => {
  return useQuery({
    queryKey: ['activeFeet', workbenchId],
    queryFn: () => getActiveFeet(workbenchId),
    ...queryOptions
  });
};
