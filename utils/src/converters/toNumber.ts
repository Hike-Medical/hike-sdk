export const toNumber = (value: string | number | null | undefined): number | null | undefined =>
  value == null || typeof value === 'number' ? value : parseInt(value, 10);
