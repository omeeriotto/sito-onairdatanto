import type { PlatformKey } from "@/lib/platforms";

// Icona SVG monocromatica (usa currentColor). Componente puro: utilizzabile sia
// in server che in client component.
export default function PlatformIcon({
  k,
  size = 72,
}: {
  k: PlatformKey;
  size?: number;
}) {
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    "aria-hidden": true as const,
  };

  switch (k) {
    case "spotify":
      return (
        <svg {...common} fill="currentColor">
          <path d="M12 2a10 10 0 100 20 10 10 0 000-20zm4.6 14.4a.62.62 0 01-.86.21c-2.35-1.44-5.3-1.76-8.79-.96a.62.62 0 11-.28-1.21c3.8-.87 7.07-.5 9.71 1.11.3.18.39.57.22.85zm1.23-2.74a.78.78 0 01-1.07.26c-2.69-1.65-6.79-2.13-9.97-1.17a.78.78 0 11-.45-1.49c3.63-1.1 8.15-.56 11.24 1.33.37.22.49.7.25 1.07zm.1-2.85C14.84 8.93 9.4 8.75 6.3 9.69a.93.93 0 11-.54-1.78c3.56-1.08 9.56-.87 13.34 1.37a.93.93 0 01-.95 1.6z" />
        </svg>
      );
    case "soundcloud":
      return (
        <svg {...common} fill="currentColor">
          <rect x="2.5" y="11" width="1.6" height="5" rx=".8" />
          <rect x="5.5" y="9.5" width="1.6" height="6.5" rx=".8" />
          <rect x="8.5" y="7.5" width="1.6" height="8.5" rx=".8" />
          <rect x="11.5" y="9" width="1.6" height="7" rx=".8" />
          <path d="M15 8.2c.5-.3 1-.2 1 .8V16h2.7a2.65 2.65 0 000-5.3c-.2 0-.4 0-.6.1A3.7 3.7 0 0015 8.2z" />
        </svg>
      );
    case "youtube":
      return (
        <svg {...common} fill="currentColor">
          <path d="M23 12s0-3.4-.43-5.03a2.6 2.6 0 00-1.83-1.84C19.1 4.7 12 4.7 12 4.7s-7.1 0-8.74.43A2.6 2.6 0 001.43 6.97 27.3 27.3 0 001 12c0 1.66.43 5.03.43 5.03a2.6 2.6 0 001.83 1.84C4.9 19.3 12 19.3 12 19.3s7.1 0 8.74-.43a2.6 2.6 0 001.83-1.84C23 15.4 23 12 23 12zM9.75 15.02V8.98L15.5 12l-5.75 3.02z" />
        </svg>
      );
    case "x":
      return (
        <svg {...common} fill="currentColor">
          <path d="M18.24 2.25h3.31l-7.23 8.26 8.5 11.24h-6.66l-5.21-6.82-5.97 6.82H1.66l7.73-8.84L1.23 2.25h6.83l4.71 6.23 5.47-6.23zm-1.16 17.52h1.83L7.01 4.13H5.05l12.03 15.64z" />
        </svg>
      );
    case "instagram":
      return (
        <svg {...common} fill="currentColor">
          <path d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.7 3.7 0 01-1.38-.9 3.7 3.7 0 01-.9-1.38c-.16-.42-.36-1.06-.41-2.23-.06-1.27-.07-1.65-.07-4.85s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41 1.27-.06 1.65-.07 4.85-.07zm0 3.18a6.66 6.66 0 100 13.32 6.66 6.66 0 000-13.32zm0 10.99a4.33 4.33 0 110-8.66 4.33 4.33 0 010 8.66zm6.88-11.25a1.56 1.56 0 11-3.12 0 1.56 1.56 0 013.12 0z" />
        </svg>
      );
    case "tiktok":
    case "applemusic":
      return (
        <svg {...common} fill="currentColor">
          <path d="M9 17a3 3 0 11-2-2.83V5l10-2v9a3 3 0 11-2-2.83V6.3L9 7.6V17z" />
        </svg>
      );
    case "bandcamp":
      return (
        <svg {...common} fill="currentColor">
          <path d="M2 16.5l4-9h16l-4 9H2z" />
        </svg>
      );
    case "gs":
      return (
        <svg {...common} fill="currentColor">
          <path d="M12 2a10 10 0 100 20 10 10 0 000-20zm0 3.6a6.4 6.4 0 015.7 3.5h-3.3a3 3 0 100 5.8h2.2v-2.3H13v-1.9h6.2v3.1A6.4 6.4 0 1112 5.6z" />
        </svg>
      );
    default:
      return (
        <svg {...common} fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="9" />
          <path d="M10 8.5l5.5 3.5-5.5 3.5z" fill="currentColor" stroke="none" />
        </svg>
      );
  }
}
