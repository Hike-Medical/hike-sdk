/**
 * Requests camera permissions from the user.
 * If permissions are granted, it resolves with a MediaStream object.
 * If permissions are denied, it rejects with an error message.
 *
 * @returns A promise that resolves with the media stream if permissions are granted.
 */
export const requestCameraPermissions = (constraints: MediaStreamConstraints = {}): Promise<MediaStream> =>
  new Promise((resolve, reject) => {
    navigator.mediaDevices
      .getUserMedia(constraints)
      .then((stream) => {
        resolve(stream);
      })
      .catch((error) => {
        reject(`Camera access denied: ${error.message}`);
      });
  });
