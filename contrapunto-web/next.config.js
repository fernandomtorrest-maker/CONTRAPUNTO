/** @type {import('next').NextConfig} */

const securityHeaders = [
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on',
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload',
  },
  {
    key: 'X-Frame-Options',
    value: 'SAMEORIGIN',
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  {
    key: 'Referrer-Policy',
    value: 'strict-origin-when-cross-origin',
  },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=()',
  },
  {
    key: 'Content-Security-Policy',
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://w.behold.so https://static.elfsight.com https://*.elfsight.com",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://w.behold.so https://static.elfsight.com https://*.elfsight.com",
      "font-src 'self' https://fonts.gstatic.com",
      "img-src 'self' data: blob: https: https://*.instagram.com https://*.cdninstagram.com https://*.fbcdn.net https://*.elfsight.com",
      "connect-src 'self' https://w.behold.so https://api.behold.so https://static.elfsight.com https://*.elfsight.com https://*.instagram.com",
      "frame-src 'self' https://w.behold.so https://static.elfsight.com https://*.elfsight.com https://*.instagram.com https://www.instagram.com",
      "frame-ancestors 'self'",
    ].join('; '),
  },
];

const nextConfig = {
  // Optimizado para Docker/VPS — genera build standalone mínimo
  output: 'standalone',

  // Optimización de imágenes
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'constructoracontrapunto.cl',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'i.ibb.co',
      },
    ],
  },

  // Cabeceras de seguridad HTTP aplicadas a todas las rutas
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: securityHeaders,
      },
    ];
  },

  // Desactivar powered-by header
  poweredByHeader: false,

  // Compresión
  compress: true,
};

module.exports = nextConfig;
