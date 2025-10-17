import { fetchAuditLogs } from '@hike/services';
import { AuditLogWithUser, GetAuditLogsParams, HikeError, PagedResponse } from '@hike/types';
import { QueryKey, UseQueryOptions, useQuery } from '@tanstack/react-query';

interface UseAuditLogsOptions
  extends Omit<UseQueryOptions<PagedResponse<AuditLogWithUser[]>, HikeError<null>>, 'queryFn' | 'queryKey'> {
  companyIds?: string[];
  params?: GetAuditLogsParams;
  queryKey?: QueryKey;
}

export const useAuditLogs = ({ companyIds, params, queryKey = [], ...options }: UseAuditLogsOptions = {}) =>
  useQuery<PagedResponse<AuditLogWithUser[]>, HikeError<null>>({
    queryKey: ['useAuditLogs', companyIds, params, queryKey],
    queryFn: async () => await fetchAuditLogs(companyIds, params),
    ...options
  });
