/**
 * Truncates a string and adds ellipses in the middle if the string is longer than the specified length.
 * If the input string is null or undefined, an empty string is returned.
 *
 * @param text The input string to be truncated.
 * @param length The desired length of each of the truncated string.
 * @returns The truncated string with ellipses added in the middle if necessary.
 */
export const truncateMiddle = (text: string | null | undefined, length: number) =>
  !text ? '' : text.length <= length * 2 ? text : `${text.slice(0, length).trim()}...${text.slice(-length).trim()}`;
