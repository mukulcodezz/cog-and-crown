"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/mint", label: "Mint" },
  { href: "/roadmap", label: "Roadmap" },
  { href: "/gallery", label: "Gallery" },
  { href: "/lore", label: "Lore" },
  { href: "/partners", label: "Allies" },
];

export default function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const firstLink = menuRef.current?.querySelector<HTMLAnchorElement>("a");
    firstLink?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <nav aria-label="Primary" className="fixed inset-x-0 top-0 z-50 flex h-16 items-center justify-between border-b border-brass/20 bg-gunmetal/95 px-6 backdrop-blur-md md:px-10">
      <Link href="/" className="font-display text-sm font-bold tracking-wide text-brass">
        ASH &amp; GILT
      </Link>
      <button
        type="button"
        aria-expanded={open}
        aria-controls="primary-menu"
        onClick={() => setOpen((value) => !value)}
        className="flex min-h-11 min-w-11 items-center justify-center border border-brass/30 font-mono text-[10px] uppercase tracking-[0.14em] text-ivory md:hidden"
      >
        {open ? "Close" : "Menu"}
      </button>
      <div
        id="primary-menu"
        ref={menuRef}
        className={`${open ? "flex" : "hidden"} absolute inset-x-0 top-16 flex-col border-b border-brass/20 bg-gunmetal-deep p-4 shadow-2xl md:static md:flex md:flex-row md:items-center md:gap-7 md:border-0 md:bg-transparent md:p-0 md:shadow-none`}
      >
        {LINKS.map((l) => {
          const active = pathname === l.href;
          return (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              aria-current={active ? "page" : undefined}
              className={`font-mono text-[11px] uppercase tracking-[0.14em] pb-1.5 whitespace-nowrap border-b transition-colors ${
                active
                  ? "text-brass border-brass"
                  : "text-ivory/55 border-transparent hover:text-verdigris"
              } min-h-11 flex items-center md:min-h-0`}
            >
              {l.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
