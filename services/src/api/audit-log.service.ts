import type { AuditLog, GetAuditLogsParams, PagedResponse } from '@hike/types';
import { addHeaders } from '@hike/utils';
import { toHikeError } from '../errors/toHikeError';
import { backendApi } from '../utils/backendApi';

export const fetchAuditLogs = async (
  companyIds?: string[],
  params?: GetAuditLogsParams
): Promise<PagedResponse<AuditLog[]>> => {
  try {
    const response = await backendApi.get('audit-logs/company', {
      headers: addHeaders(companyIds),
      params
    });
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};
