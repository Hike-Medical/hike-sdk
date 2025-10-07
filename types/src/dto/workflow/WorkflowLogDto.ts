export interface WorkflowLogUserDto {
  id: string;
  email: string;
  name: string;
}

export interface WorkflowLogDto {
  id: string;
  action: string;
  context?: Record<string, unknown>;
  comment?: string;
  createdAt: Date;
  user?: WorkflowLogUserDto;
  interpretedAction?: string;
  interpretedDescription?: string;
}
