import isObject from 'lodash/isObject';
import forOwn from 'lodash/forOwn';
import isArray from 'lodash/isArray';

export const findUniqueKey = (obj: any, keyToFind: string): any => {
  let found: any;

  const recurse = (currentObj: any) => {
    if (isObject(currentObj)) {
      forOwn(currentObj, (value, key) => {
        if (key === keyToFind) {
          found = value;
          return false;
        } else if (isObject(value) || isArray(value)) {
          recurse(value);
        }
        if (found !== undefined) {
          return false;
        }
        return true;
      });
    } else if (isArray(currentObj)) {
      for (const item of currentObj) {
        if (isObject(item) || isArray(item)) {
          recurse(item);
        }
        if (found !== undefined) {
          break;
        }
      }
    }
  };

  recurse(obj);

  return found;
};
