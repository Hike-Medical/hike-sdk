import { HikeConfig, TrackNotificationAction } from '@hike/types';
import { generateBaseUrls } from '@hike/utils';

/**
 * Track a click using the notification history identifier.
 *
 * @note This helper is used in the frontend middleware which
 * has restrictions on timing and what can be imported.
 */
export const trackNotification = async (
  id: string,
  action: TrackNotificationAction,
  config: Pick<HikeConfig, 'appEnv' | 'appId'>
): Promise<void> => {
  const { baseApiUrl } = generateBaseUrls(config);

  try {
    await fetch(`${baseApiUrl}/webhook/track-notification/${id}/${action}`, { method: 'POST' });
  } catch {
    // Silence error for non-critical request
  }
};
