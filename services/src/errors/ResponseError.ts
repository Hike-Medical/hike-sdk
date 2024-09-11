import { isAxiosError } from 'axios';
import { toErrorMessage } from './toErrorMessage';

/**
 * Class representing a response error with status and data.
 */
export class ResponseError<T> extends Error {
  statusCode: number;
  data: T;

  constructor(message: string, statusCode: number, data: T) {
    super(message);
    this.statusCode = statusCode;
    this.data = data;
  }
}

/**
 * Converts an unknown error to a `ResponseError` instance.
 */
export const toResponseError = (error: unknown) => {
  if (
    typeof error === 'object' &&
    error !== null &&
    'message' in error &&
    typeof error.message === 'string' &&
    'statusCode' in error &&
    typeof error.statusCode === 'number' &&
    'error' in error
  ) {
    return new ResponseError(error.message, error.statusCode, error.error);
  }

  const message = toErrorMessage(error);

  if (isAxiosError(error) && error.response) {
    return new ResponseError(message, error.response.status, error.response.data);
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
    return new ResponseError(message, error.getStatus(), error.getResponse());
  }

  return new ResponseError(message, 500, null);
};
