import { isString } from '@hike/utils';
import { isAxiosError } from 'axios';

export enum HikeErrorCode {
  // General errors
  ERR_UNKNOWN = 'ERR_UNKNOWN',
  ERR_EMAIL_MAX_LIMIT = 'ERR_EMAIL_MAX_LIMIT',

  // Data errors
  ERR_DATA_NOT_FOUND = 'ERR_DATA_NOT_FOUND',
  ERR_DATA_CONFLICT = 'ERR_DATA_CONFLICT',
  ERR_DATA_INVALID = 'ERR_DATA_INVALID',

  // Workbench errors
  ERR_WORKBENCH_ALREADY_PROCESSING = 'ERR_WORKBENCH_ALREADY_PROCESSING',

  // User errors
  ERR_USER_CLINICIAN_NOT_FOUND = 'ERR_USER_CLINICIAN_NOT_FOUND',
  ERR_USER_PATIENT_NOT_FOUND = 'ERR_USER_PATIENT_NOT_FOUND',
  ERR_USER_PATIENT_FORBIDDEN = 'ERR_USER_PATIENT_FORBIDDEN',
  ERR_USER_CLINICIAN_ALREADY_EXISTS = 'ERR_USER_CLINICIAN_ALREADY_EXISTS',
  ERR_USER_TERMS_NOT_ACCEPTED = 'ERR_USER_TERMS_NOT_ACCEPTED',

  // Account errors
  ERR_ACCOUNT_RECOVERY_TYPE_INVALID = 'ERR_ACCOUNT_RECOVERY_TYPE_INVALID',

  // Company errors
  ERR_COMPANY_USER_NOT_ASSOCIATED = 'ERR_COMPANY_USER_NOT_ASSOCIATED',
  ERR_COMPANY_INVITATION_INVALID = 'ERR_COMPANY_INVITATION_INVALID',

  // Token errors
  ERR_TOKEN_INVALID = 'ERR_TOKEN_INVALID'
}

/**
 * Checks if an error code is valid.
 */
export const isValidErrorCode = (errorCode: unknown): errorCode is HikeErrorCode =>
  isString(errorCode) && Object.values(HikeErrorCode).includes(errorCode as HikeErrorCode);

/**
 * Extracts an error code from an unknown error object.
 */
export const toErrorCode = (error: unknown): HikeErrorCode => {
  if (
    typeof error === 'object' &&
    error !== null &&
    'errorCode' in error &&
    typeof error.errorCode === 'string' &&
    isValidErrorCode(error.errorCode)
  ) {
    return error.errorCode;
  }

  if (
    isAxiosError(error) &&
    error.response &&
    'data' in error.response &&
    'errorCode' in error.response.data &&
    typeof error.response.data.errorCode === 'string' &&
    isValidErrorCode(error.response.data.errorCode)
  ) {
    return error.response.data.errorCode;
  }

  return HikeErrorCode.ERR_UNKNOWN;
};
