import { isIOS } from '@hike/sdk';
import { getSupportedMimeTypes } from './getSupportedMimeTypes';

/**
 * Determines the best supported video format for the current device.
 *
 * iOS -> Prefer MP4, then MOV
 * non‑iOS (Android, desktop) -> Prefer WebM
 *
 * The first (container, codec) pair reported as supported by
 * `MediaRecorder.isTypeSupported` wins and is returned.
 */
export const getBestSupportedVideoFormat = (): string => {
  const ios = isIOS();

  /**
   * Ordered map of container -> codec preference list
   * Only the first supported combo will be used.
   */
  const containerPreferences: Record<string, string[]> = ios
    ? {
        mp4: ['h264', 'av01', 'h265', 'hev1', 'hvc1'],
        mov: ['h264', 'h265', 'hev1', 'hvc1']
      }
    : {
        webm: ['vp9', 'vp8', 'av01']
      };

  for (const [container, codecs] of Object.entries(containerPreferences)) {
    const supported = getSupportedMimeTypes('video', [container], codecs);
    if (supported.length && supported[0]) return supported[0]; // first match = best match
  }

  // Absolute fall‑back (unlikely to be reached in modern browsers)
  return ios ? 'video/mp4' : 'video/webm;codecs="vp8"';
};
