import { findInvitations } from '@hike/services';
import type { AccountVerification, FindInvitationsParams, PagedResponse } from '@hike/types';
import { HikeError } from '@hike/types';
import { QueryKey, UseQueryOptions, useQuery } from '@tanstack/react-query';

interface UseInvitationsOptions
  extends Omit<
    UseQueryOptions<PagedResponse<Omit<AccountVerification, 'token'>[]>, HikeError<null>>,
    'queryKey' | 'queryFn'
  > {
  params?: FindInvitationsParams;
  queryKey?: QueryKey;
}

export const useInvitations = ({ params, queryKey = [], ...options }: UseInvitationsOptions = {}) =>
  useQuery({
    queryKey: ['invitations', params, queryKey],
    queryFn: async () => await findInvitations(params),
    ...options
  });
