export interface CreateMultipartUrls {
  uploadId: string;
  key: string;
  presignedUrls: { partNumber: number; url: string }[];
}
