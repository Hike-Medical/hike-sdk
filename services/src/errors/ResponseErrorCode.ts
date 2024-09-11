import { isAxiosError } from 'axios';

export enum ResponseErrorCode {
  UNKNOWN_ERROR = 'UNKNOWN_ERROR',
  INCOMPLETE_EVALUATION = 'INCOMPLETE_EVALUATION'
}

/**
 * Extracts an error code from an unknown error object.
 */
export const toErrorCode = (error: unknown): ResponseErrorCode => {
  const isValid = (errorCode: string): errorCode is ResponseErrorCode =>
    Object.values(ResponseErrorCode).includes(errorCode as ResponseErrorCode);

  if (
    typeof error === 'object' &&
    error !== null &&
    'errorCode' in error &&
    typeof error.errorCode === 'string' &&
    isValid(error.errorCode)
  ) {
    return error.errorCode;
  }

  if (
    isAxiosError(error) &&
    error.response &&
    'data' in error.response &&
    'errorCode' in error.response.data &&
    typeof error.response.data.errorCode === 'string' &&
    isValid(error.response.data.errorCode)
  ) {
    return error.response.data.errorCode;
  }

  return ResponseErrorCode.UNKNOWN_ERROR;
};
