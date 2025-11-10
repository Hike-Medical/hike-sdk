import { HikeError, HikeErrorCode } from '@hike/sdk';

import { formatErrorForDisplay, getErrorInfo } from './errorCodes';
import type { FormattedStediError } from './types';

/**
 * Convert a caught error from Stedi API into a HikeError with formatted details
 */
export function fromStediError(error: unknown): HikeError<FormattedStediError[]> {
  const statusCode = getStatusCode(error);
  let formattedErrors: FormattedStediError[] = [];
  let errorCode = HikeErrorCode.ERR_STEDI_API_ERROR;
  let message = 'Medicare eligibility check failed';

  // Check if this is an Axios error with response data
  if (isAxiosError(error) && error.response?.data) {
    const errorData = error.response.data;

    // Extract and format error details from Stedi response
    if (errorData.errors && Array.isArray(errorData.errors) && errorData.errors.length > 0) {
      formattedErrors = errorData.errors.map((e: unknown) => {
        const formatted = formatErrorForDisplay(e);
        return {
          ...formatted,
          rawError: e
        };
      });

      // Determine the appropriate error code based on error category
      const primaryError = formattedErrors[0];
      if (primaryError) {
        const errorInfo = getErrorInfo(primaryError.code);
        const categoryMapping = getCategoryMapping(errorInfo.category);
        errorCode = categoryMapping.code;
        message = `${categoryMapping.prefix}: ${primaryError.title}`;
      }
    } else if (errorData.message) {
      // Handle other API error formats
      formattedErrors = [
        {
          code: errorData.code || 'API_ERROR',
          title: 'API Error',
          description: errorData.message,
          action: 'Review error details',
          resolutions: ['Verify API credentials', 'Check request format', 'Contact Stedi support'],
          retryable: false,
          rawError: errorData
        }
      ];
      message = `API error: ${errorData.message}`;
    }
  }

  // Handle network or other errors
  if (formattedErrors.length === 0) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    formattedErrors = [
      {
        code: 'NETWORK_ERROR',
        title: 'Network or Connection Error',
        description: errorMessage,
        action: 'Retry request',
        resolutions: ['Check network connectivity', 'Verify Stedi API endpoint', 'Check API credentials'],
        retryable: true,
        rawError: error
      }
    ];
    message = `Network error: ${errorMessage}`;
  }

  return new HikeError({
    message,
    statusCode,
    errorCode,
    data: formattedErrors
  });
}

/**
 * Type guard to check if error is an Axios error
 */
function isAxiosError(error: unknown): error is {
  response?: {
    status: number;
    data: {
      errors?: unknown[];
      message?: string;
      code?: string;
    };
  };
} {
  return (
    typeof error === 'object' &&
    error !== null &&
    'response' in error &&
    typeof (error as { response?: unknown }).response === 'object'
  );
}

/**
 * Extract status code from error
 */
function getStatusCode(error: unknown): number {
  if (isAxiosError(error) && error.response?.status) {
    return error.response.status;
  }
  return 500;
}

/**
 * Map error category to HikeErrorCode and message prefix
 */
function getCategoryMapping(category: string): { code: HikeErrorCode; prefix: string } {
  switch (category) {
    case 'payer_connectivity':
      return { code: HikeErrorCode.ERR_STEDI_PAYER_CONNECTIVITY, prefix: 'Payer connectivity issue' };
    case 'patient_not_found':
      return { code: HikeErrorCode.ERR_STEDI_PATIENT_NOT_FOUND, prefix: 'Patient not found' };
    case 'provider_issue':
      return { code: HikeErrorCode.ERR_STEDI_PROVIDER_INVALID, prefix: 'Provider issue' };
    case 'data_mismatch':
      return { code: HikeErrorCode.ERR_STEDI_DATA_MISMATCH, prefix: 'Data mismatch' };
    default:
      return { code: HikeErrorCode.ERR_STEDI_ELIGIBILITY_CHECK_FAILED, prefix: 'Eligibility check failed' };
  }
}
