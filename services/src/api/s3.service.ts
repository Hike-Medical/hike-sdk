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
