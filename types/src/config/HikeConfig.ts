/**
 * Represents the configuration options for the Hike SDK.
 */
export interface HikeConfig {
  /**
   * The hosts associated with API requests.
   *
   * The key represents the app's host name and the value represents the API's host name.
   * This allows for different API hosts to be used for different apps.
   * If a string is provided instead, it will be used for all API requests.
   * If no value is provided at all, the default API host will be used.
   *
   * @note
   * The app and API host names must have matching domains for cross-domain cookie sharing.
   *
   * @example
   * ```
   * {
   *    "admin.example.com": "api.example.com",
   *    "web.example2.com": "backend.example2.com"
   * }
   * ```
   */
  readonly apiHosts?: Record<string, string> | string;

  /**
   * The API key used to authenticate requests to the Hike API.
   */
  readonly apiKey?: string;

  /**
   * The host associated with the app.
   */
  readonly appHost?: string | null;

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

  /**
   * The company associated with the app; can be overriden at runtime.
   */
  readonly companyId?: string;

  /**
   * The cookies to attach to each request.
   */
  readonly cookies?: string;
}
