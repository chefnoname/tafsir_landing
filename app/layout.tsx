import type { Metadata } from "next";
import "./globals.css";

/* Fonts are loaded via <link> (below) rather than next/font so the project
   builds without network access at build time.
   - Inter: brand secondary typeface (body).
   - Archivo: closest open fallback for the brand's primary typeface,
     Nimbus Sans Extd (licensed, not available on the web). Swap in
     Nimbus Sans Extd via @font-face in globals.css if you hold a web licence.
   - Noto Naskh Arabic: for the Arabic course titles. */

export const metadata: Metadata = {
  title: "Tafsir Ummul Kitaab & Qisaar Suwaar | Ilmi Online",
  description:
    "A new online course unpacking Surah Al-Fatihah (Ummul Kitaab) and the short surahs (Qisaar Suwaar). Starts 28 June. Begin with 1 week free, then £25/month — less than £1 a day.",
  openGraph: {
    title: "Tafsir Ummul Kitaab & Qisaar Suwaar | Ilmi Online",
    description:
      "Starts 28 June. 1 week free with access to all previous lessons, then £25/month — less than £1 a day.",
    url: "https://ilmi.online",
    siteName: "Ilmi Online",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Archivo:wght@600;700;800&family=Inter:wght@400;500;600;700&family=Noto+Naskh+Arabic:wght@500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
