/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  rewrites() {
    return [
      {
        source: "/plezalisca/:countrySlug*",
        destination: "/crags/:countrySlug*",
      },
      {
        source: "/plezalisce/:cragSlug/smer/:routeSlug*",
        destination: "/crag/:cragSlug/route/:routeSlug*",
      },
      {
        source: "/plezalisce/:cragSlug/komentarji",
        destination: "/crag/:cragSlug/comments",
      },
      {
        source: "/plezalisce/:cragSlug*",
        destination: "/crag/:cragSlug*",
      },
    ];
  },
};

module.exports = nextConfig;
