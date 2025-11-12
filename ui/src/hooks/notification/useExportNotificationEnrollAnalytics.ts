import { exportEngagementAnalytics } from '@hike/services';
import { ExportNotificationEnrollAnalyticsParams, HikeError } from '@hike/types';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';

export const useExportNotificationEnrollAnalytics = (
  options?: UseMutationOptions<Blob, HikeError<null>, ExportNotificationEnrollAnalyticsParams>
) =>
  useMutation({
    mutationKey: ['exportEngagementAnalytics'],
    mutationFn: async (params) => await exportEngagementAnalytics(params),
    ...options
  });
