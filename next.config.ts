import type { NextConfig } from "next";

const securityHeaders = [
  // Prevent MIME-sniffing
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  // Prevent clickjacking
  {
    key: 'X-Frame-Options',
    value: 'SAMEORIGIN',
  },
  // Control referrer information
  {
    key: 'Referrer-Policy',
    value: 'strict-origin-when-cross-origin',
  },
  // Control browser feature access
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=()',
  },
  // Content Security Policy (CSP) - Adjust as needed!
  {
    key: 'Content-Security-Policy',
    value: [
      `default-src 'self'`,
      // Allow inline scripts/styles & eval for Next.js/React (consider tightening in production)
      // Added va.vercel-scripts.com for Vercel Analytics/Speed Insights
      `script-src 'self' 'unsafe-eval' 'unsafe-inline' va.vercel-scripts.com`,
      `style-src 'self' 'unsafe-inline'`,
      // Allow images from self, data URIs, placeholder, and Supabase
      `img-src 'self' data: https://via.placeholder.com https://igyrkokjtrhsnrivmotx.supabase.co`,
      // Allow fonts from self (add external sources if needed)
      `font-src 'self'`,
      // Allow connections to self and Supabase
      `connect-src 'self' https://*.supabase.co`,
      `frame-ancestors 'none'`, // Disallow embedding in frames
      `form-action 'self'`, // Allow forms to submit to self
      `object-src 'none'`, // Disallow plugins
      `base-uri 'self'`, // Restrict <base> tag
      `upgrade-insecure-requests`, // Prefer HTTPS
    ].join('; '),
  },
];


const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        // Apply these headers to all routes in your application.
        source: '/:path*',
        headers: securityHeaders,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
        port: '',
        pathname: '/**',
      },
      {
         protocol: 'https',
         hostname: 'igyrkokjtrhsnrivmotx.supabase.co', // Added Supabase hostname
         port: '',
         pathname: '/**', // Made pathname more permissive
       },
     ],
  },
};

export default nextConfig;
