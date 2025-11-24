import { useMemo } from 'react';
import { PasswordCriteriaState } from '../types';

export interface UsePasswordCriteriaParams {
  password: string;
}

/**
 * Headless hook for password criteria validation
 */
export const usePasswordCriteria = ({ password }: UsePasswordCriteriaParams): PasswordCriteriaState =>
  useMemo(() => {
    const hasMinLength = password.length >= 8;
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[^A-Za-z0-9]/.test(password);
    const isValid = hasMinLength && hasNumber && hasSpecialChar;

    return {
      hasMinLength,
      hasNumber,
      hasSpecialChar,
      isValid
    };
  }, [password]);
