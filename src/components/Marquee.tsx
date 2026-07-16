import RankPortrait from "@/components/RankPortrait";
import { PORTRAITS } from "@/lib/content";

export default function Marquee() {
  const strip = [...PORTRAITS, ...PORTRAITS];
  return (
    <div className="overflow-hidden border-y border-brass/15 py-3" aria-hidden>
      <div className="marquee-track flex w-max gap-4">
        {strip.map((p, i) => (
          <RankPortrait
            key={`${p.id}-${i}`}
            src={p.src}
            rank={p.rank}
            alt=""
            className="h-20 w-20 shrink-0 rounded-full border border-brass/25"
          />
        ))}
      </div>
    </div>
  );
}
