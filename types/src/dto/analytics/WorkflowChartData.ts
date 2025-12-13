export interface WorkflowChartDataPoint {
  date: string;
  finished: number;
  active: number;
  nonCompliant: number;
  failed: number;
}

export interface WorkflowChartData {
  data: WorkflowChartDataPoint[];
  totalWorkflows: number;
}

export interface GetWorkflowChartDataParams {
  startDate: string;
  endDate: string;
}
