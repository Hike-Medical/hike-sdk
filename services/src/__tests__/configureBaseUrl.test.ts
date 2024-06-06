import { HikeConfig } from '@hike/types';
import { isLocalHost } from '@hike/utils';
import { configureBaseUrl } from '../utils/configureBaseUrl';

jest.mock('@hike/utils', () => ({
  isLocalHost: jest.fn()
}));

describe('configureBaseUrl', () => {
  it('should return the base URL with http protocol for localhost in development environment', () => {
    const config: HikeConfig = {
      appEnv: 'development',
      apiHosts: '',
      appHost: ''
    };

    (isLocalHost as jest.Mock).mockReturnValue(true);

    const result = configureBaseUrl(config);

    expect(result).toBe('http://localhost:8000');
    expect(isLocalHost).toHaveBeenCalledWith('localhost:8000');
  });

  it('should return the base URL with https protocol for production environment', () => {
    const config: HikeConfig = {
      appEnv: 'production',
      apiHosts: '',
      appHost: ''
    };

    (isLocalHost as jest.Mock).mockReturnValue(false);

    const result = configureBaseUrl(config);

    expect(result).toBe('https://api.hikemedical.com');
    expect(isLocalHost).toHaveBeenCalledWith('api.hikemedical.com');
  });

  it('should return the base URL from apiHosts when it is a string', () => {
    const config: HikeConfig = {
      appEnv: 'development',
      apiHosts: 'custom-api.hike-medical.com',
      appHost: ''
    };

    (isLocalHost as jest.Mock).mockReturnValue(false);

    const result = configureBaseUrl(config);

    expect(result).toBe('https://custom-api.hike-medical.com');
    expect(isLocalHost).toHaveBeenCalledWith('custom-api.hike-medical.com');
  });

  it('should return the base URL from apiHosts object based on appHost', () => {
    const config: HikeConfig = {
      appEnv: 'development',
      apiHosts: {
        'admin-staging.hike-medical-server.com': 'api-staging.hike-medical-server.com'
      },
      appHost: 'admin-staging.hike-medical-server.com'
    };

    (isLocalHost as jest.Mock).mockReturnValue(false);

    const result = configureBaseUrl(config);

    expect(result).toBe('https://api-staging.hike-medical-server.com');
    expect(isLocalHost).toHaveBeenCalledWith('api-staging.hike-medical-server.com');
  });

  it('should return the default base URL for empty appHost in multi-tenancy environment', () => {
    const config: HikeConfig = {
      appEnv: 'development',
      apiHosts: {
        'admin-staging.hike-medical-server.com': 'api-staging.hike-medical-server.com'
      },
      appHost: ''
    };

    (isLocalHost as jest.Mock).mockReturnValue(true);

    const result = configureBaseUrl(config);

    expect(result).toBe('http://localhost:8000');
    expect(isLocalHost).toHaveBeenCalledWith('localhost:8000');
  });
});
