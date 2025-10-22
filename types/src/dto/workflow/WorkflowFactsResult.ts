export interface WorkflowFactsResult {
  workflowId: string;
  workflowName: string;
  status: string;
  statusReason?: string;
  lastUpdated: string;
  facts: Record<
    string,
    {
      value: any;
    }
  >;
}
