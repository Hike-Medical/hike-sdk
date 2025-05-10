import posthog from 'posthog-js';
import { logger } from './logger';

/**
 * Tracks an event in PostHog with the given name and properties
 * @param eventName The name of the event to track
 * @param properties Additional properties to include with the event
 */
export function trackEvent(eventName: string, properties: Record<string, any> = {}) {
  try {
    posthog.capture(eventName, properties);
  } catch (error) {
    logger.error('Failed to track event:', { eventName, properties, error });
  }
}
