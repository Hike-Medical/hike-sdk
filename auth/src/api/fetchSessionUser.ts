import type { AuthUser, HikeConfig } from '@hike/types';
import { HikeError, HikeErrorCode } from '@hike/types';
import { generateBaseUrls } from '@hike/utils';

/**
 * Fetches the session information from the authenticated user's token.
 * Uses `fetch` since supported in all environments, i.e. Edge, Node, Browser, etc.
 */
export const fetchSessionUser = async (
  token: string | null,
  config: Pick<HikeConfig, 'appEnv' | 'appId'>
): Promise<AuthUser> => {
  if (!token) {
    throw new HikeError({
      message: 'Token not found',
      statusCode: 401,
      errorCode: HikeErrorCode.ERR_TOKEN_INVALID
    });
  }

  const { baseApiUrl } = generateBaseUrls(config);

  const response = await fetch(`${baseApiUrl}/auth/session`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: 'no-store'
  });

  if (!response.ok) {
    throw new HikeError({
      message: 'Session not found',
      statusCode: 401,
      errorCode: HikeErrorCode.ERR_DATA_NOT_FOUND
    });
  }

  return await response.json();
};
