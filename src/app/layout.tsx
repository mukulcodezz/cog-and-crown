import type { Metadata } from "next";
import { Playfair_Display, Cardo, Space_Mono } from "next/font/google";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["500", "700", "900"],
});

const cardo = Cardo({
  variable: "--font-cardo",
  subsets: ["latin"],
  style: ["italic", "normal"],
  weight: ["400", "700"],
});

const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://cogandcrown.example"),
  title: {
    default: "Cog & Crown — A Peerage for Every Gear",
    template: "%s · Cog & Crown",
  },
  description:
    "4,096 minted peerages of a clockwork empire on Solana. Bind your title to the Crown.",
  openGraph: {
    title: "Cog & Crown — A Peerage for Every Gear",
    description:
      "4,096 minted peerages of a clockwork empire on Solana. Bind your title to the Crown.",
    images: ["/images/hero-crest.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Cog & Crown",
    description: "4,096 minted peerages of a clockwork empire on Solana.",
    images: ["/images/hero-crest.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${cardo.variable} ${spaceMono.variable} h-full`}
    >
      <body className="min-h-full flex flex-col font-mono bg-gunmetal text-ivory antialiased">
        <div className="grain-overlay" />
        <div className="vignette" />
        <Nav />
        <main className="flex-1 pt-16">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
