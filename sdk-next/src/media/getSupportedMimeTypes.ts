/**
 * Get supported MIME types for MediaRecorder.
 *
 * @param media    'audio' | 'video'
 * @param types    container list e.g. ['mp4', 'webm']
 * @param codecs   codec list e.g. ['avc1', 'mp4a']
 * @param order    (optional) explicit type priority; defaults to given order
 */
export const getSupportedMimeTypes = (
  media: string,
  types: string[],
  codecs: string[],
  order: string[] = types
): string[] =>
  order.flatMap((type) => {
    const mimeType = `${media}/${type}`;
    const variations = [
      mimeType,
      ...codecs.flatMap((c) => [`${mimeType};codecs=${c}`, `${mimeType};codecs=${c.toUpperCase()}`])
    ];
    return variations.filter(MediaRecorder.isTypeSupported);
  });
