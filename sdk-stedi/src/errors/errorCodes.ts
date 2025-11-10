/**
 * Error handling utilities for Stedi Healthcare API
 * Based on official documentation: https://www.stedi.com/docs/healthcare/eligibility-troubleshooting
 */

export interface ErrorCodeInfo {
  code: string;
  title: string;
  description: string;
  category:
    | 'payer_connectivity'
    | 'patient_not_found'
    | 'provider_issue'
    | 'data_mismatch'
    | 'system_error'
    | 'unknown';
  retryable: boolean;
  resolutions: string[];
}

/**
 * AAA (Reject Reason) Error Codes
 * These are standard X12 EDI error codes returned by payers
 * Source: https://www.stedi.com/docs/healthcare/eligibility-troubleshooting
 */
export const AAA_ERROR_CODES: Record<string, ErrorCodeInfo> = {
  '42': {
    code: '42',
    title: 'Unable to Respond at Current Time',
    description: 'Payer system is temporarily unavailable, undergoing maintenance, or throttling requests.',
    category: 'payer_connectivity',
    retryable: true,
    resolutions: [
      'Wait 5-10 minutes and try again',
      'Implement exponential backoff retry strategy',
      'Check Stedi status page for known payer outages',
      'If persistent beyond 8 hours, contact payer support',
      'Consider batch eligibility checks for automatic retries'
    ]
  },
  '43': {
    code: '43',
    title: 'Invalid/Missing Provider Identification',
    description: 'Provider NPI is not registered with the payer, is incorrect, or requires a payer-specific agreement.',
    category: 'provider_issue',
    retryable: false,
    resolutions: [
      'Verify NPI is correct (10 digits, no spaces or dashes)',
      'Check if provider is in-network with this payer',
      'Confirm provider has active contract with payer',
      'Verify provider is credentialed with payer',
      "Check if provider needs to enroll in payer's network",
      'Contact payer to verify provider enrollment status'
    ]
  },
  '65': {
    code: '65',
    title: 'Invalid/Missing Patient Name',
    description: "Patient name doesn't match payer records or is missing.",
    category: 'data_mismatch',
    retryable: false,
    resolutions: [
      'Verify name exactly as shown on insurance card',
      'Try full legal name instead of nickname (Robert vs Bob)',
      'Replace accented characters (é → e, ñ → n)',
      'Try with and without middle initial',
      'For compound names, try different variations',
      'Check for hyphenated last names (try with/without hyphen)',
      'If recent name change (marriage), try previous name'
    ]
  },
  '67': {
    code: '67',
    title: 'Patient Not Found',
    description: 'Patient record not found in payer system.',
    category: 'patient_not_found',
    retryable: false,
    resolutions: [
      'Verify patient has active coverage with this payer',
      'Check if patient is a dependent (try subscriber info)',
      "Confirm coverage hasn't been terminated",
      'Try different combinations of demographic data',
      'Send fewer data elements to avoid mismatch',
      'Ask patient to verify insurance information'
    ]
  },
  '72': {
    code: '72',
    title: 'Invalid/Missing Subscriber/Insured ID',
    description: "Member ID format is incorrect, has typos, or doesn't match payer requirements.",
    category: 'data_mismatch',
    retryable: false,
    resolutions: [
      'Verify member ID exactly as shown on insurance card',
      'Check for leading zeros or special characters',
      'Try without dashes, spaces, or special characters',
      'Try with dashes or spaces if initially omitted',
      'Confirm ID matches the correct payer',
      'Some patients have multiple IDs - try alternate ID',
      "Verify ID hasn't changed due to policy renewal"
    ]
  },
  '73': {
    code: '73',
    title: 'Invalid/Missing Subscriber/Insured Name',
    description: "Subscriber name doesn't match payer records exactly.",
    category: 'data_mismatch',
    retryable: false,
    resolutions: [
      'Verify name exactly as shown on insurance card',
      'Check for middle initials (John A. Smith vs John Smith)',
      'Try with and without suffixes (Jr., Sr., III, IV)',
      'Use legal name instead of preferred name (William vs Bill)',
      'Try different spellings for compound names',
      'Replace accented or special characters',
      'If recent name change, try previous legal name'
    ]
  },
  '75': {
    code: '75',
    title: 'Subscriber/Insured Not Found',
    description: 'Subscriber not found in payer system - may indicate terminated coverage or wrong payer.',
    category: 'patient_not_found',
    retryable: false,
    resolutions: [
      'Verify patient has active coverage with this payer',
      'Check if coverage has been terminated or expired',
      'Confirm patient is the subscriber (not dependent)',
      'Try different trading partner ID for same payer',
      'Verify payer information is current',
      'Ask patient to contact insurance company',
      'Request updated insurance card from patient'
    ]
  },
  '79': {
    code: '79',
    title: 'Invalid Participant Identification',
    description: 'General identification error - multiple data points may be incorrect, or payer connectivity issue.',
    category: 'system_error',
    retryable: true, // Can indicate connectivity issues
    resolutions: [
      'First, retry with different patient and NPI to isolate issue',
      'If isolated to specific request, verify ALL data fields',
      'Check patient demographics, member ID, and provider NPI',
      'Try with minimal required fields only',
      'If widespread, may be payer connectivity issue - retry',
      'Contact Stedi support if issue persists across multiple requests'
    ]
  },
  '80': {
    code: '80',
    title: 'No Response Received - Transaction Terminated',
    description: "Payer system didn't respond in time - connection timeout or system issue.",
    category: 'payer_connectivity',
    retryable: true,
    resolutions: [
      'Retry immediately - this is usually temporary',
      'Implement automatic retry with exponential backoff',
      'Check for known payer outages',
      'If persistent, may indicate extended payer downtime',
      'Consider using batch eligibility for automatic handling'
    ]
  }
};

