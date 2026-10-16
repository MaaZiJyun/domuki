"use client";

import { MoonIcon, SunIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { revealClass } from "@/components/layout/reveal";
import type { Language, Theme } from "@/components/layout/site-shell";

const navigation = [
  { href: "/", en: "Home", ja: "ホーム" },
  { href: "/document", en: "Document", ja: "文書" },
  { href: "/music", en: "Music", ja: "音楽" },
  { href: "/about", en: "About", ja: "紹介" },
];

type SiteHeaderProps = {
  language: Language;
  theme: Theme;
  isReady: boolean;
  setLanguage: (language: Language) => void;
  setTheme: (theme: Theme) => void;
};

export default function SiteHeader({
  language,
  theme,
  isReady,
  setLanguage,
  setTheme,
}: SiteHeaderProps) {
  const pathname = usePathname();
  const surface =
    theme === "dark"
      ? "border-white/20 bg-[#111113]/75 text-[#f1efeb]"
      : "border-black/15 bg-[#f4f4f5]/75 text-[#151517]";
  const muted = theme === "dark" ? "text-[#a8a4a7]" : "text-[#68666a]";

  return (
    <header
      className={`pointer-events-none fixed inset-x-0 top-0 z-50 flex h-[84px] items-center justify-between px-[clamp(22px,4vw,68px)] max-[820px]:h-[72px] max-[820px]:px-[18px] ${revealClass(isReady, 1)}`}
    >
      <nav
        className={`pointer-events-auto flex items-center gap-[clamp(20px,3vw,48px)] rounded-full border px-10 py-2.5 backdrop-blur-2xl max-[820px]:gap-3 max-[820px]:px-3 max-[820px]:py-[9px] ${surface}`}
        aria-label="Primary navigation"
      >
        {navigation.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`relative py-[3px] text-[11px] font-semibold uppercase tracking-[0.12em] transition-colors max-[820px]:text-[9px] ${
                isActive
                  ? theme === "dark"
                    ? "text-[#f1efeb]"
                    : "text-[#151517]"
                  : `${muted} hover:text-current`
              }`}
              aria-current={isActive ? "page" : undefined}
            >
              {language === "en" ? item.en : item.ja}
              {isActive && (
                <span
                  className={`absolute inset-x-0 -bottom-1.5 h-px ${theme === "dark" ? "bg-[#ef4551]" : "bg-[#b81522]"}`}
                  aria-hidden="true"
                />
              )}
            </Link>
          );
        })}
      </nav>

      <div className="pointer-events-auto flex items-center gap-2.5">
        <button
          type="button"
          className={`flex h-[38px] items-center gap-1.5 rounded-full border px-[13px] text-[10px] font-bold tracking-[0.1em] backdrop-blur-2xl transition hover:-translate-y-px ${surface} ${muted} max-[820px]:size-[38px] max-[820px]:justify-center max-[820px]:p-0`}
          onClick={() => setLanguage(language === "en" ? "ja" : "en")}
          aria-label={
            language === "en" ? "日本語に切り替える" : "Switch to English"
          }
        >
          <span
            className={
              language === "en"
                ? theme === "dark"
                  ? "text-white"
                  : "text-black"
                : "max-[820px]:hidden"
            }
          >
            EN
          </span>
          <span className="max-[820px]:hidden" aria-hidden="true">
            /
          </span>
          <span
            className={
              language === "ja"
                ? theme === "dark"
                  ? "text-white"
                  : "text-black"
                : "max-[820px]:hidden"
            }
          >
            日
          </span>
        </button>

        <button
          type="button"
          className={`grid size-[38px] place-items-center rounded-full border backdrop-blur-2xl transition hover:-translate-y-px ${surface}`}
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          aria-label={
            theme === "light" ? "Switch to dark mode" : "Switch to light mode"
          }
        >
          {theme === "light" ? (
            <MoonIcon className="size-4" aria-hidden="true" />
          ) : (
            <SunIcon className="size-4" aria-hidden="true" />
          )}
        </button>
      </div>
    </header>
  );
}
