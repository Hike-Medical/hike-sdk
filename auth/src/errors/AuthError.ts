import { AuthErrorCode } from './AuthErrorCode';

/**
 * Options for creating a `AuthError` instance.
 */
interface AuthErrorOptions<T> {
  message: string;
  statusCode: number;
  errorCode?: AuthErrorCode;
  data?: T;
}

/**
 * Class representing a response error with status and data.
 */
export class AuthError<T> extends Error {
  readonly statusCode: number;
  readonly errorCode?: AuthErrorCode;
  readonly data?: T;

  constructor({ message, statusCode, errorCode, data }: AuthErrorOptions<T>) {
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
