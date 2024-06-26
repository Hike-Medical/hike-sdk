import { UseQueryOptions, useQuery } from '@tanstack/react-query';
import { getPinStatus } from '../../api/pin.service';
import { ResponseError } from '../../errors/ResponseError';

export const useGetPinStatus = (
  options?: Omit<UseQueryOptions<boolean, ResponseError<null>>, 'queryKey' | 'queryFn'>
) => {
  return useQuery({
    queryKey: ['pinStatus'],
    queryFn: async () => await getPinStatus(),
    ...options
  });
};
