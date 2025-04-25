/**
 * Get supported MIME types for MediaRecorder.
 *
 * @param media - The media type (e.g., 'audio', 'video').
 * @param types - The list of media types (e.g., ['mp4', 'webm']).
 * @param codecs - The list of codecs (e.g., ['vp8', 'vp9']).
 * @returns The supported MIME types with optional codecs.
 */
export const getSupportedMimeTypes = (media: string, types: string[], codecs: string[]): string[] =>
  types.flatMap((type) => {
    const mimeType = `${media}/${type}`;
    const variations = [
      mimeType,
      ...codecs.flatMap((codec) => [`${mimeType};codecs=${codec}`, `${mimeType};codecs=${codec.toUpperCase()}`])
    ];
    return variations.filter(MediaRecorder.isTypeSupported);
  });
