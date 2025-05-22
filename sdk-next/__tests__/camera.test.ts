import { requestCameraPermissions } from '../src/media/camera';

describe('requestCameraPermissions', () => {
  const originalMediaDevices = (navigator as any).mediaDevices;

  beforeEach(() => {
    jest.clearAllMocks();
    (navigator as any).mediaDevices = { getUserMedia: jest.fn() };
  });

  afterAll(() => {
    (navigator as any).mediaDevices = originalMediaDevices;
  });

  it('should resolve if camera access is granted', async () => {
    const mockStream = {
      getTracks: jest.fn(() => [])
    };

    // Mocking navigator.mediaDevices.getUserMedia to resolve with mockStream
    (navigator.mediaDevices.getUserMedia as jest.Mock) = jest.fn().mockResolvedValue(mockStream);

    await expect(requestCameraPermissions({ video: true })).resolves.toBe(mockStream);
    expect(navigator.mediaDevices.getUserMedia).toHaveBeenCalledWith({ video: true });
    expect(mockStream.getTracks).not.toHaveBeenCalled();
  });

  it('should reject if camera access is denied', async () => {
    const mockError = new Error('Permission denied');

    // Mocking navigator.mediaDevices.getUserMedia to reject with mockError
    (navigator.mediaDevices.getUserMedia as jest.Mock) = jest.fn().mockRejectedValue(mockError);

    await expect(requestCameraPermissions({ video: true })).rejects.toBe('Camera access denied: Permission denied');
    expect(navigator.mediaDevices.getUserMedia).toHaveBeenCalledWith({ video: true });
  });
});
