import type { PaginationState } from '@hike/types';

export const Constants = {
  AUTH_COOKIE_NAME: 'hike.session-token',
  DEFAULT_QUERY_LIMIT: 1000,
  DEFAULT_PAGINATION: {
    pageIndex: 0,
    pageSize: 25
  } satisfies PaginationState
} as const;
