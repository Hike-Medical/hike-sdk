export const toBoolean = (value: unknown): boolean => {
  if (value == null) {
    return false;
  }

  if (typeof value === 'boolean') {
    return value;
  }

  if (typeof value === 'string') {
    const normalized = value.trim().toLowerCase();

    if (!normalized) {
      return false;
    }

    if (['true', '1', 'yes', 'y'].includes(normalized)) {
      return true;
    }

    if (['false', '0', 'no', 'n'].includes(normalized)) {
      return false;
    }

    return false;
  }

  if (typeof value === 'number') {
    return value !== 0;
  }

  if (typeof value === 'object' && value !== null) {
    return Object.keys(value).length > 0;
  }

  return !!value;
};
