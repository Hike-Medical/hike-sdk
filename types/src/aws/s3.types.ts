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
