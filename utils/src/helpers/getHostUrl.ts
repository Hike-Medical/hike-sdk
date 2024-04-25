import { IncomingHttpHeaders } from 'http';

/**
 * Returns the host URL based on the provided request object.
 * @param request - The request object containing the headers.
 * @returns The host URL in the format: `${protocol}://${host}` or `null` if the protocol or host is not found.
 */
export const getHostUrl = (request: { headers: IncomingHttpHeaders }): string | null => {
  let host = request.headers.host;
  let protocol = request.headers.protocol;

  if (!host && request.headers['x-forwarded-host'] && typeof request.headers['x-forwarded-host'] === 'string') {
    host = request.headers['x-forwarded-host'].split(',')[0];
  }

  if (!protocol) {
    if (request.headers['x-forwarded-proto'] && typeof request.headers['x-forwarded-proto'] === 'string') {
      protocol = `${request.headers['x-forwarded-proto'].split(',')[0]}`;
    } else {
      protocol =
        host?.startsWith('localhost') ||
        host?.startsWith('127.0.0.1') ||
        host?.startsWith('192.168.') ||
        host?.startsWith('10.0.') ||
        host?.endsWith('.local')
          ? 'http'
          : 'https';
    }
  }

  if (typeof protocol !== 'string' || typeof host !== 'string') {
    return null;
  }

  return `${protocol}://${host}`;
};
