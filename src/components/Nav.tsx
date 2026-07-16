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
