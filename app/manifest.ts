import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Rama Bhattarai — Full Stack Developer",
    short_name: "Rama Bhattarai",
    description: "Portfolio of Rama Bhattarai, a full stack developer building end-to-end web apps.",
    start_url: "/",
    display: "standalone",
    background_color: "#0A0A0A",
    theme_color: "#0A0A0A",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
