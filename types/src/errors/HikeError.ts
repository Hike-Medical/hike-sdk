import { HikeErrorCode } from './HikeErrorCode';

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
