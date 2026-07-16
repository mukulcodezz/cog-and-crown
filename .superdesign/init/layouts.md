# Layouts

## Root layout — `src/app/layout.tsx`
Wraps every page. Sets fonts, base metadata/OG/Twitter tags, grain + vignette overlays, Nav, Footer, `pt-16` main offset for the fixed nav.

```tsx
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
```

## Nav — `src/components/Nav.tsx`
Client component (needs `usePathname` for active-link state). Fixed top, 64px tall, blurred translucent background, 6 links, brass underline on active.

```tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/mint", label: "Mint" },
  { href: "/roadmap", label: "Roadmap" },
  { href: "/gallery", label: "Gallery" },
  { href: "/lore", label: "Lore" },
  { href: "/partners", label: "Partners" },
];

export default function Nav() {
  const pathname = usePathname();

  return (
    <nav className="fixed inset-x-0 top-0 z-50 flex h-16 items-center justify-between border-b border-brass/20 bg-gunmetal/85 px-6 backdrop-blur-md md:px-10">
      <Link href="/" className="font-display text-sm font-bold tracking-wide text-brass">
        COG &amp; CROWN
      </Link>
      <div className="flex items-center gap-4 overflow-x-auto md:gap-7">
        {LINKS.map((l) => {
          const active = pathname === l.href;
          return (
            <Link
              key={l.href}
              href={l.href}
              className={`font-mono text-[11px] uppercase tracking-[0.14em] pb-1.5 whitespace-nowrap border-b transition-colors ${
                active
                  ? "text-brass border-brass"
                  : "text-ivory/55 border-transparent hover:text-verdigris"
              }`}
            >
              {l.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
```

## Footer — `src/components/Footer.tsx`

```tsx
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="flex flex-wrap items-center justify-between gap-4 border-t border-brass/20 px-6 py-8 font-mono text-[10px] tracking-[0.1em] text-ivory/40 md:px-10">
      <div>© 2026 COG &amp; CROWN // THE MECHANISM WINDS ON</div>
      <div className="flex gap-5">
        <Link href="/partners" className="hover:text-brass">
          PARTNERS
        </Link>
        <Link href="/roadmap" className="hover:text-brass">
          ROADMAP
        </Link>
      </div>
    </footer>
  );
}
```
