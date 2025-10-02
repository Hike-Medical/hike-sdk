/**
 * Returns custom UTM parameters from the current URL or a provided URL string.
 *
 * Custom UTM parameters tracked:
 * - utm_format: Format of the campaign (e.g., email, sms, banner)
 * - utm_sequence: Sequence number in the campaign flow
 * - utm_aud: Target audience segment
 * - utm_template: Template used for the campaign
 * - utm_experience: User experience type (e.g., onboarding, re-engagement)
 * - utm_experiment: A/B test experiment name
 * - utm_exp_variant: A/B test variant (e.g., A, B, control)
 */
export const marketingUtmParams = [
  'utm_format',
  'utm_sequence',
  'utm_aud',
  'utm_template',
  'utm_experience',
  'utm_experiment',
  'utm_exp_variant'
];
