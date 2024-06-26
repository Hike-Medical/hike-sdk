import { FootStatus } from '@hike/types';
import { UseQueryOptions, useQuery } from '@tanstack/react-query';
import { getClinicalFootStatus } from '../../api/foot.service';

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
