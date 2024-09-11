import { isString } from '@hike/utils';
import { isAxiosError } from 'axios';

export enum ResponseErrorCode {
  UNKNOWN_ERROR = 'UNKNOWN_ERROR',
  INCOMPLETE_EVALUATION = 'INCOMPLETE_EVALUATION',
  ORDER_ALREADY_PROCESSING = 'ORDER_ALREADY_PROCESSING',
  NOT_FOUND = 'NOT_FOUND',
  DATA_CONFLICT = 'DATA_CONFLICT',
  DATA_INVALID = 'DATA_INVALID'
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

  return ResponseErrorCode.UNKNOWN_ERROR;
};
