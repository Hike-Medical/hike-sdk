import { exportNotificationHistory } from '@hike/services';
import { GetNotificationHistoryParams, HikeError } from '@hike/types';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';

interface ExportNotificationHistoryParams {
  notificationId: string;
  params?: GetNotificationHistoryParams;
}

export const useExportNotificationHistory = (
  options?: UseMutationOptions<Blob, HikeError<null>, ExportNotificationHistoryParams>
) =>
  useMutation({
    mutationKey: ['exportNotificationHistory'],
    mutationFn: async ({ notificationId, params }) => await exportNotificationHistory(notificationId, params),
    ...options
  });
