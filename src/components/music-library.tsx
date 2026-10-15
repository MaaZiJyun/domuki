"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { PauseIcon, PlayIcon } from "@heroicons/react/24/solid";
import { SpeakerWaveIcon, SpeakerXMarkIcon } from "@heroicons/react/24/outline";
import { revealClass, useSitePreferences } from "@/components/site-shell";

const tracks = [
  {
    id: "the-long-march",
    index: "01",
    titleEn: "The Long March",
    titleZh: "长征",
    date: "2026.03.06",
    ganZhiDate: "丙午年 辛卯月 己卯日",
    duration: "03:33",
    cover: "/music/the_long_march/the_long_march_cover.png",
    audio: "/music/the_long_march/长征.mp3",
    lyrics: [
      [
        "当年忠贞为国酬，",
        "视死如归志不休。",
        "而今天下尽红遍，",
        "此后江山谁人守？",
        "谁人守？",
      ],
      [
        "功业未成身躯朽，",
        "风霜无情染白头。",
        "初心未改今犹在，",
        "怎忍夙愿付东流？",
        "付东流？",
      ],
    ],
  },
  {
    id: "wrangler",
    index: "02",
    titleEn: "Wrangler",
    titleZh: "牧",
    date: "2026.10.03",
    ganZhiDate: "丙午年 丁酉月 庚戌日",
    duration: "01:46",
    cover: "/music/wrangler/wrangler_cover.png",
    audio: "/music/wrangler/牡.mp3",
    lyrics: [
      [
        "玄鸟西垂，渭水汤汤。",
        "肇基于野，厥土蛮荒。",
        "鼎簋既覆，烽燧荡荡。",
        "寸草弥坚，岁岁其昌。",
      ],
      [
        "一木徙立，众庶攸望。",
        "且耕且战，黍稷壤壤。",
        "西拓三川，南涉汉江。",
        "其志渐广，其弓欲张。",
      ],
      [
        "六世余烈，夙心不忘。",
        "载涉寒露，不惧严霜。",
        "大河东流，浩浩汤汤。",
        "既定六合，四海一方。",
      ],
      [
        "六世余烈，夙心不忘。",
        "道阻且长，行路未央。",
        "川流不息，萬古苍苍。",
        "千秋月明，入我新窗。",
      ],
    ],
  },
] as const;

const copy = {
  en: {
    index: "03 · Music archive",
    title: "Music",
    introduction:
      "Original works shaped by stories, history, and orchestral colour.",
    works: "2 works",
    date: "Date",
    author: "Author",
    lyrics: "Lyrics",
  },
  ja: {
    index: "03 · 音楽作品集",
    title: "音楽",
    introduction: "物語、歴史、そしてオーケストラの色彩から生まれた作品。",
    works: "2作品",
    date: "制作日",
    author: "作者",
    lyrics: "歌詞",
  },
};

function formatTime(seconds: number) {
  if (!Number.isFinite(seconds)) return "0:00";

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
}

