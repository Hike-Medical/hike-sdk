import { AuthUser } from '@hike/types';
import { HikeError } from '../errors/HikeError';
import { HikeErrorCode } from '../errors/HikeErrorCode';
import { backendApi } from '../utils/backendApi';

/**
 * Fetches the session information from the authenticated user's token.
 * Uses `fetch` since supported in all environments, i.e. Edge, Node, Browser, etc.
 */
export const fetchSessionUser = async (token: string | null): Promise<AuthUser> => {
  // Must be previously set via `configureServices`
  const baseUrl = backendApi.defaults.baseURL;

  if (!baseUrl) {
    throw new HikeError({
      message: 'Base URL not set for backend services.',
      statusCode: 500
    });
  }

  if (!token) {
    throw new HikeError({
      message: 'Token not found',
      statusCode: 401,
      errorCode: HikeErrorCode.ERR_TOKEN_INVALID
    });
  }

  const response = await fetch(`${baseUrl}/auth/session`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: 'no-store'
  });

  return await response.json();
};
