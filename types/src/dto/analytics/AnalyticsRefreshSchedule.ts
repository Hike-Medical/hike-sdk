/**
 * Response from the analytics refresh schedule endpoint.
 * Tracks when analytics data was last refreshed and when the next refresh is scheduled.
 */
export interface AnalyticsRefreshSchedule {
  /** ISO timestamp of the last data export/refresh */
  lastRefresh: string | null;
  /** ISO timestamp of the next scheduled refresh */
  nextRefresh: string | null;
  /** Current status of the refresh process */
  status: 'initialized' | 'completed' | 'partial' | 'error' | 'not_configured' | 'no_data';
  /** ISO timestamp of the last materialized view refresh */
  lastViewRefresh?: string | null;
  /** Status of the last view refresh */
  viewRefreshStatus?: 'completed' | 'partial';
  /** Number of rows exported per table */
  exportedRows?: Record<string, number>;
}
