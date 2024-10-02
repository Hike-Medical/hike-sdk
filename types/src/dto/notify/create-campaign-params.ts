export interface CreateCampaignParams {
  name: string;
  description?: string;
  startTime?: Date;
  endTime?: Date;
  recurrencePattern?: string;
  active?: boolean;
  message: string;
  limit?: number;
}
