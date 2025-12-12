export interface TimeSavedMetric {
  hours: number;
  seconds: number;
}

export interface TimeSavedStats {
  thisWeek: TimeSavedMetric;
  allTime: TimeSavedMetric;
  trend: string;
}

export interface CurrentActivityStats {
  pagesProcessing: number;
  factsChecked: number;
  conflictsResolved: number;
  issuesFlagged: number;
}

export interface WorkflowDashboardStats {
  timeSaved: TimeSavedStats;
  current: CurrentActivityStats;
}
