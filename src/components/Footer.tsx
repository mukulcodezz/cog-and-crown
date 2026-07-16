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
