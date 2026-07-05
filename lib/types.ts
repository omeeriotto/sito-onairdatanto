/** Riga della tabella `links` su D1. */
export interface LinkRow {
  id: number;
  title: string;
  description: string;
  image_key: string | null;
  image_url: string | null;
  link: string;
  cta: string;
  visible: number;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

/** Link normalizzato per il front-end (immagine già risolta). */
export interface Link {
  id: number;
  title: string;
  description: string;
  image: string | null;
  link: string;
  cta: string;
  visible: boolean;
  sortOrder: number;
}
