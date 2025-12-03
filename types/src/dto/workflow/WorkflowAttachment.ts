export interface WorkflowAttachment {
  id: string;
  name: string;
  types: string[];
  status: string;
  createdAt: string;
  updatedAt: string;
}

export interface AttachmentPresignedUrl {
  id: string;
  name: string;
  presignedUrl: string;
  contentType: string;
}
