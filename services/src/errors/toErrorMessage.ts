import { isAxiosError } from 'axios';

const parseMessage = (text: unknown) => {
  // Combine array of messages if applicable
  if (Array.isArray(text) && text.length > 0) {
    return text.join(', ');
  } else if (typeof text === 'string') {
    return text;
  }

  return null;
};

/**
 * Converts various error types into user-friendly error messages.
 * If the input error is not recognized or does not have an associated message,
 * a default error message is returned.
 */
export const toErrorMessage = (error: unknown, defaultMessage = 'An error occurred with your request.') => {
  if (isAxiosError(error)) {
    return parseMessage(error.response?.data.message) || defaultMessage;
  }

  if (error instanceof Error) {
    return error.message || defaultMessage;
  }

  // Check if the error is an object with a message property
  if (typeof error === 'object' && error !== null && 'message' in error) {
    return parseMessage(error.message) || defaultMessage;
  }

  return defaultMessage;
};
