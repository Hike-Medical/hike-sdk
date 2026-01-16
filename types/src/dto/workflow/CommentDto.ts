export interface CommentDto {
  id: string;
  workflowId: string;
  content: string;
  createdAt: string;
  createdBy?: string;
  createdByUser?: {
    id: string;
    firstName?: string;
    lastName?: string;
    email?: string;
  };
}

export interface CreateWorkflowCommentParams {
  content: string;
}
