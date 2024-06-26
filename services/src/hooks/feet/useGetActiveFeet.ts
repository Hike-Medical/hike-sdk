import { UseQueryOptions, useQuery } from '@tanstack/react-query';
import { FootWithAssets, getActiveFeet } from '../../api/workbench.service';

export const useGetActiveFeet = (
  workbenchId: string,
  queryOptions?: Omit<UseQueryOptions<FootWithAssets[]>, 'queryKey' | 'queryFn'>
) => {
  return useQuery({
    queryKey: ['activeFeet', workbenchId],
    queryFn: () => getActiveFeet(workbenchId),
    ...queryOptions
  });
};
