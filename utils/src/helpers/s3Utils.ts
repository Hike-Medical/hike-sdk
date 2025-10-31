import type { S3Object } from '@hike/types';
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
 * Supports virtual-hosted-style and path-style URLs with region.
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
 * ```
 */
export const toS3Object = (url: string): S3Object | null => {
  const parsed = toURL(url);

  if (!parsed || parsed.protocol !== 'https:') {
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
