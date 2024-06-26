import { FootStatus } from '@hike/types';
import { UseQueryOptions, useQuery } from '@tanstack/react-query';
import { getClinicalFootStatus } from '../../api/foot.service';
import { ResponseError } from '../../errors/ResponseError';

export const useGetFootStatus = (
  footId: string,
  queryOptions?: Omit<UseQueryOptions<FootStatus, ResponseError<null>>, 'queryKey' | 'queryFn'>
) => {
  return useQuery({
    queryKey: ['clinicalFootStatus', footId],
    queryFn: () => getClinicalFootStatus(footId),
    ...queryOptions
  });
};
