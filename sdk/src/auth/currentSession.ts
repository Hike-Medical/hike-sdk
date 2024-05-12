import { AuthUser } from '@hike/types';
import { errors } from 'jose';
import { BaseRequestWithCookies, extractToken } from './extractToken';
import { toAuthUser } from './toAuthUser';
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
  const decoded = await verifyToken(token, publicKey);
  const user = toAuthUser(decoded);

  if (!user) {
    throw new errors.JWTInvalid('Token type invalid');
  }

  return user;
};
