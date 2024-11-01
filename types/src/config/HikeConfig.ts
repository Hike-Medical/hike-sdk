import { AppId } from './AppId';
import { HikeEnvironment } from './HikeEnvironment';

/**
 * Represents the configuration options for the Hike SDK.
 */
export interface HikeConfig {
  /**
   * The environment associated with the app.
   */
  readonly appEnv?: HikeEnvironment;

  /**
   * The url associated with API requests.
   *
   * If not provided, will derive from `appId`.
   */
  readonly apiUrl?: string;

  /**
   * The API key used to authenticate requests to the Hike API.
   */
  readonly apiKey?: string;

  /**
   * The app associated with the app.
   */
  readonly appId?: AppId;

  /**
   * The version of the app associated with the app.
   */
  readonly appVersion?: string;

  /**
   * The company associated with the app; can be overriden at runtime.
   */
  readonly companyId?: string;

  /**
   * The cookies to attach to each request.
   */
  readonly cookies?: string;
}
