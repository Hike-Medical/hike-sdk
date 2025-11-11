export interface StediError {
  code?: string;
  description?: string;
  message?: string;
  followupAction?: string;
}

/**
 * Formatted Stedi error with actionable information
 */
export interface FormattedStediError {
  code: string;
  title: string;
  description: string;
  action: string;
  resolutions: string[];
  retryable: boolean;
  rawError?: unknown;
}
