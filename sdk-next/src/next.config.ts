import type { NextConfig } from 'next';

async function securityHeaders() {
  return [
    {
      source: '/(.*)',
      headers: [
        {
          key: 'Content-Security-Policy',
          value: "frame-ancestors 'none'"
        },
        {
          key: 'X-Frame-Options',
          value: 'DENY'
        }
      ]
    }
  ];
}

export function withSecurityHeaders(config: NextConfig = {}): NextConfig {
  return {
    ...config,
    async headers() {
      const additional = typeof config.headers === 'function' ? await config.headers() : [];
      return [...(await securityHeaders()), ...additional];
    }
  };
}
