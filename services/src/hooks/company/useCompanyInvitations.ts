import type { AccountVerification, FindCompanyInvitationsParams, PagedResponse } from '@hike/types';
import { QueryKey, UseQueryOptions, useQuery } from '@tanstack/react-query';
import { findInvitations } from '../../api/company.service';
import { HikeError } from '../../errors/HikeError';

export interface UseCompanyInvitationsOptions
  extends Omit<
    UseQueryOptions<PagedResponse<Omit<AccountVerification, 'token'>[]>, HikeError<null>>,
    'queryKey' | 'queryFn'
  > {
  params?: FindCompanyInvitationsParams;
  queryKey?: QueryKey;
}

export const useCompanyInvitations = ({ params, queryKey = [], ...options }: UseCompanyInvitationsOptions = {}) =>
  useQuery({
    queryKey: ['company-invitations', params, queryKey],
    queryFn: async () => await findInvitations(params),
    ...options
  });
