import { AuthUser } from '@hike/types';
import { isAuthUser } from '@hike/utils';
import { HikeError } from '../errors/HikeError';
import { backendApi } from '../utils/backendApi';

/**
 * Fetches the session information from the authenticated user's token.
 * Uses `fetch` since supported in all environments, i.e. Edge, Node, Browser, etc.
 */
export const fetchSession = async (token: string | null): Promise<AuthUser> => {
  // Must be previously set via `configureServices`
  const baseUrl = backendApi.defaults.baseURL;

  if (!baseUrl) {
    throw new HikeError({
      message: 'Base URL not set for backend services.',
      statusCode: 500
    });
  }

  const response = await fetch(`${baseUrl}/auth/session`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const user = await response.json();

  if (!isAuthUser(user)) {
    throw new HikeError({
      message: 'Session not found',
      statusCode: 401
    });
  }

  return user;
};