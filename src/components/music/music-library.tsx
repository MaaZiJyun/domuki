"use client";

import { revealClass } from "@/components/layout/reveal";
import { useSitePreferences } from "@/components/layout/site-shell";
import MusicCard from "@/components/music/music-card";
import { tracks } from "@/components/music/tracks";

const copy = {
  en: {
    index: "03 · Music archive",
    title: "Music",
    introduction: "Original works shaped by stories, history, and orchestral colour.",
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

export default function MusicLibrary() {
  const { language, theme, isReady } = useSitePreferences();
  const text = copy[language];
  const isDark = theme === "dark";
  const accent = isDark ? "text-[#ef4551]" : "text-[#b81522]";
  const muted = isDark ? "text-[#a8a4a7]" : "text-[#68666a]";

  return (
    <main className={`min-h-svh px-[clamp(20px,6vw,96px)] pt-32 pb-20 ${isDark ? "bg-[#111113]" : "bg-[#f2f0ec]"}`}>
      <div className="mx-auto max-w-[1380px]">
        <header className={`grid items-end gap-8 border-b border-current/15 pb-10 md:grid-cols-[1fr_auto] ${revealClass(isReady, 1)}`}>
          <div>
            <p className={`mb-3 text-[10px] font-bold uppercase tracking-[0.24em] ${accent}`}>
              {text.index}
            </p>
            <h1
              className={`m-0 text-[clamp(76px,13vw,190px)] leading-[0.78] ${
                language === "ja"
                  ? "[font-family:var(--font-japanese-calligraphy)] font-normal tracking-[0.02em]"
                  : "font-semibold tracking-[-0.075em]"
              }`}
            >
              {text.title}<span className={accent}>.</span>
            </h1>
          </div>
          <div className="max-w-[390px] md:text-right">
            <p className={`m-0 text-base leading-7 ${muted}`}>{text.introduction}</p>
            <p className={`mt-3 mb-0 text-[10px] font-bold uppercase tracking-[0.18em] ${accent}`}>
              {text.works}
            </p>
          </div>
        </header>

        <div className="mt-12 space-y-12">
          {tracks.map((track, index) => (
            <MusicCard
              key={track.id}
              track={track}
              language={language}
              isDark={isDark}
              isReady={isReady}
              revealDelay={index === 0 ? 3 : 5}
              labels={text}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