function AudioPlayer({
  src,
  title,
  fallbackDuration,
  isDark,
}: {
  src: string;
  title: string;
  fallbackDuration: string;
  isDark: boolean;
}) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const progress =
    duration > 0 ? Math.min((currentTime / duration) * 100, 100) : 0;

  async function togglePlayback() {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused) {
      await audio.play();
    } else {
      audio.pause();
    }
  }

  function seek(nextTime: number) {
    const audio = audioRef.current;
    if (!audio) return;

    audio.currentTime = nextTime;
    setCurrentTime(nextTime);
  }

  return (
    <div
      className={`mt-5`}
    >
      <audio
        ref={audioRef}
        preload="metadata"
        src={src}
        onLoadedMetadata={(event) => setDuration(event.currentTarget.duration)}
        onDurationChange={(event) => setDuration(event.currentTarget.duration)}
        onTimeUpdate={(event) =>
          setCurrentTime(event.currentTarget.currentTime)
        }
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onEnded={() => setIsPlaying(false)}
      >
        Your browser does not support the audio element.
      </audio>

      <div className="flex min-w-0 items-center gap-3">
        <button
          type="button"
          onClick={togglePlayback}
          className="grid size-11 shrink-0 place-items-center rounded-full bg-[#b81522] text-white transition duration-300 hover:scale-105 hover:bg-[#d11d2b] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#b81522] active:scale-95"
          aria-label={isPlaying ? `Pause ${title}` : `Play ${title}`}
        >
          {isPlaying ? (
            <PauseIcon className="size-4" aria-hidden="true" />
          ) : (
            <PlayIcon className="size-4 translate-x-px" aria-hidden="true" />
          )}
        </button>

        <div className="min-w-0 flex-1">
          <div className="mb-1 flex items-center justify-between gap-3 text-[9px] font-bold uppercase tracking-[0.16em]">
            <span className={isDark ? "text-[#a8a4a7]" : "text-[#68666a]"}>
              <span className="tabular-nums text-current">
                {formatTime(currentTime)}
              </span>
              <span className="mx-1.5 opacity-45">/</span>
              <span className="tabular-nums text-current">
                {duration ? formatTime(duration) : fallbackDuration}
              </span>
            </span>
          </div>

          <div className="relative flex h-5 items-center">
            <span
              className={`absolute inset-x-0 h-px ${isDark ? "bg-white/20" : "bg-black/20"}`}
            />
            <span
              className={`absolute left-0 h-[2px] ${isDark ? "bg-[#ef4551]" : "bg-[#b81522]"}`}
              style={{ width: `${progress}%` }}
            />
            <span
              className={`pointer-events-none absolute size-2.5 -translate-x-1/2 rounded-full border-2 ${
                isDark
                  ? "border-[#111113] bg-[#ef4551]"
                  : "border-[#f2f0ec] bg-[#b81522]"
              }`}
              style={{ left: `${progress}%` }}
            />
            <input
              type="range"
              min="0"
              max={duration || 1}
              step="0.01"
              value={Math.min(currentTime, duration || 1)}
              onChange={(event) => seek(Number(event.target.value))}
              className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
              aria-label={`Seek through ${title}`}
              aria-valuetext={`${formatTime(currentTime)} of ${duration ? formatTime(duration) : fallbackDuration}`}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function MusicLibrary() {
  const { language, theme, isReady } = useSitePreferences();
  const text = copy[language];
  const isDark = theme === "dark";
  const accent = isDark ? "text-[#ef4551]" : "text-[#b81522]";
  const muted = isDark ? "text-[#a8a4a7]" : "text-[#68666a]";
  const panel = isDark
    ? "border-white/15 bg-white/[0.025]"
    : "border-black/15 bg-white/30";

  return (
    <main
      className={`min-h-svh px-[clamp(20px,6vw,96px)] pt-32 pb-20 ${isDark ? "bg-[#111113]" : "bg-[#f2f0ec]"}`}
    >
      <div className="mx-auto max-w-[1380px]">
        <header
          className={`grid items-end gap-8 border-b border-current/15 pb-10 md:grid-cols-[1fr_auto] ${revealClass(isReady, 1)}`}
        >
          <div>
            <p
              className={`mb-3 text-[10px] font-bold uppercase tracking-[0.24em] ${accent}`}
            >
              {text.index}
            </p>
            <h1
              className={`m-0 text-[clamp(76px,13vw,190px)] leading-[0.78] ${
                language === "ja"
                  ? "[font-family:var(--font-japanese-calligraphy)] font-normal tracking-[0.02em]"
                  : "font-semibold tracking-[-0.075em]"
              }`}
            >
              {text.title}
              <span className={accent}>.</span>
            </h1>
          </div>
          <div className="max-w-[390px] md:text-right">
            <p className={`m-0 text-base leading-7 ${muted}`}>
              {text.introduction}
            </p>
            <p
              className={`mt-3 mb-0 text-[10px] font-bold uppercase tracking-[0.18em] ${accent}`}
            >
              {text.works}
            </p>
          </div>
        </header>

        <div className="mt-12 space-y-12">
          {tracks.map((track, index) => (
            <article
              key={track.id}
              className={`grid h-[860px] grid-rows-[auto_minmax(0,1fr)] overflow-hidden border md:h-[clamp(360px,42vw,440px)] md:grid-cols-[clamp(360px,42vw,440px)_minmax(0,1fr)] md:grid-rows-1 ${panel} ${revealClass(isReady, index === 0 ? 3 : 5)}`}
            >
              <div className="relative aspect-square min-h-0 overflow-hidden border-b border-current/15 md:aspect-auto md:border-r md:border-b-0">
                <Image
                  src={track.cover}
                  alt={`${track.titleEn} / ${track.titleZh} cover`}
                  fill
                  loading="eager"
                  sizes="(max-width: 1024px) 100vw, 390px"
                  className="object-cover"
                />
                <span className="absolute top-4 left-4 grid size-9 place-items-center border border-white/35 bg-black/45 text-[9px] tracking-[0.14em] text-white backdrop-blur-sm">
                  {track.index}
                </span>
              </div>

              <div className="grid min-h-0 min-w-0 grid-rows-[auto_minmax(0,1fr)] gap-6 overflow-hidden p-[clamp(18px,3vw,36px)] md:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] md:grid-rows-1">
                <div className="min-w-0">
                  <p
                    className={`m-0 text-[10px] font-bold uppercase tracking-[0.2em] ${accent}`}
                  >
                    Original work · {track.duration}
                  </p>
                  <h2 className="mt-2 mb-0 text-[clamp(36px,5vw,64px)] leading-[0.9] font-medium tracking-[-0.055em]">
                    {language === "en" ? track.titleEn : track.titleZh}
                  </h2>
                  <p className={`mt-2 mb-0 text-xl ${muted}`}>
                    {language === "en" ? track.titleZh : track.titleEn}
                  </p>

                  <dl className="mt-5 space-y-3 border-y border-current/10 py-4 text-xs">
                    <div>
                      <dt
                        className={`mb-1 text-[9px] font-bold uppercase tracking-[0.16em] ${muted}`}
                      >
                        {text.date}
                      </dt>
                      <dd className="m-0 leading-6">
                        <time dateTime={track.date.replaceAll(".", "-")}>
                          {track.date}
                        </time>
                        <span className={`mx-2 ${muted}`}>/</span>
                        <span>{track.ganZhiDate}</span>
                      </dd>
                    </div>
                    <div>
                      <dt
                        className={`mb-1 text-[9px] font-bold uppercase tracking-[0.16em] ${muted}`}
                      >
                        {text.author}
                      </dt>
                      <dd className="m-0">
                        Domuki <span className={`mx-2 ${muted}`}>/</span> 童梦绮
                      </dd>
                    </div>
                  </dl>

                  <AudioPlayer
                    src={track.audio}
                    title={`${track.titleEn} / ${track.titleZh}`}
                    fallbackDuration={track.duration}
                    isDark={isDark}
                  />
                </div>

                <section
                  className="flex min-h-0 min-w-0 flex-col overflow-hidden border-t border-current/10 pt-6 md:border-t-0 md:border-l md:pt-0 md:pl-6"
                  aria-labelledby={`${track.id}-lyrics`}
                >
                  <h3
                    id={`${track.id}-lyrics`}
                    className={`m-0 text-[10px] font-bold uppercase tracking-[0.2em] ${accent}`}
                  >
                    {text.lyrics}
                  </h3>
                  <div className="mt-5 min-h-0 flex-1 space-y-5 overflow-x-hidden overflow-y-auto overscroll-contain pr-3 pb-3 [scrollbar-gutter:stable] [font-family:var(--font-lyrics)] text-[clamp(15px,1.35vw,19px)] leading-[1.9] tracking-[0.08em]">
                    {track.lyrics.map((stanza, stanzaIndex) => (
                      <p
                        key={`${track.id}-stanza-${stanzaIndex}`}
                        className="m-0"
                      >
                        {stanza.map((line, lineIndex) => (
                          <span
                            key={`${track.id}-${stanzaIndex}-${lineIndex}`}
                            className="block"
                          >
                            {line}
                          </span>
                        ))}
                      </p>
                    ))}
                  </div>
                </section>
              </div>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
