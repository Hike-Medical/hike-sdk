export interface StreamCompleteParams {
  status: 'SUCCESS' | 'FAILURE';
  key: string;
  uploadId: string;
  completedParts: { ETag: string; PartNumber: number }[];
}
