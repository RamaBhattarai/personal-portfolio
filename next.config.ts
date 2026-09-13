import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // lightningcss ships a native .node addon; keep it (and the Tailwind
  // packages that load it) out of the Server Components bundle so it's
  // resolved with a plain Node.js require instead of being bundled.
  serverExternalPackages: ["lightningcss", "@tailwindcss/node", "@tailwindcss/postcss"],
};

export default nextConfig;
