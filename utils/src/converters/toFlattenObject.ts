import { FormFieldValue } from '@hike/types';

export const toFlattenObject = (
  obj: Record<string, any>,
  parentKey = '',
  result: Record<string, FormFieldValue> = {}
): Record<string, FormFieldValue> => {
  for (const key of Object.keys(obj)) {
    const val = obj[key];
    const newKey = parentKey ? `${parentKey}.${key}` : key;

    if (Array.isArray(val)) {
      for (let i = 0; i < val.length; i++) {
        const arrayVal = val[i];
        if (arrayVal && typeof arrayVal === 'object' && !Array.isArray(arrayVal)) {
          toFlattenObject(arrayVal, `${newKey}.${i}`, result);
        } else {
          result[`${newKey}.${i}`] = arrayVal;
        }
      }
    } else if (val && typeof val === 'object') {
      toFlattenObject(val, newKey, result);
    } else {
      result[newKey] = val;
    }
  }
  return result;
};
