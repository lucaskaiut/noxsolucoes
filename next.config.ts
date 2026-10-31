import type { NextConfig } from "next";

const cmsHostname = process.env.CMS_IMAGE_HOSTNAME;

type RemotePattern = {
  protocol?: "http" | "https";
  hostname: string;
  port?: string;
  pathname?: string;
};

const remotePatterns: RemotePattern[] = [
  {
    protocol: "https",
    hostname: "placehold.co",
  },
  {
    // Fotos dos autores das avaliações do Google
    protocol: "https",
    hostname: "lh3.googleusercontent.com",
  },
];

if (cmsHostname) {
  remotePatterns.push({
    protocol: "https",
    hostname: cmsHostname.replace(/^https?:\/\//, "").replace(/\/$/, ""),
  });
}

const nextConfig: NextConfig = {
  images: {
    remotePatterns,
  },
  async redirects() {
    return [
      { source: "/cases/webraster", destination: "/cases/vigia", permanent: true },
    ];
  },
  async rewrites() {
    return [
      // Protótipo navegável do HabitaFlow (HTML estático em public/habitaflow)
      { source: "/habitaflow", destination: "/habitaflow/index.html" },
    ];
  },
};

export default nextConfig;
