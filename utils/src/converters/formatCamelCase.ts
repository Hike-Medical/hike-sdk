/**
 * Converts a camelCase string into space-separated Title Case,
 * capitalizing the first letter of each word.
 */
export const formatCamelCase = (value: string): string =>
  value
    .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
    .split(' ')
    .map((word) => (word.length ? word[0]?.toLocaleUpperCase() + word.slice(1).toLocaleLowerCase() : word))
    .join(' ');
