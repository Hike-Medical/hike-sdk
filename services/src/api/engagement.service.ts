import type {
  ExportNotificationEnrollAnalyticsParams,
  NotificationEnrollAnalyticsParams,
  NotificationEnrollAnalyticsRow,
  NotificationEnrollAnalyticsStats,
  PagedResponse
} from '@hike/types';
import { toHikeError } from '../errors/toHikeError';
import { backendApi } from '../utils/backendApi';

export const fetchEngagementAnalyticsStats = async (): Promise<NotificationEnrollAnalyticsStats> => {
  try {
    const response = await backendApi.get('engagement/analytics/stats');
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

export const fetchEngagementAnalytics = async (
  params: NotificationEnrollAnalyticsParams
): Promise<PagedResponse<NotificationEnrollAnalyticsRow[]>> => {
  try {
    const response = await backendApi.get('engagement/analytics/patients', { params });
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

export const exportEngagementAnalytics = async (params: ExportNotificationEnrollAnalyticsParams): Promise<Blob> => {
  try {
    const response = await backendApi.post('engagement/analytics/export', params, {
      responseType: 'arraybuffer'
    });
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

