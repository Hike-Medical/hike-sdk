import { SlackMessage } from '@hike/types';
export const postMessageToSlack = async ({ channelUrl, text, attachments }: SlackMessage) => {
  if (!channelUrl) {
    return;
  }

  const payload = JSON.stringify({
    text,
    attachments
  });

  const response = await fetch(channelUrl, {
    method: 'POST',
    body: payload
  });

  if (response.status !== 200) {
    console.error('postMessageToSlack(): Error sending message to Slack', JSON.stringify(response));
  }
};
