export const toBoolean = (value: unknown) => {
  if (typeof value === 'boolean') {
    return value;
  }

  if (typeof value === 'string') {
    return ['true', 'yes'].includes(value.toLowerCase());
  }

  if (typeof value === 'number') {
    return value !== 0;
  }

  if (typeof value === 'object' && value !== null) {
    return Object.keys(value).length > 0;
  }

  return !!value;
};
