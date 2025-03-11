import { backendApi } from '../utils/backendApi';

/**
 * Track a click using the identifier.
 */
export const trackClick = async (id: string): Promise<void> => {
  const baseUrl = backendApi.defaults.baseURL; // Must be previously set via `configureServices`
  await fetch(`${baseUrl}/webhook/track-click/${id}`, { method: 'POST' });
};
