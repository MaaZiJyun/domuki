"use client";

import Link from "next/link";
import { revealClass } from "@/components/layout/reveal";
import { useSitePreferences } from "@/components/layout/site-shell";

type ArchiveKind = "document" | "music";

const content = {
  document: {
    index: "02",
    title: "Document",
    jaTitle: "文書",
    en: {
      kicker: "Words, notes, and process",
      description:
        "A quiet place for composition notes, creative fragments, and things worth remembering.",
      status: "The archive is being prepared.",
      back: "Return home",
    },
    ja: {
      kicker: "言葉・記録・制作過程",
      description: "作曲ノート、創作の断片、そして残しておきたいもののための静かな場所です。",
      status: "アーカイブを準備中です。",
      back: "ホームへ戻る",
    },
  },
  music: {
    index: "03",
    title: "Music",
    jaTitle: "音楽",
    en: {
      kicker: "Orchestral works and beyond",
      description:
        "Music shaped by emotion, imagined scenes, and the shifting colours of an orchestra.",
      status: "The listening room is being tuned.",
      back: "Return home",
    },
    ja: {
      kicker: "オーケストラ作品、その先へ",
      description: "感情、思い描いた情景、そしてオーケストラの移ろう色彩から生まれる音楽。",
      status: "リスニングルームを準備中です。",
      back: "ホームへ戻る",
    },
  },
} as const;

export default function ArchivePage({ kind }: { kind: ArchiveKind }) {
  const { language, theme, isReady } = useSitePreferences();
  const page = content[kind];
  const text = page[language];
  const isDark = theme === "dark";
  const accent = isDark ? "text-[#ef4551]" : "text-[#b81522]";
  const muted = isDark ? "text-[#a8a4a7]" : "text-[#68666a]";

  return (
    <main
      className={`relative grid min-h-svh grid-cols-[minmax(0,1fr)_auto] grid-rows-[1fr_auto] overflow-hidden px-[clamp(24px,8vw,130px)] pt-[150px] pb-[68px] max-[820px]:flex max-[820px]:flex-col max-[820px]:justify-center max-[820px]:px-6 max-[820px]:pt-[120px] max-[820px]:pb-[42px] ${
        isDark ? "bg-[#111113]" : "bg-[#f4f4f5]"
      }`}
    >
      <div
        className={`pointer-events-none absolute top-[8%] -right-[10vw] aspect-square w-[min(70vw,960px)] rounded-full ${revealClass(isReady, 1)} ${
          isDark
            ? "bg-[radial-gradient(circle,rgba(239,69,81,0.15),transparent_68%)]"
            : "bg-[radial-gradient(circle,rgba(184,21,34,0.12),transparent_68%)]"
        }`}
        aria-hidden="true"
      />
      <p className={`absolute top-[90px] left-[clamp(24px,8vw,130px)] m-0 text-[10px] tracking-[0.28em] max-[820px]:top-[92px] max-[820px]:left-6 ${revealClass(isReady, 1)} ${muted}`}>
        {page.index}
      </p>
      <section className={`relative z-10 max-w-[860px] self-center ${revealClass(isReady, 2)}`}>
        <p className={`mb-3 text-[10px] font-bold uppercase tracking-[0.24em] ${accent}`}>
          {text.kicker}
        </p>
        <h1
          className={`m-0 text-[clamp(68px,13vw,200px)] leading-[0.82] max-[820px]:text-[clamp(64px,21vw,120px)] ${
            language === "ja"
              ? "[font-family:var(--font-japanese-calligraphy)] font-normal tracking-[0.02em]"
              : "font-semibold tracking-[-0.075em]"
          }`}
        >
          {language === "en" ? page.title : page.jaTitle}
          <span className={accent} aria-hidden="true">.</span>
        </h1>
        <p className={`mt-[clamp(34px,5vw,70px)] max-w-[560px] text-[clamp(16px,1.8vw,25px)] leading-[1.55] max-[820px]:mt-[34px] ${muted}`}>
          {text.description}
        </p>
      </section>

      <div className={`relative z-10 flex items-center gap-3 self-center rounded-full border px-[18px] py-[15px] text-[10px] font-semibold uppercase tracking-[0.12em] max-[820px]:mt-[42px] max-[820px]:self-start ${revealClass(isReady, 4)} ${isDark ? "border-white/20" : "border-black/15"} ${muted}`}>
        <span className={`size-1.5 rounded-full ${isDark ? "bg-[#ef4551] shadow-[0_0_0_5px_rgba(239,69,81,0.15)]" : "bg-[#b81522] shadow-[0_0_0_5px_rgba(184,21,34,0.12)]"}`} />
        <span>{text.status}</span>
      </div>

      <div className={`relative z-10 w-fit max-[820px]:mt-auto max-[820px]:pt-12 ${revealClass(isReady, 5)}`}>
        <Link
          href="/"
          className={`inline-flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.16em] transition-colors hover:text-current ${muted}`}
        >
          <span aria-hidden="true">←</span>
          {text.back}
        </Link>
      </div>
    </main>
  );
}
