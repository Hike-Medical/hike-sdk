import { toURL } from '../converters/toURL';

/**
 * Returns the company identifier from the given URL.
 */
export const extractCompanyId = (url: unknown) => {
  const parsedUrl = toURL(url);
  const regex = /^\/company\/([^/]+)(\/|$)/;
  const match = parsedUrl?.pathname.match(regex);
  return match ? match[1] : '';
};
