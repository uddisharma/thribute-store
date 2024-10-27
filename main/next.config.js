/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
      {
        protocol: "https",
        hostname: "rukminim1.flixcart.com",
      },
      {
        protocol: "https",
        hostname: "utfs.io",
      },
    ],
  },
};

module.exports = nextConfig;

// next.config.js
// const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");

// const nextConfig = {
//   reactStrictMode: true,
//   images: {
//     remotePatterns: [
//       {
//         protocol: "https",
//         hostname: "res.cloudinary.com",
//       },
//       {
//         protocol: "https",
//         hostname: "rukminim1.flixcart.com",
//       },
//       {
//         protocol: "https",
//         hostname: "utfs.io",
//       },
//     ],
//   },
//   webpack: (config, { isServer }) => {
//     if (!isServer) {
//       config.plugins.push(
//         new BundleAnalyzerPlugin({
//           analyzerMode: "static",
//           reportFilename: "bundle-analyzer-report.html",
//           openAnalyzer: false,
//         })
//       );
//     }

//     return config;
//   },
// };

// module.exports = nextConfig;
