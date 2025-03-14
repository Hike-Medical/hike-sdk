import { UseQueryOptions, useQuery } from '@tanstack/react-query';
import { getPinStatus } from '../../api/pin.service';
import { HikeError } from '../../errors/HikeError';

export const useGetPinStatus = (options?: Omit<UseQueryOptions<boolean, HikeError<null>>, 'queryKey' | 'queryFn'>) =>
  useQuery({
    queryKey: ['pinStatus'],
    queryFn: async () => await getPinStatus(),
    ...options
  });
