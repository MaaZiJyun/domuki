"use client";

import Link from "next/link";
import { deepReinforcementLearning } from "@/lib/documents";
import { revealClass } from "@/components/layout/reveal";
import { useSitePreferences } from "@/components/layout/site-shell";

const copy = {
  en: {
    kicker: "Notes, studies, and process",
    title: "Document",
    intro: "A growing archive of subjects explored in depth.",
    parts: "Parts, chapters & sections",
    open: "Open document",
  },
  ja: {
    kicker: "ノート・研究・制作過程",
    title: "文書",
    intro: "ひとつのテーマを深く掘り下げていく、成長中のアーカイブです。",
    parts: "部・章・節",
    open: "文書を開く",
  },
};

export default function DocumentLibrary() {
  const { language, theme, isReady } = useSitePreferences();
  const text = copy[language];
  const document = deepReinforcementLearning;
  const isDark = theme === "dark";
  const muted = isDark ? "text-[#a8a4a7]" : "text-[#68666a]";
  const accent = isDark ? "text-[#ef4551]" : "text-[#b81522]";

  return (
    <main className={`min-h-svh px-[clamp(24px,7vw,112px)] pt-36 pb-16 ${isDark ? "bg-[#111113]" : "bg-[#f4f4f5]"}`}>
      <div className="mx-auto max-w-[1280px]">
        <div className="grid items-end gap-10 border-b border-current/15 pb-12 md:grid-cols-[1fr_auto]">
          <div className={revealClass(isReady, 1)}>
            <p className={`mb-4 text-[10px] font-bold uppercase tracking-[0.24em] ${accent}`}>
              02 · {text.kicker}
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
          <p className={`mb-1 max-w-[340px] text-base leading-7 ${revealClass(isReady, 2)} ${muted}`}>{text.intro}</p>
        </div>

        <section className={`pt-10 ${revealClass(isReady, 4)}`} aria-label="Documents">
          <Link
            href={`/document/${document.slug}`}
            className={`group grid min-h-[250px] gap-8 border p-[clamp(24px,4vw,52px)] transition duration-300 hover:-translate-y-1 md:grid-cols-[90px_1fr_auto] md:items-center ${
              isDark
                ? "border-white/15 bg-white/[0.025] hover:border-[#ef4551]/60 hover:bg-white/[0.045]"
                : "border-black/15 bg-white/25 hover:border-[#b81522]/60 hover:bg-white/50"
            }`}
          >
            <span className={`text-xs tracking-[0.24em] ${muted}`}>001</span>
            <div>
              <p className={`mb-3 text-[10px] font-bold uppercase tracking-[0.18em] ${accent}`}>
                Deep reinforcement learning
              </p>
              <h2 className="m-0 text-[clamp(36px,6vw,82px)] font-medium tracking-[-0.05em]">
                {document.title}
              </h2>
              <p className={`mt-5 max-w-[650px] text-[15px] leading-7 ${muted}`}>
                {document.description[language]}
              </p>
            </div>
            <div className="flex items-center justify-between gap-8 md:flex-col md:items-end">
              <span className={`text-[10px] font-bold uppercase tracking-[0.14em] ${muted}`}>
                {document.parts.length} {text.parts}
              </span>
              <span className={`text-sm font-bold uppercase tracking-[0.14em] ${accent}`}>
                {text.open} <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
              </span>
            </div>
          </Link>
        </section>
      </div>
    </main>
  );
}
