/**
 * Medicare Beneficiary Identifier (MBI) is a 10-digit number that is used to identify a Medicare beneficiary.
 * These are sometimes displayed with dashes, but per CMS the dashes are never used internally:
 * https://www.cms.gov/medicare/new-medicare-card/understanding-the-mbi-with-format.pdf
 * 
 * @param mbi Medicare Beneficiary Identifier
 * @returns 
 */
export const formatMBI = (mbi: string) => {
  if (typeof mbi !== 'string') {
    return mbi;
  }
  return mbi.replace(/-/g, '').trim();
};