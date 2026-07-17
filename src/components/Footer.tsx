import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-brass/20 px-6 py-8 font-mono text-[11px] tracking-[0.08em] text-ivory/60 md:px-10">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-5">
      <div>© 2026 ASH &amp; GILT // NOTHING WHOLE IS HOLY</div>
      <nav aria-label="Footer" className="flex flex-wrap gap-5">
        <Link href="/lore" className="hover:text-brass">
          SCRIPTURE
        </Link>
        <Link href="/partners" className="hover:text-brass">
          ALLIES
        </Link>
        <Link href="/roadmap" className="hover:text-brass">
          THE MENDING
        </Link>
      </nav>
      </div>
    </footer>
  );
}
