/**
 * Medicare Beneficiary Identifier (MBI) validation schema per CMS specifications.
 *
 * Format: 11 characters with specific position rules:
 * - Position 1: Numeric 1-9
 * - Position 2: Alphabetic (excluding S, L, O, I, B, Z)
 * - Position 3: Alphanumeric (0-9 or alphabetic excluding S, L, O, I, B, Z)
 * - Position 4: Numeric 0-9
 * - Position 5: Alphabetic (excluding S, L, O, I, B, Z)
 * - Position 6: Alphanumeric (0-9 or alphabetic excluding S, L, O, I, B, Z)
 * - Position 7: Numeric 0-9
 * - Position 8: Alphabetic (excluding S, L, O, I, B, Z)
 * - Position 9: Alphabetic (excluding S, L, O, I, B, Z)
 * - Position 10: Numeric 0-9
 * - Position 11: Numeric 0-9
 *
 * Example: 1EG4TE5MK73
 *
 * Note: Dashes are not part of the MBI format and should be removed before validation.
 * Lowercase letters are automatically converted to uppercase.
 */
export const formatMBI = (mbi: string) => {
  const cleanedMBI = mbi.trim().toUpperCase();
  const noDashes = cleanedMBI.replace(/-/g, '');
  const replaceOsWithZeros = noDashes.replace(/O/g, '0');
  const replaceIsWithOnes = replaceOsWithZeros.replace(/I/g, '1');
  const replaceBsWithEights = replaceIsWithOnes.replace(/B/g, '8');
  return replaceBsWithEights;
};