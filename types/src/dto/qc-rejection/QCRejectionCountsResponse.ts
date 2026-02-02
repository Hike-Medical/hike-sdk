export interface QCRejectionCountsResponse {
  byStation: Record<string, number>;
  byStatus: Record<string, number>;
  total: number;
}
