/**
 * Creates an HTTP headers object, ensuring `x-company-id` is set when `companyIds` are provided.
 * Also filters out any `undefined` values from additional headers.
 *
 * @example
 * addHeaders(['123', '456'], { Authorization: 'Bearer abc123' });
 * // Returns: { 'x-company-id': '123,456', Authorization: 'Bearer abc123' }
 */

export const addHeaders = (
  companyIds?: string[],
  additional: Record<string, string | undefined> = {}
): Record<string, string> | undefined => {
  const headers = {
    ...(companyIds?.length && { 'x-company-id': companyIds.join(',') }),
    ...Object.fromEntries(Object.entries(additional).filter(([, value]) => value))
  };

  return Object.keys(headers).length ? headers : undefined;
};
