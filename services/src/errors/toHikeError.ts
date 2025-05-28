import { HikeError } from '@hike/types';
import { isAxiosError } from 'axios';
import { toErrorCode } from './toErrorCode';
import { toErrorMessage } from './toErrorMessage';

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
