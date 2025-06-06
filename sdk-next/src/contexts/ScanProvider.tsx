export enum CameraPermissionState {
  UNKNOWN = 'unknown', // Initial state
  REQUESTING = 'requesting', // Actively asking for permission
  GRANTED = 'granted', // Permission given
  DENIED = 'denied', // Permission denied
  INITIALIZING = 'initializing' // Permission granted, camera initializing
}

export const OPTIMAL_VIDEO_CONSTRAINTS = {
  audio: false,
  video: {
    facingMode: { ideal: 'user' }, // Will be updated based on mode
    aspectRatio: { ideal: 16 / 9 }, // Consistent aspect ratio
    width: { min: 640, ideal: 1280, max: 1920 },
    height: { min: 480, ideal: 720, max: 1080 }
  }
} satisfies MediaStreamConstraints;
