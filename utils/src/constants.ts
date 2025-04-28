import type { CompanyTheme, PaginationState } from '@hike/types';

export const Constants = {
  AUTH_COOKIE_NAME: 'hike.session-token',
  MIN_PIN_LENGTH: 8,
  COMPANY_INVITATION_EXPIRATION_MINUTES: 14 * 24 * 60, // 14 days
  DEFAULT_QUERY_LIMIT: 1000,
  DEFAULT_PAGINATION: {
    pageIndex: 0,
    pageSize: 25,
    limit: 10
  } satisfies PaginationState,
  TRACKING: {
    CLICK_PARAM: 'xcid',
    OPEN_PARAM: 'xoid'
  },
  NETWORK_SPEED_FILE_SIZE_KB: 100,
  NETWORK_SPEED_MIN_MBPS: 3,
  DEFAULT_COMPANY_THEME: '2025-apr' satisfies CompanyTheme,
  i18n: {
    DEFAULT_LOCALE: 'en',
    LOCALE_COOKIE_NAME: 'locale'
  }
} as const;
