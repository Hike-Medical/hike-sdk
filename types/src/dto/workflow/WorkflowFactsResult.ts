export interface WorkflowFactsResult {
  workflowId: string;
  workflowName: string;
  status: string;
  lastUpdated: string;
  facts: Record<
    string,
    {
      value: any;
      version: number;
    }
  >;
}
