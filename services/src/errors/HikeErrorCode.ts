import { isString } from '@hike/utils';
import { isAxiosError } from 'axios';

export enum HikeErrorCode {
  // Generic errors
  ERR_UNKNOWN = 'ERR_UNKNOWN',

  // Data errors
  ERR_DATA_NOT_FOUND = 'ERR_DATA_NOT_FOUND',
  ERR_DATA_CONFLICT = 'ERR_DATA_CONFLICT',
  ERR_DATA_INVALID = 'ERR_DATA_INVALID',

  // Workbench errors
  ERR_WORKBENCH_ALREADY_PROCESSING = 'ERR_WORKBENCH_ALREADY_PROCESSING',

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