/**
 * Get error information for a given AAA error code
 */
export function getErrorInfo(errorCode: string): ErrorCodeInfo {
  const code = errorCode.trim();

  // Check for exact match
  if (AAA_ERROR_CODES[code]) {
    return AAA_ERROR_CODES[code];
  }

  // Check if code is embedded in a longer string (e.g., "AAA42", "Error 42")
  const numericCode = code.match(/\d+/)?.[0];
  if (numericCode && AAA_ERROR_CODES[numericCode]) {
    return AAA_ERROR_CODES[numericCode];
  }

  // Return generic error for unknown codes
  return {
    code: errorCode,
    title: 'Unknown Error',
    description: 'An unrecognized error code was returned by the payer.',
    category: 'unknown',
    retryable: false,
    resolutions: [
      'Review the error description provided by the payer',
      'Verify all request data is correct',
      'Check Stedi documentation for this specific error',
      'Contact Stedi support for assistance'
    ]
  };
}

/**
 * Format error information for display
 */
export function formatErrorForDisplay(error: any): {
  code: string;
  title: string;
  description: string;
  action: string;
  resolutions: string[];
  retryable: boolean;
} {
  // Stedi errors can have 'code' field or be embedded in description
  // Error format: { followupAction: "Resubmission Allowed", code: "42", description: "..." }
  // Or: { followupAction: "...", description: "Unable to Respond at Current Time" }

  let errorCode = error.code || 'UNKNOWN';

  // If no code, try to extract from description
  if (errorCode === 'UNKNOWN' && error.description) {
    // Map common error descriptions to codes
    const descriptionLower = error.description.toLowerCase();
    if (descriptionLower.includes('unable to respond')) errorCode = '42';
    else if (descriptionLower.includes('invalid') && descriptionLower.includes('provider')) errorCode = '43';
    else if (
      descriptionLower.includes('invalid') &&
      descriptionLower.includes('subscriber') &&
      descriptionLower.includes('id')
    )
      errorCode = '72';
    else if (descriptionLower.includes('invalid') && descriptionLower.includes('name')) errorCode = '73';
    else if (descriptionLower.includes('subscriber') && descriptionLower.includes('not found')) errorCode = '75';
    else if (descriptionLower.includes('patient') && descriptionLower.includes('not found')) errorCode = '67';
    else if (descriptionLower.includes('invalid participant')) errorCode = '79';
    else if (descriptionLower.includes('no response')) errorCode = '80';
  }

  const errorInfo = getErrorInfo(errorCode);

  return {
    code: errorInfo.code,
    title: errorInfo.title,
    description: error.description || errorInfo.description,
    action: error.followupAction || (errorInfo.retryable ? 'Resubmission Allowed' : 'Resubmission Not Allowed'),
    resolutions: error.possibleResolutions ? [error.possibleResolutions] : errorInfo.resolutions,
    retryable: errorInfo.retryable
  };
}

/**
 * Determine if an error is retryable based on category and code
 */
export function isRetryableError(errorCode: string): boolean {
  const errorInfo = getErrorInfo(errorCode);
  return errorInfo.retryable;
}

/**
 * Get retry strategy recommendation based on error
 */
export function getRetryStrategy(errorCode: string): {
  shouldRetry: boolean;
  strategy: string;
  maxRetries?: number;
  backoffMinutes?: number[];
} {
  const errorInfo = getErrorInfo(errorCode);

  if (!errorInfo.retryable) {
    return {
      shouldRetry: false,
      strategy: 'DO NOT RETRY - Fix data issues first'
    };
  }

  // Payer connectivity issues
  if (errorInfo.category === 'payer_connectivity') {
    return {
      shouldRetry: true,
      strategy: 'Exponential backoff for up to 8 hours',
      maxRetries: 10,
      backoffMinutes: [1, 2, 5, 10, 15, 30, 30, 30, 30, 30] // Up to 8+ hours total
    };
  }

  // Error 79 can be connectivity or data issue
  if (errorCode === '79') {
    return {
      shouldRetry: true,
      strategy:
        'First retry with different patient/NPI to isolate issue. If isolated, fix data. If widespread, treat as connectivity issue.',
      maxRetries: 3
    };
  }

  return {
    shouldRetry: false,
    strategy: 'Unknown retry pattern'
  };
}

/**
 * Categorize errors by type for batch analysis
 */
export function categorizeErrors(errors: any[]): {
  connectivity: any[];
  dataIssues: any[];
  notFound: any[];
  providerIssues: any[];
  unknown: any[];
} {
  const categorized = {
    connectivity: [] as any[],
    dataIssues: [] as any[],
    notFound: [] as any[],
    providerIssues: [] as any[],
    unknown: [] as any[]
  };

  errors.forEach((error) => {
    const errorCode = error.followupAction || error.code || 'UNKNOWN';
    const errorInfo = getErrorInfo(errorCode);

    switch (errorInfo.category) {
      case 'payer_connectivity':
      case 'system_error':
        categorized.connectivity.push(error);
        break;
      case 'data_mismatch':
        categorized.dataIssues.push(error);
        break;
      case 'patient_not_found':
        categorized.notFound.push(error);
        break;
      case 'provider_issue':
        categorized.providerIssues.push(error);
        break;
      default:
        categorized.unknown.push(error);
    }
  });

  return categorized;
}
