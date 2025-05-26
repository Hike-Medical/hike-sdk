import { fetchAuditLogs } from '@hike/services';
import type { AuditLog, HikeError } from '@hike/types';
import { QueryKey, UseQueryOptions, useQuery } from '@tanstack/react-query';

interface UseAuditLogsOptions extends Omit<UseQueryOptions<AuditLog[], HikeError<null>>, 'queryKey' | 'queryFn'> {
  companyIds?: string[];
  queryKey?: QueryKey;
}

export const useAuditLogs = ({ companyIds, queryKey = [], ...options }: UseAuditLogsOptions) =>
  useQuery({
    queryKey: ['auditLogs', companyIds, queryKey],
    queryFn: async () => await fetchAuditLogs(companyIds),
    ...options
  });
