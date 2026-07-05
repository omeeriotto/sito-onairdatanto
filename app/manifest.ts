import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Adriano Carlucci",
    short_name: "Adriano Carlucci",
    description:
      "Consulente Social e Digital Marketing per artisti, band e realtà musicali.",
    start_url: "/",
    display: "standalone",
    background_color: "#0c0c10",
    theme_color: "#0c0c10",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
