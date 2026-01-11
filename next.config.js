/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {},
  rewrites() {
    const rewrites = require("./src/rewrites.json");
    const rewritesArray = [];
    Object.entries(rewrites.translations).forEach(([, translations]) => {
      rewritesArray.push(
        ...rewrites.routes.map((route) => {
          let source = route;
          let destination = `/sl${route}`;
          Object.entries(translations).forEach(([from, to]) => {
            source = source.replace(`{${from}}`, to);
            destination = destination.replace(`{${from}}`, from);
          });
          return {
            source,
            destination,
          };
        })
      );
    });
    return rewritesArray;
  },
  images: {
    remotePatterns: [
      {
        protocol: process.env.NEXT_PUBLIC_IMAGES_PROTOCOL,
        hostname: process.env.NEXT_PUBLIC_IMAGES_HOSTNAME,
        port: process.env.NEXT_PUBLIC_IMAGES_PORT,
        pathname: `${process.env.NEXT_PUBLIC_IMAGES_PATHNAME}/**`,
      },
    ],
  },
};
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});
module.exports = withBundleAnalyzer(nextConfig);
module.exports = nextConfig;
