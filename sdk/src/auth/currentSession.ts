import { backendApi } from '@hike/services';
import { AuthUser } from '@hike/types';
import { isAuthUser } from '@hike/utils';
import { errors } from 'jose';
import { BaseRequestWithCookies, extractToken } from './extractToken';
import { verifyToken } from './verifyToken';

/**
 * Retrieves the current session information from the authenticated user's token.
 *
 * @param request - The request object containing the token.
 * @param publicKey - The public key used to verify the token.
 * @returns The authenticated user's session information, or throws an error if the token is invalid.
 */
export const currentSession = async (request: BaseRequestWithCookies, publicKey: string): Promise<AuthUser> => {
  const token = extractToken(request);
  await verifyToken(token, publicKey);

  const baseUrl = backendApi.defaults.baseURL; // TODO: Handle more robustly

  if (!baseUrl) {
    throw new Error('Base URL not set');
  }

  // Use `fetch` since supported in all environments, i.e. Edge, Node, Browser, etc.
  const session = await fetch(`${baseUrl}/auth/session`, {
    headers: { Authorization: `Bearer ${token}` }
  }).then((res) => {
    const user = res.json();
    return isAuthUser(user) ? user : null;
  });

  console.log('from sdk', session);

  if (!session) {
    throw new errors.JWTInvalid('Token type invalid');
  }

  return session;
};
