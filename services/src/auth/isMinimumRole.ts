import { Role } from '@hike/types';

const sortedRoles: Role[] = ['ADMIN', 'EDITOR', 'VIEWER', 'PATIENT'];

/**
 * Determines if a given role has sufficient access for a company.
 * @param role The role to check.
 * @param minimumRole The minimum role required for access.
 * @returns True if the role has sufficient access, false otherwise.
 */
export const isMinimumRole = (role: Role | null | undefined, minimumRole: Role) => {
  if (!role) {
    return false;
  }

  return sortedRoles.indexOf(role) <= sortedRoles.indexOf(minimumRole); // ADMIN = 0
};
