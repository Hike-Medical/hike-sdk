export interface FactWithAttachment {
  id: string;
  key: string;
  value: any;
  source: string;
  acquiredAt: string;
  updatedAt: string;
  metadata?: any;
  sourceAttachment?: {
    id: string;
    name: string;
    bucket: string;
    key: string;
    region: string;
    presignedUrl: string;
  };
}
