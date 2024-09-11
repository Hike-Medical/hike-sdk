import { isAxiosError } from 'axios';
import { ResponseErrorCode, toErrorCode } from './ResponseErrorCode';
import { toErrorMessage } from './toErrorMessage';

/**
 * Class representing a response error with status and data.
 */
export class ResponseError<T> extends Error {
  constructor(
    message: string,
    public statusCode: number,
    public data: T,
    public errorCode?: ResponseErrorCode
  ) {
    super(message);
  }
}

/**
 * Converts an unknown error to a `ResponseError` instance.
 */
export const toResponseError = (error: unknown) => {
  const message = toErrorMessage(error);
  const errorCode = toErrorCode(error);

  if (isAxiosError(error) && error.response) {
    return new ResponseError(message, error.response.status, error.response.data, errorCode);
  }

  // Check if the error is an instance of HttpException
  if (
    typeof error === 'object' &&
    error !== null &&
    'getStatus' in error &&
    typeof error.getStatus === 'function' &&
    'getResponse' in error &&
    typeof error.getResponse === 'function'
  ) {
    return new ResponseError(message, error.getStatus(), error.getResponse(), errorCode);
  }

  return new ResponseError(message, 500, null, errorCode);
};
