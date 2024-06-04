import { getSupportedMimeTypes } from './getSupportedMimeTypes';

/**
 * Determines the best supported video format based on a predefined list of video types and codecs.
 * The function returns the first supported format found. If no supported format is found, it defaults to 'video/mp4'.
 *
 * @returns The best supported video format or 'video/mp4' if none of the formats are supported.
 */
export const getBestSupportedVideoFormat = (): string => {
  const videoTypes = ['webm', 'ogg', 'mp4', 'x-matroska'];
  const codecs = [
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

  const supportedVideos = getSupportedMimeTypes('video', videoTypes, codecs);

  // Default to mp4 if no supported format is found
  return supportedVideos[0] || 'video/mp4';
};
