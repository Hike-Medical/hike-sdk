import type { PaginationState } from '@hike/types';

export const Constants = {
  AUTH_COOKIE_NAME: 'hike.session-token',
  MIN_PIN_LENGTH: 8,
  SEND_EMAIL_MAX_LIMIT: 50, // Restricted by Resend service
  COMPANY_INVITATION_EXPIRATION: 7 * 24 * 60 * 60, // 7 days
  DEFAULT_QUERY_LIMIT: 1000,
  DEFAULT_PAGINATION: {
    pageIndex: 0,
    pageSize: 25
  } satisfies PaginationState
} as const;
