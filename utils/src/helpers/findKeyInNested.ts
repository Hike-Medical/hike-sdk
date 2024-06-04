import { Prisma } from '@hike/types';

/**
 * Recursively searches for a specific key within a nested JSON object or array.
 */
export const findKeyInNested = (
  obj: Prisma.JsonObject | Prisma.JsonArray | Record<string, unknown>[] | undefined,
  keyToFind: string
): Prisma.JsonValue | string | undefined => {
  let found: Prisma.JsonValue | undefined;

  if (!obj) {
    return undefined;
  }

  const recurse = (currentObj: Prisma.JsonObject | Prisma.JsonArray | Record<string, unknown>[]): boolean => {
    if (Array.isArray(currentObj)) {
      return currentObj.some((item) => {
        if (item !== null && typeof item === 'object') {
          return recurse(item as Prisma.JsonObject | Prisma.JsonArray);
        }
        return false;
      });
    }

    return Object.entries(currentObj).some(([key, value]) => {
      if (key === keyToFind) {
        found = value;
        return true;
      }
      if (value !== null && typeof value === 'object') {
        return recurse(value as Prisma.JsonObject | Prisma.JsonArray);
      }
      return false;
    });
  };

  recurse(obj);
  return found;
};
