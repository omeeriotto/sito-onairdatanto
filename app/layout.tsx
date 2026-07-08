import type { Metadata } from "next";
import PrivacyConsent from "./PrivacyConsent";
import "./globals.css";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://onairdatanto.it";

const DESCRIPTION =
  "Consulenze social, strategie marketing musicali e formazione per artisti, band, label e realtà musicali. Prenota una call gratuita.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Adriano Carlucci | Consulente Social e Digital Marketing per artisti e band",
    template: "%s | Adriano Carlucci",
  },
  description: DESCRIPTION,
  keywords: [
    "Adriano Carlucci",
    "consulente social per artisti",
    "digital marketing musicale",
    "social media strategy per artisti",
    "marketing per band",
    "consulenza social musica",
    "formazione social media per artisti",
    "strategia lancio musicale",
    "TikTok per artisti",
    "Instagram per musicisti",
    "OnAirDaTanto",
  ],
  authors: [{ name: "Adriano Carlucci" }],
  creator: "Adriano Carlucci",
  publisher: "Adriano Carlucci",
  robots: { index: true, follow: true },
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: "Adriano Carlucci",
    locale: "it_IT",
    url: SITE_URL,
    title: "Adriano Carlucci | Consulente Social e Digital Marketing per artisti e band",
    description: DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: "Adriano Carlucci | Consulente Social e Digital Marketing",
    description: DESCRIPTION,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Adriano Carlucci",
  url: SITE_URL,
  image: `${SITE_URL}/media/adriano-story-profile.jpg`,
  jobTitle: "Consulente Social e Digital Marketing per artistə e band",
  email: "info@adrianocarlucci.it",
  description: DESCRIPTION,
  knowsAbout: [
    "Social media strategy per artisti",
    "Digital marketing musicale",
    "TikTok per artisti",
    "Instagram per musicisti",
    "Strategie lancio musicale",
    "Formazione social media per artisti",
  ],
  areaServed: ["Italia", "Svizzera Italiana", "San Marino"],
  sameAs: [
    "https://www.instagram.com/onairda.tanto/",
    "https://www.linkedin.com/in/adriano-carlucci-aa800a140/",
    "https://hatmusic.it/profile/@omega.r-2au9uuk6",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it" className="h-full">
      <body className="min-h-full">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
        <PrivacyConsent />
      </body>
    </html>
  );
}
