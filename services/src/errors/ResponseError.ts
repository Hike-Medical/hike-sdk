import { isAxiosError } from 'axios';
import { ResponseErrorCode, toErrorCode } from './ResponseErrorCode';
import { toErrorMessage } from './toErrorMessage';

/**
 * Class representing a response error with status and data.
 */
export class ResponseError<T> extends Error {
  constructor(
    message: string,
    public readonly statusCode: number,
    public readonly data: T,
    public readonly errorCode?: ResponseErrorCode
  ) {
    super(message);
  }

  /**
   * Initializes a new instance.
   */
  static init<T>({
    message,
    statusCode,
    data,
    errorCode
  }: {
    message: string;
    statusCode: number;
    data?: T;
    errorCode?: ResponseErrorCode;
  }): ResponseError<T> {
    return new ResponseError<T>(message, statusCode, data as T, errorCode);
  }

  toJSON() {
    return {
      ...this,
      // TODO: Must be explicit since `JSON.stringify` only serializes own direct properties?
      message: this.message
    };
  }
}

/**
 * Converts an unknown error to a `ResponseError` instance.
 */
export const toResponseError = (error: unknown) => {
  const message = toErrorMessage(error);
  const errorCode = toErrorCode(error);

  if (isAxiosError(error) && error.response) {
    return ResponseError.init({ message, statusCode: error.response.status, data: error.response.data, errorCode });
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
    return ResponseError.init({ message, statusCode: error.getStatus(), data: error.getResponse(), errorCode });
  }

  return ResponseError.init({ message, statusCode: 500, errorCode });
};
