// Rileva la "piattaforma" di un link dall'URL, per mostrare un'icona/tinta
// quando il link non ha un'immagine caricata.

export type PlatformKey =
  | "spotify"
  | "soundcloud"
  | "youtube"
  | "x"
  | "instagram"
  | "tiktok"
  | "applemusic"
  | "bandcamp"
  | "gs"
  | "default";

export interface Platform {
  key: PlatformKey;
  label: string;
  color: string;
}

export function detectPlatform(url: string): Platform {
  let host = "";
  try {
    host = new URL(url).hostname.replace(/^www\./, "").toLowerCase();
  } catch {
    /* url non valido */
  }
  const has = (s: string) => host.includes(s);

  if (has("spotify")) return { key: "spotify", label: "Spotify", color: "#1DB954" };
  if (has("soundcloud")) return { key: "soundcloud", label: "SoundCloud", color: "#FF5500" };
  if (has("youtube") || has("youtu.be")) return { key: "youtube", label: "YouTube", color: "#FF0000" };
  if (has("x.com") || has("twitter")) return { key: "x", label: "X", color: "#FFFFFF" };
  if (has("instagram")) return { key: "instagram", label: "Instagram", color: "#E1306C" };
  if (has("tiktok")) return { key: "tiktok", label: "TikTok", color: "#FE2C55" };
  if (has("music.apple") || has("itunes")) return { key: "applemusic", label: "Apple Music", color: "#FA57C1" };
  if (has("bandcamp")) return { key: "bandcamp", label: "Bandcamp", color: "#629AA9" };
  if (has("grimespitterz")) return { key: "gs", label: "Grime Spitterz", color: "#85f71e" };
  return { key: "default", label: "", color: "#85f71e" };
}
