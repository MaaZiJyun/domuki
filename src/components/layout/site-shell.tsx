"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import SiteHeader from "@/components/layout/site-header";
import SiteLoader from "@/components/layout/site-loader";

export type Language = "en" | "ja";
export type Theme = "light" | "dark";

type Preferences = {
  language: Language;
  theme: Theme;
  isReady: boolean;
};

const PreferencesContext = createContext<Preferences>({
  language: "en",
  theme: "light",
  isReady: false,
});

const FONT_VARIABLES = ["--font-calligraphy", "--font-japanese-calligraphy"];
const FONT_SAMPLE = "童夢綺 文書 音楽 Domuki";

function waitForWindowLoad() {
  if (document.readyState === "complete") return Promise.resolve();

  return new Promise<void>((resolve) => {
    window.addEventListener("load", () => resolve(), { once: true });
  });
}

async function waitForFonts() {
  if (!("fonts" in document)) return;

  const rootStyle = getComputedStyle(document.documentElement);
  const fontFamilies = FONT_VARIABLES.map((variable) =>
    rootStyle.getPropertyValue(variable).trim(),
  ).filter(Boolean);

  await Promise.all(
    fontFamilies.map((fontFamily) =>
      document.fonts.load(`1em ${fontFamily}`, FONT_SAMPLE),
    ),
  );
  await document.fonts.ready;
}

async function waitForImages() {
  await Promise.all(
    Array.from(document.images).map(async (image) => {
      if (!image.complete) {
        await new Promise<void>((resolve) => {
          image.addEventListener("load", () => resolve(), { once: true });
          image.addEventListener("error", () => resolve(), { once: true });
          if (image.complete) resolve();
        });
      }

      if (image.decode) {
        await image.decode().catch(() => undefined);
      }
    }),
  );
}

function waitForResources(timeoutMs: number) {
  return new Promise<void>((resolve) => {
    const timeout = window.setTimeout(resolve, timeoutMs);

    Promise.allSettled([waitForWindowLoad(), waitForFonts(), waitForImages()])
      .finally(() => {
        window.clearTimeout(timeout);
        resolve();
      });
  });
}

export function useSitePreferences() {
  return useContext(PreferencesContext);
}

export default function SiteShell({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("en");
  const [theme, setTheme] = useState<Theme>("light");
  const [isReady, setIsReady] = useState(false);
  const preferences = useMemo(
    () => ({ language, theme, isReady }),
    [language, theme, isReady],
  );

  useEffect(() => {
    let isCancelled = false;
    const startedAt = performance.now();

    async function revealSite() {
      await waitForResources(8000);

      const remainingDelay = Math.max(0, 500 - (performance.now() - startedAt));
      if (remainingDelay > 0) {
        await new Promise((resolve) => window.setTimeout(resolve, remainingDelay));
      }

      if (!isCancelled) setIsReady(true);
    }

    void revealSite();

    return () => {
      isCancelled = true;
    };
  }, []);

  return (
    <PreferencesContext.Provider value={preferences}>
      <div
        className={`${isReady ? "min-h-svh" : "h-svh overflow-hidden"} overflow-x-hidden [font-family:'Times_New_Roman',Times,'Yu_Mincho','Hiragino_Mincho_ProN',serif] transition-colors duration-500 selection:text-white ${
          theme === "dark"
            ? "bg-[#111113] text-[#f1efeb] selection:bg-[#ef4551]"
            : "bg-[#f4f4f5] text-[#151517] selection:bg-[#b81522]"
        }`}
        lang={language}
      >
        <div
          className={isReady ? "" : "pointer-events-none"}
          aria-hidden={!isReady}
        >
          <SiteHeader
            language={language}
            theme={theme}
            isReady={isReady}
            setLanguage={setLanguage}
            setTheme={setTheme}
          />
          {children}
        </div>

        <SiteLoader isReady={isReady} />
      </div>
    </PreferencesContext.Provider>
  );
}
