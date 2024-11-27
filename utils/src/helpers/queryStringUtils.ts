import { toURL } from '../converters/toURL';

/**
 * Creates a new query string by updating an existing `URLSearchParams` object.
 */
export const createQueryString = (
  params: URLSearchParams,
  updates: Record<string, string | null | undefined>
): string =>
  Object.entries(updates)
    .reduce(
      (acc, [key, value]) => (value == null ? acc.delete(key) : acc.set(key, value), acc),
      new URLSearchParams(params.toString())
    )
    .toString();

/**
 * Updates the query parameters of a full URL.
 */
export const updateUrlQueryString = (
  url: string | URL,
  updates: Record<string, string | null | undefined>
): string | null => {
  const parsedUrl = toURL(url);

  if (!parsedUrl) {
    return null;
  }

  parsedUrl.search = createQueryString(new URLSearchParams(parsedUrl.search), updates);
  return parsedUrl.toString();
};

/**
 * Updates the query parameters of a relative pathname.
 */
export const updatePathQueryString = (path: string, updates: Record<string, string | null | undefined>): string => {
  const tempUrl = new URL(path, 'http://localhost'); // Use temp URL for handling
  tempUrl.search = createQueryString(new URLSearchParams(tempUrl.search), updates);
  return `${tempUrl.pathname}${tempUrl.search}`;
};
