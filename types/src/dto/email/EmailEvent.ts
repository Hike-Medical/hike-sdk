export interface EmailEvent {
  type: string;
  created_at: string;
  data: EmailData;
}

interface EmailData {
  created_at: string;
  email_id: string;
  from: string;
  to: string[];
  subject: string;
}
