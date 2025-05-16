import { isAxiosError } from 'axios';
import { HikeErrorCode, toErrorCode } from './HikeErrorCode';
import { toErrorMessage } from './toErrorMessage';

/**
 * Options for creating a `HikeError` instance.
 */
interface HikeErrorOptions<T> {
  message: string;
  statusCode: number;
  errorCode?: HikeErrorCode;
  data?: T;
}

/**
 * Class representing a response error with status and data.
 */
export class HikeError<T> extends Error {
  readonly statusCode: number;
  readonly errorCode?: HikeErrorCode;
  readonly data?: T;

  constructor({ message, statusCode, errorCode, data }: HikeErrorOptions<T>) {
    super(message);
    this.statusCode = statusCode;
    this.errorCode = errorCode;
    this.data = data;
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
 * Converts an unknown error to a `HikeError` instance.
 */
export const toHikeError = (error: unknown) => {
  if (error instanceof HikeError) {
    return error;
  }

  const message = toErrorMessage(error);
  const errorCode = toErrorCode(error);

  if (isAxiosError(error) && error.response) {
    return new HikeError({
      message,
      statusCode: error.response.status,
      data: error.response.data.data || error.response.data,
      errorCode
    });
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
    return new HikeError({ message, statusCode: error.getStatus(), data: error.getResponse(), errorCode });
  }

  return new HikeError({ message, statusCode: 500, errorCode });
};
