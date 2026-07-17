import Image from "next/image";
import { useId } from "react";
import { gradeByKey, type GradeKey } from "@/lib/content";

// Portrait tile for a Reliquary. The gold sheen strengthens with the grade's
// `gild`; low grades get a touch more oxblood depth. When `seam` is set and the
// tile sits inside a `.group`, a molten-gold crack draws itself on hover.
// Reused across Home, the Reliquary grid, and the Mint preview.
export default function ReliquaryFrame({
  src,
  grade,
  alt,
  className,
  priority,
  seam,
  sizes = "(max-width: 768px) 50vw, 25vw",
}: {
  src: string;
  grade: GradeKey;
  alt: string;
  className?: string;
  priority?: boolean;
  seam?: boolean;
  sizes?: string;
}) {
  const gild = gradeByKey(grade).gild;
  const gradientId = `seam-${useId().replace(/:/g, "")}`;
  return (
    <div className={`relative overflow-hidden bg-gunmetal-deep ${className ?? ""}`}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        className="object-cover"
        priority={priority}
      />
      <div
        className="pointer-events-none absolute inset-0 mix-blend-soft-light"
        style={{
          background:
            "radial-gradient(130% 90% at 50% 4%, rgba(199,151,46,0.6), transparent 62%)",
          opacity: gild,
        }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 mix-blend-multiply"
        style={{ backgroundColor: "#5C1A1B", opacity: (1 - gild) * 0.15 }}
        aria-hidden
      />

      {seam && (
        <svg
          className="pointer-events-none absolute inset-0 h-full w-full"
          viewBox="0 0 100 125"
          preserveAspectRatio="none"
          aria-hidden
        >
          <defs>
            <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#F0D488" />
              <stop offset="50%" stopColor="#C7972E" />
              <stop offset="100%" stopColor="#8A6A1E" />
            </linearGradient>
          </defs>
          <path
            className="seam-path"
            d="M52 2 L47 24 L55 37 L43 55 L53 74 L46 96 L54 123"
            fill="none"
            stroke={`url(#${gradientId})`}
            strokeWidth="1.4"
            strokeLinecap="round"
            style={{ filter: "drop-shadow(0 0 3px rgba(199,151,46,0.8))" }}
          />
          <path
            className="seam-path"
            d="M53 37 L66 46 M43 55 L30 60 M53 74 L67 84"
            fill="none"
            stroke={`url(#${gradientId})`}
            strokeWidth="1"
            strokeLinecap="round"
            style={{ filter: "drop-shadow(0 0 3px rgba(199,151,46,0.8))", transitionDelay: "0.15s" }}
          />
        </svg>
      )}

      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-gunmetal-deep/85 via-transparent to-transparent"
        aria-hidden
      />
    </div>
  );
}
