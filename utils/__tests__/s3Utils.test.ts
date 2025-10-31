import { describe, expect, it } from '@jest/globals';
import { toS3Object } from '../src/helpers/s3Utils';

describe('toS3Object', () => {
  describe('virtual-hosted-style URLs', () => {
    it('should parse virtual-hosted URL with region (dot notation)', () => {
      const result = toS3Object('https://my-bucket.s3.us-west-1.amazonaws.com/path/to/file.pdf');
      expect(result).toEqual({
        bucket: 'my-bucket',
        key: 'path/to/file.pdf',
        region: 'us-west-1'
      });
    });

    it('should parse virtual-hosted URL with region (dash notation)', () => {
      const result = toS3Object('https://my-bucket.s3-us-west-2.amazonaws.com/path/to/file.pdf');
      expect(result).toEqual({
        bucket: 'my-bucket',
        key: 'path/to/file.pdf',
        region: 'us-west-2'
      });
    });

    it('should handle keys with multiple path segments', () => {
      const result = toS3Object('https://my-bucket.s3.us-west-1.amazonaws.com/deep/nested/path/file.pdf');
      expect(result).toEqual({
        bucket: 'my-bucket',
        key: 'deep/nested/path/file.pdf',
        region: 'us-west-1'
      });
    });

    it('should handle bucket names with hyphens and numbers', () => {
      const result = toS3Object('https://my-bucket-123.s3.us-east-1.amazonaws.com/file.pdf');
      expect(result).toEqual({
        bucket: 'my-bucket-123',
        key: 'file.pdf',
        region: 'us-east-1'
      });
    });
  });

  describe('path-style URLs', () => {
    it('should parse path-style URL with region (dot notation)', () => {
      const result = toS3Object('https://s3.us-west-1.amazonaws.com/my-bucket/path/to/file.pdf');
      expect(result).toEqual({
        bucket: 'my-bucket',
        key: 'path/to/file.pdf',
        region: 'us-west-1'
      });
    });

    it('should parse path-style URL with region (dash notation)', () => {
      const result = toS3Object('https://s3-us-west-2.amazonaws.com/my-bucket/path/to/file.pdf');
      expect(result).toEqual({
        bucket: 'my-bucket',
        key: 'path/to/file.pdf',
        region: 'us-west-2'
      });
    });

    it('should handle keys with multiple path segments', () => {
      const result = toS3Object('https://s3.us-west-1.amazonaws.com/my-bucket/deep/nested/path/file.pdf');
      expect(result).toEqual({
        bucket: 'my-bucket',
        key: 'deep/nested/path/file.pdf',
        region: 'us-west-1'
      });
    });
  });

  describe('edge cases', () => {
    it('should return null for non-S3 URLs', () => {
      expect(toS3Object('https://example.com/file.pdf')).toBeNull();
      expect(toS3Object('https://cloudfront.net/path/to/file.pdf')).toBeNull();
      expect(toS3Object('https://google.com')).toBeNull();
    });

    it('should return null for invalid URLs', () => {
      expect(toS3Object('not-a-url')).toBeNull();
      expect(toS3Object('')).toBeNull();
      expect(toS3Object('ftp://my-bucket.s3.amazonaws.com/file.pdf')).toBeNull();
    });

    it('should return null for S3 URLs without key', () => {
      expect(toS3Object('https://my-bucket.s3.us-east-1.amazonaws.com/')).toBeNull();
      expect(toS3Object('https://my-bucket.s3.us-east-1.amazonaws.com')).toBeNull();
      expect(toS3Object('https://s3.us-east-1.amazonaws.com/my-bucket/')).toBeNull();
      expect(toS3Object('https://s3.us-east-1.amazonaws.com/my-bucket')).toBeNull();
    });

    it('should return null for legacy S3 URLs without region', () => {
      expect(toS3Object('https://my-bucket.s3.amazonaws.com/file.pdf')).toBeNull();
      expect(toS3Object('https://s3.amazonaws.com/my-bucket/file.pdf')).toBeNull();
    });

    it('should return null for path-style URLs without bucket', () => {
      expect(toS3Object('https://s3.us-east-1.amazonaws.com/')).toBeNull();
      expect(toS3Object('https://s3.us-east-1.amazonaws.com')).toBeNull();
    });

    it('should handle keys with special characters', () => {
      const result = toS3Object('https://my-bucket.s3.us-west-1.amazonaws.com/path/file%20with%20spaces.pdf');
      expect(result).toEqual({
        bucket: 'my-bucket',
        key: 'path/file%20with%20spaces.pdf',
        region: 'us-west-1'
      });
    });

    it('should handle keys with query parameters', () => {
      const result = toS3Object(
        'https://my-bucket.s3.us-east-1.amazonaws.com/file.pdf?versionId=123&response-content-type=application/pdf'
      );
      expect(result).toEqual({
        bucket: 'my-bucket',
        key: 'file.pdf',
        region: 'us-east-1'
      });
    });

    it('should handle presigned URLs with query string', () => {
      const presignedUrl =
        'https://my-bucket.s3.us-west-1.amazonaws.com/path/to/file.pdf?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAIOSFODNN7EXAMPLE&X-Amz-Date=20230101T000000Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=abcdef';
      const result = toS3Object(presignedUrl);
      expect(result).toEqual({
        bucket: 'my-bucket',
        key: 'path/to/file.pdf',
        region: 'us-west-1'
      });
    });
  });

  describe('real-world examples', () => {
    it('should parse typical Acme production URLs', () => {
      const result = toS3Object(
        'https://acme-production-company-bucket.s3.us-east-1.amazonaws.com/abc123/document.pdf'
      );
      expect(result).toEqual({
        bucket: 'acme-production-company-bucket',
        key: 'abc123/document.pdf',
        region: 'us-east-1'
      });
    });

    it('should parse typical Acme staging URLs', () => {
      const result = toS3Object('https://acme-staging-company-bucket.s3.us-east-1.amazonaws.com/abc123/document.pdf');
      expect(result).toEqual({
        bucket: 'acme-staging-company-bucket',
        key: 'abc123/document.pdf',
        region: 'us-east-1'
      });
    });
  });
});
