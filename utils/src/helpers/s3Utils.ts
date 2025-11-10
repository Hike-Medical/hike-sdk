import type { S3Object } from '@hike/types';
import { Constants } from '../constants';
import { toURL } from '../converters/toURL';

/**
 * Interface for AWS bucket configuration.
 */
export interface AwsBucketConfig {
  bucket: string;
  region: string;

  /**
   * Change from the default AWS URL. Used for local testing, i.e. http://localhost:4569.
   */
  baseUrl?: string;
}

/**
 * Get the URL of an AWS bucket.
 */
export const getAwsBucketUrl = ({ bucket, region, baseUrl }: AwsBucketConfig): string =>
  baseUrl ? `${baseUrl}/${bucket}` : `https://${bucket}.s3.${region}.amazonaws.com`;

/**
 * Get the URL of an AWS bucket.
 */
export const getAwsS3Url = ({ bucket, key, region }: S3Object, baseUrl?: string): string =>
  `${getAwsBucketUrl({ bucket, region, baseUrl })}/${key}`;

/**
 * Extract S3 bucket and key from AWS S3 URLs.
 * Supports virtual-hosted-style, path-style URLs with region, and s3:// protocol URIs.
 *
 * @param url - The S3 URL or URI to parse
 * @param defaultRegion - The default region to use for s3:// URIs (defaults to 'us-east-1')
 *
 * @example
 * ```ts
 * // Virtual-hosted
 * toS3Object('https://bucket.s3.us-west-1.amazonaws.com/key')
 * // { bucket: 'bucket', key: 'key', region: 'us-west-1' }
 *
 * // Path-style
 * toS3Object('https://s3.us-west-1.amazonaws.com/bucket/key')
 * // { bucket: 'bucket', key: 'key', region: 'us-west-1' }
 *
 * // s3:// protocol (uses default region)
 * toS3Object('s3://bucket/key')
 * // { bucket: 'bucket', key: 'key', region: 'us-east-2' }
 *
 * // s3:// protocol with custom default region
 * toS3Object('s3://bucket/key', 'eu-west-1')
 * // { bucket: 'bucket', key: 'key', region: 'eu-west-1' }
 * ```
 */
export const toS3Object = (url: string, defaultRegion: string = Constants.DEFAULT_AWS_REGION): S3Object | null => {
  const parsed = toURL(url);

  if (!parsed) {
    return null;
  }

  // Handle s3:// protocol
  if (parsed.protocol === 's3:') {
    const bucket = parsed.hostname;
    const key = decodeURIComponent(parsed.pathname.slice(1)); // Remove leading slash and decode
    return bucket && key ? { bucket, key, region: defaultRegion } : null;
  }

  // Only handle HTTPS for AWS URLs
  if (parsed.protocol !== 'https:') {
    return null;
  }

  // Virtual-hosted-style: bucket.s3[.region].amazonaws.com/key
  const virtualHostedMatch = parsed.hostname.match(/^(.+?)\.s3[.-]([^.]+)\.amazonaws\.com$/);

  if (virtualHostedMatch) {
    const bucket = virtualHostedMatch[1];
    const region = virtualHostedMatch[2];
    const key = decodeURIComponent(parsed.pathname.slice(1)); // Decode URL-encoded characters
    return bucket && key && region ? { bucket, key, region } : null;
  }

  // Path-style with region: s3[.region].amazonaws.com/bucket/key
  const pathStyleMatch = parsed.hostname.match(/^s3[.-]([^.]+)\.amazonaws\.com$/);

  if (pathStyleMatch) {
    const region = pathStyleMatch[1];
    const decodedPath = decodeURIComponent(parsed.pathname.slice(1)); // Decode URL-encoded characters
    const pathParts = decodedPath.split('/');
    const bucket = pathParts[0];
    const key = pathParts.slice(1).join('/');
    return bucket && key && region ? { bucket, key, region } : null;
  }

  return null;
};
