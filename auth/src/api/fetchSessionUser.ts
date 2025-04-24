import { AuthUser, HikeConfig } from '@hike/types';
import { generateBaseUrls } from '@hike/utils';
import { AuthError } from '../errors/AuthError';
import { AuthErrorCode } from '../errors/AuthErrorCode';

/**
 * Fetches the session information from the authenticated user's token.
 * Uses `fetch` since supported in all environments, i.e. Edge, Node, Browser, etc.
 */
export const fetchSessionUser = async (
  token: string | null,
  config: Pick<HikeConfig, 'appEnv' | 'appId'>
): Promise<AuthUser> => {
  if (!token) {
    throw new AuthError({
      message: 'Token not found',
      statusCode: 401,
      errorCode: AuthErrorCode.ERR_TOKEN_INVALID
    });
  }

  const { baseApiUrl } = generateBaseUrls(config);

  const response = await fetch(`${baseApiUrl}/auth/session`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: 'no-store'
  });

  if (!response.ok) {
    throw new AuthError({ message: 'Session not found', statusCode: 401 });
  }

  return await response.json();
};
