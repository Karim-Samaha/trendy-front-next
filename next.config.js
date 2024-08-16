/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: '/.well-known/apple-developer-merchantid-domain-association',
        headers: [
          {
            key: 'Content-Type',
            value: 'application/json',
          },
          {
            key: 'Content-Disposition',
            value: 'inline',
          },
        ],
      },
    ];
  },
  experimental: {
    typedRoutes: true,
  },

  reactStrictMode: false,
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.pexels.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "5000",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "trendy-rose-ea018d58bf02.herokuapp.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "trendy-rose-backend-1d3339f8bb01.herokuapp.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "trendyback.trendyrosesa.com",
        port: "",
        pathname: "/**",
      }
    ],
  },
};

module.exports = nextConfig;
