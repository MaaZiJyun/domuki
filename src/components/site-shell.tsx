"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { createContext, useContext, useMemo, useState } from "react";

type Language = "en" | "ja";
type Theme = "light" | "dark";

type Preferences = {
  language: Language;
  theme: Theme;
};

const PreferencesContext = createContext<Preferences>({ language: "en", theme: "light" });

const navigation = [
  { href: "/", en: "Home", ja: "ホーム" },
  { href: "/document", en: "Document", ja: "文書" },
  { href: "/music", en: "Music", ja: "音楽" },
];

export function useSitePreferences() {
  return useContext(PreferencesContext);
}

function SunIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="size-4 fill-none stroke-current stroke-[1.5] [stroke-linecap:round] [stroke-linejoin:round]"
    >
      <circle cx="12" cy="12" r="3.5" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.42 1.42M17.65 17.65l1.42 1.42M2 12h2M20 12h2M4.93 19.07l1.42-1.42M17.65 6.35l1.42-1.42" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="size-4 fill-none stroke-current stroke-[1.5] [stroke-linecap:round] [stroke-linejoin:round]"
    >
      <path d="M20.2 15.2A8.5 8.5 0 0 1 8.8 3.8a8.5 8.5 0 1 0 11.4 11.4Z" />
    </svg>
  );
}

function SiteHeader({
  language,
  theme,
  setLanguage,
  setTheme,
}: {
  language: Language;
  theme: Theme;
  setLanguage: (language: Language) => void;
  setTheme: (theme: Theme) => void;
}) {
  const pathname = usePathname();
  const surface = theme === "dark"
    ? "border-white/20 bg-[#111113]/75 text-[#f1efeb]"
    : "border-black/15 bg-[#f2f0ec]/75 text-[#151517]";
  const muted = theme === "dark" ? "text-[#a8a4a7]" : "text-[#68666a]";

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50 flex h-[84px] items-center justify-between px-[clamp(22px,4vw,68px)] max-[820px]:h-[72px] max-[820px]:px-[18px]">
      <nav
        className={`pointer-events-auto flex items-center gap-[clamp(20px,3vw,48px)] rounded-full border px-10 py-2.5 backdrop-blur-2xl max-[820px]:gap-4 max-[820px]:px-[13px] max-[820px]:py-[9px] ${surface}`}
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
                  ? theme === "dark" ? "text-[#f1efeb]" : "text-[#151517]"
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
          aria-label={language === "en" ? "日本語に切り替える" : "Switch to English"}
        >
          <span className={language === "en" ? theme === "dark" ? "text-white" : "text-black" : "max-[820px]:hidden"}>EN</span>
          <span className="max-[820px]:hidden" aria-hidden="true">/</span>
          <span className={language === "ja" ? theme === "dark" ? "text-white" : "text-black" : "max-[820px]:hidden"}>日</span>
        </button>

        <button
          type="button"
          className={`grid size-[38px] place-items-center rounded-full border backdrop-blur-2xl transition hover:-translate-y-px ${surface}`}
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          aria-label={theme === "light" ? "Switch to dark mode" : "Switch to light mode"}
        >
          {theme === "light" ? <MoonIcon /> : <SunIcon />}
        </button>
      </div>
    </header>
  );
}

export default function SiteShell({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("en");
  const [theme, setTheme] = useState<Theme>("light");
  const preferences = useMemo(() => ({ language, theme }), [language, theme]);

  return (
    <PreferencesContext.Provider value={preferences}>
      <div
        className={`min-h-svh overflow-x-hidden [font-family:'Times_New_Roman',Times,'Yu_Mincho','Hiragino_Mincho_ProN',serif] transition-colors duration-500 selection:text-white ${
          theme === "dark"
            ? "bg-[#111113] text-[#f1efeb] selection:bg-[#ef4551]"
            : "bg-[#f2f0ec] text-[#151517] selection:bg-[#b81522]"
        }`}
        lang={language}
      >
        <SiteHeader
          language={language}
          theme={theme}
          setLanguage={setLanguage}
          setTheme={setTheme}
        />
        {children}
      </div>
    </PreferencesContext.Provider>
  );
}
