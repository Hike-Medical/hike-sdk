import { UseQueryOptions, useQuery } from '@tanstack/react-query';
import { getPinStatus } from '../../api/pin.service';
import { HikeError } from '../../errors/HikeError';

export const useGetPinStatus = (options?: Omit<UseQueryOptions<boolean, HikeError<null>>, 'queryKey' | 'queryFn'>) => {
  return useQuery({
    queryKey: ['pinStatus'],
    queryFn: async () => await getPinStatus(),
    ...options
  });
};
