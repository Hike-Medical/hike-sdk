import { isPlainObject } from '@hike/types';

/**
 * Recursively flattens a nested object into a single-level object using dot notation.
 *
 * @example
 * flattenObject({ user: { name: "John", addresses: [{ city: "New York" }] } })
 * // returns { "user.name": "John", "user.addresses.0.city": "New York" }
 */
export const flattenObject = <R = unknown>(obj: Record<string, unknown>): Record<string, R> =>
  Object.entries(obj).reduce<Record<string, R>>((acc, [key, value]) => {
    if (Array.isArray(value)) {
      return value.reduce(
        (innerAcc, item, index) => ({
          ...innerAcc,
          ...(isPlainObject(item)
            ? Object.entries(flattenObject(item)).reduce(
                (flattenedAcc, [innerKey, innerValue]) => ({
                  ...flattenedAcc,
                  [`${key}.${index}.${innerKey}`]: innerValue
                }),
                {}
              )
            : { [`${key}.${index}`]: item })
        }),
        acc
      );
    }

    if (isPlainObject(value)) {
      const flattenedValue = flattenObject(value as Record<string, R>);
      return {
        ...acc,
        ...Object.entries(flattenedValue).reduce(
          (nestedAcc, [nestedKey, nestedValue]) => ({
            ...nestedAcc,
            [`${key}.${nestedKey}`]: nestedValue
          }),
          {}
        )
      };
    }

    return { ...acc, [key]: value };
  }, {});
