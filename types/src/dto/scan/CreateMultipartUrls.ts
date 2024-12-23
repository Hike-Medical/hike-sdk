export interface CreateMultipartUrls {
  uploadId: string;
  presignedUrls: { partNumber: number; url: string }[];
}
