import { isIOS } from '@hike/sdk';
import { getSupportedMimeTypes } from './getSupportedMimeTypes';

/**
 * Determines the best supported video format based on a predefined list of video types and codecs.
 * The function returns the first supported format found.
 *
 * Prefer MP4 on iOS, WebM elsewhere.
 * @returns The best supported video format or fallsback to a safe default if the preferred list is empty.
 * */
export const getBestSupportedVideoFormat = (): string => {
  const ios = isIOS();
  const containers = ios ? ['mp4'] : ['webm', 'ogg', 'x-matroska'];
  const preferredCodecs = ios
    ? ['avc1.42E01E', 'h264', 'mp4a.40.2', 'aac'] // H.264 + AAC
    : ['vp9', 'vp8', 'avc1', 'h264', 'opus']; // VP9/8 first

  const supportedVideos = getSupportedMimeTypes('video', containers, preferredCodecs, containers);

  // OS based fallback based off AI preferences
  return supportedVideos[0] || (ios ? 'video/mp4' : 'video/webm;codecs="vp8"');
};
