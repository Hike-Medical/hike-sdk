export interface SlackMessage {
  channelUrl: string | undefined;
  text: string;
  attachments?: Array<{
    mrkdwn_in: Array<string>;
    color: string;
    pretext: string;
    author_name: string;
    author_link: string;
    author_icon: string;
    title: string;
    title_link: string;
    text: string;
    fields: Array<{
      title: string;
      value: string;
      short: boolean;
    }>;
    thumb_url: string;
    footer: string;
    footer_icon: string;
    ts: number;
  }>;
}
