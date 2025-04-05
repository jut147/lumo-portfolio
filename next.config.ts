import type { NextConfig } from "next";
import type { Header } from 'next/dist/lib/load-custom-routes'; // Import Header type

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
      `img-src 'self' data: https://via.placeholder.com https://placehold.co https://igyrkokjtrhsnrivmotx.supabase.co`, // Added placehold.co
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
  async headers(): Promise<Header[]> { // Add explicit return type
    return [
      {
        // Apply these headers to all routes in your application.
        source: '/:path*',
        headers: securityHeaders,
      },
      // [Remove the misplaced placehold.co object from here]
    ];
  },
  images: {
    dangerouslyAllowSVG: true, // Allow remote SVGs
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;", // Recommended CSP for SVGs
    remotePatterns: [ // Define the array ONCE
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
        port: '',
        pathname: '/**',
      },
      {
         protocol: 'https',
         hostname: 'igyrkokjtrhsnrivmotx.supabase.co', // Supabase hostname
         port: '',
         pathname: '/**',
       },
      {
        protocol: 'https',
        hostname: 'placehold.co', // placehold.co hostname
        port: '',
        pathname: '/**',
      },
     ], // End of the single remotePatterns array
  }, // End of images object
};

export default nextConfig;
