import { UseQueryOptions, useQuery } from '@tanstack/react-query';
import { getIsCompanyVoluntary } from '../../api/auth.service';
import { HikeError } from '../../errors/HikeError';

export const useGetIsCompanyVoluntary = (
  options?: Omit<UseQueryOptions<boolean, HikeError<null>>, 'queryKey' | 'queryFn'>
) =>
  useQuery({
    queryKey: ['isCompanyVoluntary'],
    queryFn: async () => await getIsCompanyVoluntary(),
    ...options
  });
