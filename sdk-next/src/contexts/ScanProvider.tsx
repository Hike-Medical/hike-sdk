export enum CameraPermissionState {
  UNKNOWN = 'unknown', // Initial state
  REQUESTING = 'requesting', // Actively asking for permission
  GRANTED = 'granted', // Permission given
  DENIED = 'denied', // Permission denied
  INITIALIZING = 'initializing' // Permission granted, camera initializing
}
