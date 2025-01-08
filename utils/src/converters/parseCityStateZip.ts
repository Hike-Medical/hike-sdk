/**
 * Parses a string containing city, state or province, and postal code.
 * @returns An object with city, stateOrProvince, and postalCode properties.
 *
 * @example
 * parseCityStateZip('New York, NY 10001');
 * // { city: 'New York', stateOrProvince: 'NY', postalCode: '10001' }
 *
 * parseCityStateZip('Toronto, Ontario M5H 2N2');
 * // { city: 'Toronto', stateOrProvince: 'Ontario', postalCode: 'M5H 2N2' }
 */
export const parseCityStateZip = (
  input: string
): { city: string; stateOrProvince: string; postalCode: string } | null => {
  const [cityPart, stateAndPostal] = input.split(',').map((part) => part.trim());

  if (!cityPart || !stateAndPostal) {
    return null;
  }

  const parts = stateAndPostal.split(/\s+/);

  // Postal code can have 1 space such as "M5H 2N2"
  const postalCodeStartIndex = parts.length > 2 ? parts.length - 2 : parts.length - 1;
  const postalCode = parts.slice(postalCodeStartIndex).join(' ');
  const stateOrProvince = parts.slice(0, postalCodeStartIndex).join(' ');

  if (!stateOrProvince || !postalCode) {
    return null;
  }

  return { city: cityPart, stateOrProvince, postalCode };
};
