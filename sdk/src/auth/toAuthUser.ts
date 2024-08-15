import { AuthUser } from '@hike/types';
import { isAuthUser } from '@hike/utils';
import { JWTPayload } from 'jose';

export const toAuthUser = (decoded: JWTPayload): AuthUser | null => {
  const user = {
    id: decoded.id,
    companies: decoded.companies,
    facilities: decoded.facilities,
    permissions: decoded.permissions,
    slugs: decoded.slugs,
    expiresAt: decoded.exp ? new Date(decoded.exp * 1000) : undefined
  };

  return isAuthUser(user) ? user : null;
};
