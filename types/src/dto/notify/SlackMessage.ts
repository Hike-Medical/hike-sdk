export interface SlackMessage {
  channelUrl: string | undefined;
  text: string;
  attachments?: {
    text?: string;
    color: string;
    title?: string;
    fields?: { title?: string; value?: string; short?: boolean }[];
  }[];
}
