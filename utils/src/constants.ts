import type { PaginationState } from '@hike/types';

export const Constants = {
  AUTH_COOKIE_NAME: 'hike.session-token',
  MIN_PIN_LENGTH: 8,
  COMPANY_INVITATION_EXPIRATION: 14 * 24 * 60 * 60 * 1000, // 14 days
  DEFAULT_QUERY_LIMIT: 1000,
  DEFAULT_PAGINATION: {
    pageIndex: 0,
    pageSize: 25,
    limit: 10
  } satisfies PaginationState
} as const;
