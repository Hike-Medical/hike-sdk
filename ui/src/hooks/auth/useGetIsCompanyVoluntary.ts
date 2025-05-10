import { HikeError, getIsCompanyVoluntary } from '@hike/services';
import { UseQueryOptions, useQuery } from '@tanstack/react-query';

export const useGetIsCompanyVoluntary = (
  options?: Omit<UseQueryOptions<boolean, HikeError<null>>, 'queryKey' | 'queryFn'>
) =>
  useQuery({
    queryKey: ['isCompanyVoluntary'],
    queryFn: async () => await getIsCompanyVoluntary(),
    ...options
  });
