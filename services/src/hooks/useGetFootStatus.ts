import { UseQueryOptions, useQuery } from '@tanstack/react-query';
import { FootStatus } from '@hike/types';
import { getClinicalFootStatus } from '../api/foot.service';

export const useGetFootStatus = (
  footId: string,
  queryOptions?: Omit<UseQueryOptions<FootStatus>, 'queryKey' | 'queryFn'>
) => {
  return useQuery({
    queryKey: ['clinicalFootStatus', footId],
    queryFn: () => getClinicalFootStatus(footId),
    ...queryOptions
  });
};
