import { fetchAuditLogs } from '@hike/services';
import type { AuditLog, GetAuditLogsParams, HikeError, PagedResponse } from '@hike/types';
import { QueryKey, UseQueryOptions, useQuery } from '@tanstack/react-query';

interface UseAuditLogsOptions
  extends Omit<UseQueryOptions<PagedResponse<AuditLog[]>, HikeError<null>>, 'queryKey' | 'queryFn'> {
  companyIds?: string[];
  params?: GetAuditLogsParams;
  queryKey?: QueryKey;
}

export const useAuditLogs = ({ companyIds, params, queryKey = [], ...options }: UseAuditLogsOptions = {}) =>
  useQuery({
    queryKey: ['auditLogs', companyIds, params, queryKey],
    queryFn: async () => await fetchAuditLogs(companyIds, params),
    ...options
  });
