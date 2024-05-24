import requestCameraPermissions from '../src/web-apis/camera';

describe('requestCameraPermissions', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should resolve if camera access is granted', async () => {
    const mockStream = {
      getTracks: jest.fn(() => [{ stop: jest.fn() }])
    };

    // Mocking navigator.mediaDevices.getUserMedia to resolve with mockStream
    (navigator.mediaDevices.getUserMedia as jest.Mock) = jest.fn().mockResolvedValue(mockStream);

    await expect(requestCameraPermissions()).resolves.toBeUndefined();
    expect(navigator.mediaDevices.getUserMedia).toHaveBeenCalledWith({ video: true });
    expect(mockStream.getTracks).toHaveBeenCalled();
    expect(mockStream.getTracks()[0].stop).toHaveBeenCalled();
  });

  it('should reject if camera access is denied', async () => {
    const mockError = new Error('Permission denied');

    // Mocking navigator.mediaDevices.getUserMedia to reject with mockError
    (navigator.mediaDevices.getUserMedia as jest.Mock) = jest.fn().mockRejectedValue(mockError);

    await expect(requestCameraPermissions()).rejects.toBe('Camera access denied: Permission denied');
    expect(navigator.mediaDevices.getUserMedia).toHaveBeenCalledWith({ video: true });
  });
});
