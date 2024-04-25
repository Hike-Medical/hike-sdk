/**
 * Returns a the value capitalizing the first letter of each word.
 */
export const toTitleCase = (value: string) =>
  value
    .toLocaleLowerCase()
    .split(' ')
    .map((word) => (word.length ? word[0]?.toLocaleUpperCase() + word.slice(1) : word))
    .join(' ');
