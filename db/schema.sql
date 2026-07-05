-- Schema D1 per i link gestibili dal pannello admin.
-- Replica i campi del vecchio CPT WordPress "link_":
--   title, content(descrizione), featured_image, link, cta_bottone,
--   visibile_si_o_no, ordinamento.

CREATE TABLE IF NOT EXISTS links (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  title       TEXT    NOT NULL,
  description TEXT    NOT NULL DEFAULT '',     -- descrizione (HTML consentito)
  image_key   TEXT,                            -- chiave oggetto su R2 (upload interno)
  image_url   TEXT,                            -- URL immagine esterna (alternativa a R2)
  link        TEXT    NOT NULL DEFAULT '#',    -- URL di destinazione
  cta         TEXT    NOT NULL DEFAULT 'Vai',  -- testo del bottone
  visible     INTEGER NOT NULL DEFAULT 1,      -- 1 = visibile, 0 = nascosto
  sort_order  INTEGER NOT NULL DEFAULT 0,      -- ordinamento ascendente
  created_at  TEXT    NOT NULL DEFAULT (datetime('now')),
  updated_at  TEXT    NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_links_sort ON links (sort_order ASC);
CREATE INDEX IF NOT EXISTS idx_links_visible ON links (visible);

CREATE TABLE IF NOT EXISTS email_subscribers (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  email       TEXT    NOT NULL UNIQUE,
  source      TEXT    NOT NULL DEFAULT 'instagram-profile-guide',
  created_at  TEXT    NOT NULL DEFAULT (datetime('now')),
  updated_at  TEXT    NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_email_subscribers_source
  ON email_subscribers (source);
