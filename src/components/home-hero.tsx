"use client";

import Image from "next/image";
import { useSitePreferences } from "@/components/site-shell";

const copy = {
  en: {
    eyebrow: "Here's Domuki",
    introduction:
      "A novice composer of orchestral music with a passion for creating emotional orchestral music. (There may also be pieces that are not orchestral)",
    explore: "Listen to the music",
    sideNote: "Portfolio · 2026",
  },
  ja: {
    eyebrow: "童夢綺です。",
    introduction:
      "感情を描くオーケストラ音楽の作曲に情熱を注ぐ、駆け出しの作曲家です。（オーケストラ以外の作品もあります）",
    explore: "音楽を聴く",
    sideNote: "ポートフォリオ · 2026",
  },
};

export default function HomeHero() {
  const { language, theme } = useSitePreferences();
  const text = copy[language];
  const isDark = theme === "dark";
  const accent = isDark ? "text-[#ef4551]" : "text-[#b81522]";

  return (
    <main
      className={`relative isolate h-screen min-h-[640px] w-screen overflow-hidden ${
        isDark
          ? "bg-[radial-gradient(circle_at_72%_38%,rgba(239,69,81,0.15),transparent_30%),linear-gradient(120deg,transparent_55%,#29171a_130%)]"
          : "bg-[radial-gradient(circle_at_72%_38%,rgba(184,21,34,0.12),transparent_30%),linear-gradient(120deg,transparent_55%,#eadadd_130%)]"
      }`}
    >
      <div
        className={`absolute inset-x-0 top-[48%] z-10 w-full -translate-x-[0.0742em] -translate-y-1/2 select-none whitespace-nowrap text-center [font-family:var(--font-calligraphy)] text-[clamp(240px,34vw,660px)] leading-[0.78] tracking-[-0.11em] max-[820px]:top-[28%] max-[820px]:text-[clamp(170px,52vw,320px)] ${
          isDark ? "text-[#e5e2de]" : "text-[#242325]"
        }`}
        aria-label="童夢綺"
      >
        童夢綺
      </div>

      <div
        className="pointer-events-none absolute top-1/2 left-[47.5%] z-20 h-screen w-auto -translate-x-1/2 -translate-y-1/2 aspect-[1672/941] drop-shadow-[0_26px_35px_rgba(66,28,31,0.12)] max-[820px]:top-[49%]"
        aria-hidden="true"
      >
        <Image
          src="/domuki_hero.png"
          alt=""
          fill
          priority
          sizes="178vh"
          className="object-contain object-center"
        />
      </div>

      <div
        className={`pointer-events-none absolute inset-x-0 bottom-0 z-[25] h-[46vh] max-[820px]:h-[54vh] ${
          isDark
            ? "bg-[linear-gradient(to_bottom,transparent_0%,rgba(17,17,19,0.72)_58%,#111113_100%)]"
            : "bg-[linear-gradient(to_bottom,transparent_0%,rgba(242,240,236,0.74)_58%,#f2f0ec_100%)]"
        }`}
        aria-hidden="true"
      />

      <p
        className={`absolute bottom-11 left-[clamp(18px,3.5vw,56px)] z-40 m-0 text-[9px] font-semibold uppercase tracking-[0.24em] [writing-mode:vertical-rl] max-[820px]:hidden ${
          isDark ? "text-[#a8a4a7]" : "text-[#68666a]"
        }`}
      >
        {text.sideNote}
      </p>

      <section
        className={`absolute right-[clamp(24px,5vw,84px)] bottom-[clamp(34px,6vw,88px)] z-30 w-[min(420px,calc(100vw-48px))] border-t border-l pt-[22px] pl-6 max-[820px]:inset-x-[22px] max-[820px]:bottom-7 max-[820px]:w-auto max-[820px]:border max-[820px]:p-[18px_20px] max-[820px]:backdrop-blur-xl ${
          isDark
            ? "border-white/40 [text-shadow:0_1px_18px_#111113] max-[820px]:bg-[#111113]/75 max-[820px]:[text-shadow:none]"
            : "border-black/40 [text-shadow:0_1px_18px_#f2f0ec] max-[820px]:bg-[#f2f0ec]/75 max-[820px]:[text-shadow:none]"
        }`}
        aria-label={language === "en" ? "Introduction" : "紹介"}
      >
        <p className={`mb-3 text-[15px] font-bold uppercase tracking-[0.24em] max-[820px]:mb-2 ${accent}`}>
          {text.eyebrow}
        </p>
        <p className="m-0 text-[12px] leading-[1.7] tracking-[0.01em]">
          {text.introduction}
        </p>
      </section>
    </main>
  );
}
