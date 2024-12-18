import type { AccountVerification, FindInvitationsParams, PagedResponse } from '@hike/types';
import { QueryKey, UseQueryOptions, useQuery } from '@tanstack/react-query';
import { findInvitations } from '../../api/invitation.service';
import { HikeError } from '../../errors/HikeError';

export interface UseInvitationsOptions
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
