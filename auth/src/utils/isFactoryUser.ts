import type { AuthUser } from '@hike/types';

/**
 * Determines if a user is a factory user.
 * Factory users are identified by having permissions for the Hike company,
 * and should only be allowed to access the Hike company in the admin interface.
 */
export const isFactoryUser = (user: AuthUser | null): boolean => {
  if (!user) {
    return false;
  }

  const hikeCompanyId = Object.entries(user.slugs).find(([, slug]) => slug === 'hike')?.[0];
  return hikeCompanyId ? Object.keys(user.permissions[hikeCompanyId] ?? {}).length > 0 : false;
};
