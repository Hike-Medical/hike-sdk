/**
 * Represents the configuration options for the Hike SDK.
 */
export interface HikeConfig {
  /**
   * The API key used to authenticate requests to the Hike API.
   */
  readonly apiKey?: string;

  /**
   * The environment associated with the app.
   */
  readonly appEnv?: string;

  /**
   * The app associated with the app.
   */
  readonly appId?: string;

  /**
   * The version of the app associated with the app.
   */
  readonly appVersion?: string;
}
