import { describe, expect, test } from '@jest/globals';
import { getSupportedMimeTypes } from '../src/ui/media/getSupportedMimeTypes';

describe('getSupportedMimeTypes', () => {
  beforeAll(() => {
    jest.spyOn(MediaRecorder, 'isTypeSupported').mockImplementation((type: string) => {
      const supportedTypes = [
        'video/webm',
        'video/webm;codecs=vp8',
        'video/webm;codecs=VP8',
        'video/webm;codecs=vp9',
        'video/webm;codecs=VP9',
        'video/mp4',
        'video/mp4;codecs=vp8',
        'video/mp4;codecs=VP8',
        'video/mp4;codecs=vp9',
        'video/mp4;codecs=VP9'
      ];
      return supportedTypes.includes(type);
    });
  });

  // Restore the original implementation after all tests
  afterAll(() => {
    (MediaRecorder.isTypeSupported as jest.Mock).mockRestore();
  });

  test('should return supported MIME types', () => {
    const media = 'video';
    const types = ['webm', 'mp4'];
    const codecs = ['vp8', 'vp9'];
    const expectedMimeTypes = [
      'video/webm',
      'video/webm;codecs=vp8',
      'video/webm;codecs=VP8',
      'video/webm;codecs=vp9',
      'video/webm;codecs=VP9',
      'video/mp4',
      'video/mp4;codecs=vp8',
      'video/mp4;codecs=VP8',
      'video/mp4;codecs=vp9',
      'video/mp4;codecs=VP9'
    ].filter(MediaRecorder.isTypeSupported);

    const result = getSupportedMimeTypes(media, types, codecs);
    expect(result.sort((a, b) => a.localeCompare(b))).toEqual(expectedMimeTypes.sort((a, b) => a.localeCompare(b)));
  });
});
