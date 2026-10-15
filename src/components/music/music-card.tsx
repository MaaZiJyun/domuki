import Image from "next/image";
import { revealClass, type RevealDelay } from "@/components/layout/reveal";
import type { Language } from "@/components/layout/site-shell";
import AudioPlayer from "@/components/music/audio-player";
import type { MusicTrack } from "@/components/music/tracks";

type MusicCardProps = {
  track: MusicTrack;
  language: Language;
  isDark: boolean;
  isReady: boolean;
  revealDelay: RevealDelay;
  labels: { date: string; author: string; lyrics: string };
};

export default function MusicCard({
  track,
  language,
  isDark,
  isReady,
  revealDelay,
  labels,
}: MusicCardProps) {
  const accent = isDark ? "text-[#ef4551]" : "text-[#b81522]";
  const muted = isDark ? "text-[#a8a4a7]" : "text-[#68666a]";
  const panel = isDark ? "border-white/15 bg-white/[0.025]" : "border-black/15 bg-white/30";

  return (
    <article className={`grid h-[860px] grid-rows-[auto_minmax(0,1fr)] overflow-hidden border md:h-[clamp(360px,42vw,440px)] md:grid-cols-[clamp(360px,42vw,440px)_minmax(0,1fr)] md:grid-rows-1 ${panel} ${revealClass(isReady, revealDelay)}`}>
      <div className="relative aspect-square min-h-0 overflow-hidden border-b border-current/15 md:aspect-auto md:border-r md:border-b-0">
        <Image src={track.cover} alt={`${track.titleEn} / ${track.titleZh} cover`} fill loading="eager" sizes="(max-width: 1024px) 100vw, 390px" className="object-cover" />
        <span className="absolute top-4 left-4 grid size-9 place-items-center border border-white/35 bg-black/45 text-[9px] tracking-[0.14em] text-white backdrop-blur-sm">
          {track.index}
        </span>
      </div>

      <div className="grid min-h-0 min-w-0 grid-rows-[auto_minmax(0,1fr)] gap-6 overflow-hidden p-[clamp(18px,3vw,36px)] md:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] md:grid-rows-1">
        <div className="min-w-0">
          <p className={`m-0 text-[10px] font-bold uppercase tracking-[0.2em] ${accent}`}>Original work · {track.duration}</p>
          <h2 className="mt-2 mb-0 text-[clamp(36px,5vw,64px)] leading-[0.9] font-medium tracking-[-0.055em]">
            {language === "en" ? track.titleEn : track.titleZh}
          </h2>
          <p className={`mt-2 mb-0 text-xl ${muted}`}>{language === "en" ? track.titleZh : track.titleEn}</p>

          <dl className="mt-5 space-y-3 border-y border-current/10 py-4 text-xs">
            <div>
              <dt className={`mb-1 text-[9px] font-bold uppercase tracking-[0.16em] ${muted}`}>{labels.date}</dt>
              <dd className="m-0 leading-6">
                <time dateTime={track.date.replaceAll(".", "-")}>{track.date}</time>
                <span className={`mx-2 ${muted}`}>/</span>
                <span>{track.ganZhiDate}</span>
              </dd>
            </div>
            <div>
              <dt className={`mb-1 text-[9px] font-bold uppercase tracking-[0.16em] ${muted}`}>{labels.author}</dt>
              <dd className="m-0">Domuki <span className={`mx-2 ${muted}`}>/</span> 童梦绮</dd>
            </div>
          </dl>

          <AudioPlayer src={track.audio} title={`${track.titleEn} / ${track.titleZh}`} fallbackDuration={track.duration} isDark={isDark} />
        </div>

        <section className="flex min-h-0 min-w-0 flex-col overflow-hidden border-t border-current/10 pt-6 md:border-t-0 md:border-l md:pt-0 md:pl-6" aria-labelledby={`${track.id}-lyrics`}>
          <h3 id={`${track.id}-lyrics`} className={`m-0 text-[10px] font-bold uppercase tracking-[0.2em] ${accent}`}>
            {labels.lyrics}
          </h3>
          <div className="mt-5 min-h-0 flex-1 space-y-5 overflow-x-hidden overflow-y-auto overscroll-contain pr-3 pb-3 [scrollbar-gutter:stable] [font-family:var(--font-lyrics)] text-[clamp(15px,1.35vw,19px)] leading-[1.9] tracking-[0.08em]">
            {track.lyrics.map((stanza, stanzaIndex) => (
              <p key={`${track.id}-stanza-${stanzaIndex}`} className="m-0">
                {stanza.map((line, lineIndex) => (
                  <span key={`${track.id}-${stanzaIndex}-${lineIndex}`} className="block">{line}</span>
                ))}
              </p>
            ))}
          </div>
        </section>
      </div>
    </article>
  );
}
