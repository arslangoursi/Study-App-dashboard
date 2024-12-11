import pwa from "@ducanh2912/next-pwa";
import bundleAnalyzer from "@next/bundle-analyzer";

const withPWA = pwa({
  dest: "public",
  disable: process.env.NODE_ENV !== "production"
});

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === "true"
});

/** @type {import('next').NextConfig} */
const nextConfig = withBundleAnalyzer(
  withPWA({
    async headers() {
      return [
        {
          source: "/api/:path*",
          headers: [
            { key: "Access-Control-Allow-Credentials", value: "true" },
            { key: "Access-Control-Allow-Origin", value: "*" },
            {
              key: "Access-Control-Allow-Methods",
              value: "GET,DELETE,PATCH,POST,PUT"
            },
            {
              key: "Access-Control-Allow-Headers",
              value:
                "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
            }
          ]
        },
        {
          source: "/sw.js",
          headers: [
            {
              key: "Content-Type",
              value: "application/javascript; charset=utf-8"
            },
            {
              key: "Cache-Control",
              value: "no-cache, no-store, must-revalidate"
            },
            {
              key: "Content-Security-Policy",
              value: "default-src 'self'; script-src 'self'"
            }
          ]
        }
      ];
    },
    images: {
      dangerouslyAllowSVG: true,
      remotePatterns: [
        {
          protocol: "https",
          hostname: "avatars.githubusercontent.com",
          port: "",
          pathname: "/**"
        },
        {
          protocol: "https",
          hostname: "placehold.co",
          port: "",
          pathname: "/**"
        },
        {
          protocol: "https",
          hostname: "storage.googleapis.com",
          port: "",
          pathname: "/**"
        },
        {
          protocol: "https",
          hostname: "utfs.io",
          port: "",
          pathname: "/**"
        },
        {
          protocol: "https",
          hostname: "www.figma.com",
          port: "",
          pathname: "/**"
        }
      ]
    },
    sassOptions: {
      silenceDeprecations: ["legacy-js-api"]
    },
    experimental: {
      reactCompiler: true
    }
  })
);

export default nextConfig;
