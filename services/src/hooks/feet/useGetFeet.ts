import { UseQueryOptions, useQuery } from '@tanstack/react-query';
import { FootWithAssets, getFeet } from '../../api/workbench.service';
import { HikeError } from '../../errors/HikeError';

export const useGetFeet = (
  workbenchId: string,
  queryOptions?: Omit<UseQueryOptions<FootWithAssets[], HikeError<null>>, 'queryKey' | 'queryFn'>
) =>
  useQuery({
    queryKey: ['activeFeet', workbenchId],
    queryFn: () => getFeet(workbenchId),
    ...queryOptions
  });
