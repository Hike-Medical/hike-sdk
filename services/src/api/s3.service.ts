import { AwsBucketConfig } from '@hike/types';

/**
 * Get the URL of an AWS bucket.
 */
export const getAwsBucketUrl = ({ bucket, region, baseUrl }: AwsBucketConfig): string =>
  baseUrl ? `${baseUrl}/${bucket}` : `https://${bucket}.s3.${region}.amazonaws.com`;
