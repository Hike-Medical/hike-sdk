import { AuthUser } from '@hike/types';

/**
 * Type guard for determining whether a value is an authenticated user.
 */
export const isAuthUser = (value: unknown): value is AuthUser =>
  typeof value === 'object' &&
  value !== null &&
  'id' in value &&
  typeof value.id === 'string' &&
  'companies' in value &&
  typeof value.companies === 'object' &&
  value.companies !== null &&
  Object.values(value.companies).every((role) => typeof role === 'string' || role == null) &&
  'expiresAt' in value &&
  typeof value.companies === 'object';
