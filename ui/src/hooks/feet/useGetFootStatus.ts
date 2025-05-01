import { HikeError, getClinicalFootStatus } from '@hike/services';
import { FootStatus } from '@hike/types';
import { UseQueryOptions, useQuery } from '@tanstack/react-query';

export const useGetFootStatus = (
  footId: string,
  queryOptions?: Omit<UseQueryOptions<FootStatus, HikeError<null>>, 'queryKey' | 'queryFn'>
) =>
  useQuery({
    queryKey: ['clinicalFootStatus', footId],
    queryFn: () => getClinicalFootStatus(footId),
    ...queryOptions
  });
