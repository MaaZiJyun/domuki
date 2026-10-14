"use client";

import Link from "next/link";
import { deepReinforcementLearning } from "@/lib/documents";
import { useSitePreferences } from "@/components/site-shell";

const copy = {
  en: {
    document: "Document",
    contents: "Contents",
    introduction: "Introduction",
    status: "This chapter is being written.",
    note: "More chapters and sections will be added as these notes develop.",
  },
  ja: {
    document: "文書",
    contents: "目次",
    introduction: "はじめに",
    status: "この章は執筆中です。",
    note: "ノートの進行に合わせて、章と小節を順次追加していきます。",
  },
};

export default function LearningDocument() {
  const { language, theme } = useSitePreferences();
  const text = copy[language];
  const document = deepReinforcementLearning;
  const isDark = theme === "dark";
  const muted = isDark ? "text-[#a8a4a7]" : "text-[#68666a]";
  const accent = isDark ? "text-[#ef4551]" : "text-[#b81522]";
  const panel = isDark ? "border-white/15 bg-white/[0.025]" : "border-black/15 bg-white/30";

  return (
    <main className={`min-h-svh px-[clamp(20px,5vw,80px)] pt-28 pb-20 ${isDark ? "bg-[#111113]" : "bg-[#f2f0ec]"}`}>
      <div className="mx-auto max-w-[1440px]">
        <nav className={`mb-12 flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.16em] ${muted}`} aria-label="Breadcrumb">
          <Link href="/document" className="transition-colors hover:text-current">{text.document}</Link>
          <span aria-hidden="true">/</span>
          <span className={accent}>{document.title}</span>
        </nav>

        <div className="grid gap-12 lg:grid-cols-[300px_minmax(0,1fr)] lg:gap-[clamp(56px,7vw,110px)]">
          <aside className="lg:sticky lg:top-28 lg:h-[calc(100vh-8rem)] lg:overflow-y-auto lg:pr-5">
            <p className={`mb-6 text-[10px] font-bold uppercase tracking-[0.22em] ${accent}`}>
              {text.contents}
            </p>
            <ol className="m-0 space-y-7 p-0">
              {document.chapters.map((chapter) => (
                <li key={chapter.id} className="list-none">
                  <a href={`#${chapter.id}`} className="group flex items-baseline gap-3">
                    <span className={`text-[9px] tracking-[0.16em] ${muted}`}>{chapter.number}</span>
                    <span className="text-sm font-bold">{chapter.title[language]}</span>
                  </a>
                  <ol className={`mt-3 ml-8 space-y-2 border-l pl-4 ${isDark ? "border-white/15" : "border-black/15"}`}>
                    {chapter.sections.map((section) => (
                      <li key={section.id} className="list-none">
                        <a href={`#${section.id}`} className={`text-xs leading-5 transition-colors hover:text-current ${muted}`}>
                          {section.number} · {section.title[language]}
                        </a>
                      </li>
                    ))}
                  </ol>
                </li>
              ))}
            </ol>
          </aside>

          <article className="min-w-0 max-w-[900px]">
            <header className="border-b border-current/15 pb-12">
              <p className={`mb-4 text-[10px] font-bold uppercase tracking-[0.22em] ${accent}`}>
                {document.alternateTitle[language]}
              </p>
              <h1 className="m-0 text-[clamp(52px,8vw,112px)] font-medium leading-[0.95] tracking-[-0.055em]">
                {document.title}
              </h1>
              <p className={`mt-8 max-w-[720px] text-lg leading-8 ${muted}`}>{document.description[language]}</p>
            </header>

            <section className="py-12">
              <h2 className="text-3xl font-medium tracking-[-0.03em]">{text.introduction}</h2>
              <p className={`mt-5 max-w-[680px] leading-8 ${muted}`}>{text.note}</p>
            </section>

            <div className="space-y-10">
              {document.chapters.map((chapter) => (
                <section key={chapter.id} id={chapter.id} className={`scroll-mt-28 border p-[clamp(22px,4vw,44px)] ${panel}`}>
                  <p className={`mb-3 text-[10px] font-bold tracking-[0.2em] ${accent}`}>
                    CHAPTER {chapter.number}
                  </p>
                  <h2 className="m-0 text-[clamp(30px,5vw,56px)] font-medium tracking-[-0.04em]">
                    {chapter.title[language]}
                  </h2>
                  <div className="mt-8 space-y-5">
                    {chapter.sections.map((section) => (
                      <div key={section.id} id={section.id} className="scroll-mt-28 border-t border-current/15 pt-5">
                        <div className="flex items-baseline gap-4">
                          <span className={`text-[10px] tracking-[0.16em] ${muted}`}>{section.number}</span>
                          <h3 className="m-0 text-lg font-medium">{section.title[language]}</h3>
                        </div>
                        <p className={`mt-3 ml-10 text-sm ${muted}`}>{text.status}</p>
                      </div>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          </article>
        </div>
      </div>
    </main>
  );
}
