export const requestCameraPermissions = (): Promise<MediaStream> => {
  return new Promise((resolve, reject) => {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        stream.getTracks().forEach((track) => track.stop());
        resolve(stream);
      })
      .catch((error) => {
        reject(`Camera access denied: ${error.message}`);
      });
  });
};

export function getSupportedMimeTypes(media: string, types: string[], codecs: string[]): string[] {
  const isSupported = (type: string) => MediaRecorder.isTypeSupported(type);
  const supported: string[] = [];

  types.forEach((type) => {
    const mimeType = `${media}/${type}`;
    codecs.forEach((codec) =>
      [`${mimeType};codecs=${codec}`, `${mimeType};codecs=${codec.toUpperCase()}`].forEach((variation) => {
        if (isSupported(variation)) supported.push(variation);
      })
    );
    if (isSupported(mimeType)) supported.push(mimeType);
  });

  return supported;
}

export function getBestSupportedVideoFormat(): string {
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
}
