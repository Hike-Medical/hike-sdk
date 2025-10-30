import { getPylonEmailHash } from '@hike/services';
import { HikeError, PylonEmailHashResponse } from '@hike/types';
import { QueryKey, UseQueryOptions, useQuery } from '@tanstack/react-query';

interface UsePylonEmailHashOptions
  extends Omit<UseQueryOptions<PylonEmailHashResponse, HikeError<null>>, 'queryKey' | 'queryFn'> {
  queryKey?: QueryKey;
}

/**
 * Hook to fetch the Pylon identity verification email hash for the authenticated user.
 * @see https://docs.usepylon.com/pylon-docs/chat-widget/identity-verification
 */
export const usePylonEmailHash = ({ queryKey = [], ...options }: UsePylonEmailHashOptions = {}) =>
  useQuery({
    queryKey: ['pylon', 'email-hash', queryKey],
    queryFn: async () => await getPylonEmailHash(),
    ...options
  });

