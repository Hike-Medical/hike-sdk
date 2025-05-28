import { HikeErrorCode, isString } from '@hike/types';
import { isAxiosError } from 'axios';

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
