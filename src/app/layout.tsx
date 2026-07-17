import type { Metadata } from "next";
import { Fraunces, EB_Garamond, IBM_Plex_Mono } from "next/font/google";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { getSiteOrigin, SITE_DESCRIPTION, SITE_NAME } from "@/lib/site";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

const ebGaramond = EB_Garamond({
  variable: "--font-eb-garamond",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const siteOrigin = getSiteOrigin();

export const metadata: Metadata = {
  metadataBase: siteOrigin ?? new URL("http://localhost:3000"),
  title: {
    default: `${SITE_NAME} — Nothing Whole Is Holy`,
    template: "%s · Ash & Gilt",
  },
  description: SITE_DESCRIPTION,
  robots: siteOrigin ? { index: true, follow: true } : { index: false, follow: false },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${ebGaramond.variable} ${plexMono.variable} h-full`}
    >
      <body className="min-h-full flex flex-col font-mono bg-gunmetal text-ivory antialiased">
        <a href="#main-content" className="skip-link">Skip to content</a>
        <div className="grain-overlay" />
        <div className="vignette" />
        {siteOrigin && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "WebSite",
                name: SITE_NAME,
                url: siteOrigin.href,
                description: SITE_DESCRIPTION,
              }),
            }}
          />
        )}
        <Nav />
        <main id="main-content" tabIndex={-1} className="flex-1 pt-16">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
