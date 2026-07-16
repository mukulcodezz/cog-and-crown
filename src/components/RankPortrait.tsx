import Image from "next/image";
import { rankByKey, type RankKey } from "@/lib/content";

export default function RankPortrait({
  src,
  rank,
  alt,
  className,
}: {
  src: string;
  rank: RankKey;
  alt: string;
  className?: string;
}) {
  const tint = rankByKey(rank).tint;
  return (
    <div className={`relative overflow-hidden bg-gunmetal-deep ${className ?? ""}`}>
      <Image src={src} alt={alt} fill sizes="(max-width: 768px) 50vw, 25vw" className="object-cover" />
      <div
        className="absolute inset-0 mix-blend-multiply"
        style={{ backgroundColor: "#5C1A1B", opacity: tint }}
        aria-hidden
      />
      <div
        className="absolute inset-0 bg-gradient-to-t from-gunmetal-deep/70 via-transparent to-transparent"
        aria-hidden
      />
    </div>
  );
}
