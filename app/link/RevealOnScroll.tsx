"use client";

import { useEffect } from "react";

/** Aggiunge la classe .active alle card quando entrano nel viewport (fade-up). */
export default function RevealOnScroll() {
  useEffect(() => {
    const cards = Array.from(
      document.querySelectorAll<HTMLElement>(".links-page .fade-up")
    );

    if (!("IntersectionObserver" in window)) {
      cards.forEach((c) => c.classList.add("active"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.25 }
    );

    cards.forEach((c) => observer.observe(c));

    // Sicurezza: rivela comunque tutto dopo 1.2s (no card invisibili).
    const fallback = window.setTimeout(() => {
      cards.forEach((c) => c.classList.add("active"));
    }, 1200);

    return () => {
      observer.disconnect();
      window.clearTimeout(fallback);
    };
  }, []);

  return null;
}
