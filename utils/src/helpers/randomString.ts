/**
 * Generates a random alphanumeric string of a given length.
 * @param length - The desired length of the random string.
 * @returns A randomly generated string.
 */
export const randomString = (length: number, numericOnly?: boolean): string =>
  Array.from({ length }, () => {
    if (numericOnly) {
      // Only digits 0-9
      return String.fromCharCode(48 + Math.floor(Math.random() * 10));
    }
    // Alphanumeric: 0-9, A-Z, a-z
    const charCode = Math.floor(Math.random() * 62);
    return String.fromCharCode(
      charCode < 10
        ? charCode + 48 // 0-9
        : charCode < 36
          ? charCode + 55 // A-Z
          : charCode + 61 // a-z
    );
  }).join('');
