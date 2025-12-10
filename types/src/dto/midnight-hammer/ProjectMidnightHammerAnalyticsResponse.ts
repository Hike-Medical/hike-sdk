export interface TimeSeriesDataPoint {
  date: string;
  accept: number;
  reject: number;
}

export interface RenderScoreDistribution {
  renderScore: number;
  acceptCount: number;
  rejectCount: number;
  acceptPercentage: number;
  rejectPercentage: number;
}

export interface RejectReasonStats {
  reason: string;
  count: number;
  medianRenderScore: number | null;
}

export interface ProjectMidnightHammerAnalyticsResponse {
  timeSeries: TimeSeriesDataPoint[];
  renderScoreDistribution: RenderScoreDistribution[];
  rejectReasons: RejectReasonStats[];
}
