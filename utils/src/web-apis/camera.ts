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
