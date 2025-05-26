import type { AuditLog } from '@hike/types';
import { addHeaders } from '@hike/utils';
import { toHikeError } from '../errors/toHikeError';
import { backendApi } from '../utils/backendApi';

export const fetchAuditLogs = async (companyIds?: string[]): Promise<AuditLog[]> => {
  try {
    const response = await backendApi.get('audit-logs/company', {
      headers: addHeaders(companyIds)
    });
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};
