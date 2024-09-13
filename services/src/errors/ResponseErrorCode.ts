import { isString } from '@hike/utils';
import { isAxiosError } from 'axios';

export enum ResponseErrorCode {
  // Generic errors
  ERR_UNKNOWN = 'ERR_UNKNOWN',

  // Data errors
  ERR_DATA_NOT_FOUND = 'ERR_DATA_NOT_FOUND',
  ERR_DATA_CONFLICT = 'ERR_DATA_CONFLICT',
  ERR_DATA_INVALID = 'ERR_DATA_INVALID',

  // Evaluation errors
  ERR_EVALUATION_INCOMPLETE = 'ERR_EVALUATION_INCOMPLETE',
  ERR_ORDER_ALREADY_PROCESSING = 'ERR_ORDER_ALREADY_PROCESSING',

  // Token errors
  ERR_TOKEN_EXPIRED = 'ERR_TOKEN_EXPIRED'
}

/**
 * Checks if an error code is valid.
 */
export const isValidErrorCode = (errorCode: unknown): errorCode is ResponseErrorCode =>
  isString(errorCode) && Object.values(ResponseErrorCode).includes(errorCode as ResponseErrorCode);

/**
 * Extracts an error code from an unknown error object.
 */
export const toErrorCode = (error: unknown): ResponseErrorCode => {
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

  return ResponseErrorCode.ERR_UNKNOWN;
};
