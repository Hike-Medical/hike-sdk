/**
 * Analytics endpoint names for the generic analytics API.
 * Use this const for type-safe endpoint references throughout the codebase.
 *
 * @example
 * import { ANALYTICS_ENDPOINT_NAME } from '@hike/types';
 * const endpoint = ANALYTICS_ENDPOINT_NAME.TOTAL_ORDERS_BY_COMPANY;
 */
export const ANALYTICS_ENDPOINT_NAME = {
  TOTAL_ORDERS_BY_COMPANY: 'total-orders-by-company',
  COMPUTE_ORDER_STATUSES_HOURLY: 'compute-order-statuses-hourly'
} as const;

/**
 * Type representing valid analytics endpoint names.
 */
export type AnalyticsEndpointName = (typeof ANALYTICS_ENDPOINT_NAME)[keyof typeof ANALYTICS_ENDPOINT_NAME];

/**
 * Request parameters for analytics endpoints with date range support.
 */
export interface AnalyticsDateRangeParams {
  /** Start date for the analytics query (ISO 8601 format) */
  startDate: string;
  /** End date for the analytics query (ISO 8601 format) */
  endDate: string;
  /** Optional comparison period start date (ISO 8601 format) */
  comparisonStartDate?: string;
  /** Optional comparison period end date (ISO 8601 format) */
  comparisonEndDate?: string;
}

/**
 * Response structure for analytics metadata endpoint.
 * Maps endpoint names to their last updated timestamps.
 */
export interface AnalyticsMetadataByEndpointsResponse {
  [endpoint: string]: {
    lastUpdatedAt: string | null;
  };
}
