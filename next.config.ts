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
};

export default nextConfig;
