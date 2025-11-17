export enum TimeSavedEntityType {
  STEP = 'STEP',
  ATTACHMENT = 'ATTACHMENT'
}

export interface ActiveTimeSavedBreakdown {
  entityId: string;
  entityType: TimeSavedEntityType;
  name: string;
  timeSavedSeconds: number;
}

export interface ActiveTimeSaved {
  totalSeconds: number;
  breakdown: ActiveTimeSavedBreakdown[];
}

export interface TimeSavedToMilestone {
  milestoneName: string;
  startTime: string;
  endTime: string;
  timeToMilestoneSeconds: number;
  benchmarkTimeToMilestoneSeconds: number;
  timeSavedSeconds: number;
}

export interface WorkflowTimeSaved {
  workflowId: string;
  workflowName: string;
  timeSavedToMilestone: TimeSavedToMilestone[];
  activeTimeSaved: ActiveTimeSaved;
}
