/**
 * Generic type guard for checking if a value is a valid type.
 *
 * @example
 * const isCompanyPortal = isType(CompanyPortal);
 * isCompanyPortal('clinical'); // true
 * isCompanyPortal('invalid'); // false
 */
export const isType = <T extends Record<string, string>>(enumObj: T) => {
  const values = new Set(Object.values(enumObj));
  return (value: string | null | undefined): value is T[keyof T] => values.has(value ?? '');
};
