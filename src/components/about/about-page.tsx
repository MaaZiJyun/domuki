"use client";

import Image from "next/image";
import { revealClass } from "@/components/layout/reveal";
import { useSitePreferences } from "@/components/layout/site-shell";

const copy = {
  en: {
    index: "04 · Personal profile",
    title: "About",
    name: "Domuki / 童夢綺",
    introduction:
      "Hello, I’m Domuki, a novice composer with a passion for creating emotional orchestral music.",
    description:
      "I’m drawn to the colours of the orchestra and to music that can carry emotion, stories, and imagined scenes. There may also be works beyond orchestral music.",
    personal:
      "I am an ENTJ personality type. My hobbies include reading, hiking, composing music, and playing violin. My native language is Chinese Mandarin, and I am fluent in English.",
    archive:
      "This website is my personal archive for original music, learning notes, and the creative process behind them.",
    focus: "Composer · Learner · Creator",
  },
  ja: {
    index: "04 · プロフィール",
    title: "紹介",
    name: "童夢綺 / Domuki",
    introduction:
      "童夢綺です。感情を描くオーケストラ音楽の制作に情熱を注ぐ、駆け出しの作曲家です。",
    description:
      "オーケストラの色彩と、感情や物語、想像の情景を伝える音楽に惹かれています。オーケストラ以外の作品を制作することもあります。",
    personal:
      "性格タイプはENTJです。趣味は読書、ハイキング、作曲、ヴァイオリン演奏です。母語は中国語（標準中国語）で、英語も流暢に話せます。",
    archive:
      "このウェブサイトは、オリジナル音楽、学習ノート、そしてその制作過程を残すための個人的なアーカイブです。",
    focus: "作曲 · 学習 · 創作",
  },
};

export default function AboutPage() {
  const { language, theme, isReady } = useSitePreferences();
  const text = copy[language];
  const isDark = theme === "dark";
  const accent = isDark ? "text-[#ef4551]" : "text-[#b81522]";
  const muted = isDark ? "text-[#a8a4a7]" : "text-[#68666a]";

  return (
    <main
      className={`min-h-svh px-[clamp(20px,7vw,112px)] pt-32 pb-16 ${
        isDark ? "bg-[#111113]" : "bg-[#f4f4f5]"
      }`}
    >
      <div className="mx-auto grid min-h-[calc(100svh-12rem)] max-w-[1380px] items-center gap-[clamp(44px,7vw,112px)] lg:grid-cols-[minmax(0,1.15fr)_minmax(340px,0.85fr)]">
        <section>
          <p
            className={`mb-5 text-[10px] font-bold uppercase tracking-[0.24em] ${accent} ${revealClass(isReady, 1)}`}
          >
            {text.index}
          </p>
          <h1
            className={`m-0 text-[clamp(82px,14vw,196px)] leading-[0.78] ${revealClass(isReady, 2)} ${
              language === "ja"
                ? "[font-family:var(--font-japanese-calligraphy)] font-normal tracking-[0.02em]"
                : "font-semibold tracking-[-0.075em]"
            }`}
          >
            {text.title}<span className={accent}>.</span>
          </h1>

          <div
            className={`mt-[clamp(44px,7vw,88px)] max-w-[700px] border-t border-current/15 pt-7 ${revealClass(isReady, 4)}`}
          >
            <p className={`mb-5 text-[11px] font-bold uppercase tracking-[0.2em] ${accent}`}>
              {text.name}
            </p>
            <p className="m-0 text-[clamp(20px,2.4vw,34px)] leading-[1.35] tracking-[-0.025em]">
              {text.introduction}
            </p>
            <div className={`mt-7 max-w-[620px] space-y-4 text-[15px] leading-7 ${muted}`}>
              <p className="m-0">{text.description}</p>
              <p className="m-0">{text.personal}</p>
              <p className="m-0">{text.archive}</p>
            </div>
            <p className={`mt-8 mb-0 text-[10px] font-bold uppercase tracking-[0.2em] ${muted}`}>
              {text.focus}
            </p>
          </div>
        </section>

        <figure className={`relative m-0 mx-auto w-full max-w-[560px] ${revealClass(isReady, 3)}`}>
          <span
            className={`absolute -top-4 -right-4 size-full border ${
              isDark ? "border-[#ef4551]/45" : "border-[#b81522]/40"
            }`}
            aria-hidden="true"
          />
          <div className={`relative aspect-square overflow-hidden border ${isDark ? "border-white/15" : "border-black/15"}`}>
            <Image
              src="/domuki_icon.png"
              alt="Domuki portrait"
              fill
              priority
              sizes="(max-width: 1024px) calc(100vw - 40px), 42vw"
              className="object-cover"
            />
          </div>
          <figcaption className={`mt-4 flex items-center justify-between text-[9px] font-bold uppercase tracking-[0.2em] ${muted}`}>
            <span>Domuki</span>
            <span>Portrait · 2026</span>
          </figcaption>
        </figure>
      </div>
    </main>
  );
}
