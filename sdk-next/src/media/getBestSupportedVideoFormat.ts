import { getSupportedMimeTypes } from './getSupportedMimeTypes';

/**
 * Determines the best supported video format based on a predefined list of video types and codecs.
 * The function returns the first supported format found. If no supported format is found, it defaults to 'video/mp4'.
 *
 * @returns The best supported video format or 'video/mp4' if none of the formats are supported.
 */
export const getBestSupportedVideoFormat = (): string => {
  const containers = ['mp4', 'webm', 'ogg', 'x-matroska'];
  const preferredCodecs = [
    'avc1.42E01E',
    'avc1',
    'vp9',
    'vp9.0',
    'vp8',
    'vp8.0',
    'avc1',
    'av1',
    'h265',
    'h.265',
    'h264',
    'h.264',
    'opus',
    'pcm',
    'aac',
    'mpeg',
    'mp4a'
  ];

  const supportedVideos = getSupportedMimeTypes('video', containers, preferredCodecs, containers);

  // Default to webm if no preferred mp4 format is not possible
  return supportedVideos[0] || 'video/webm;codecs=vp8';
};
