"use client";

import Link from "next/link";
import { deepReinforcementLearning } from "@/lib/documents";
import LinearModelsContent from "@/components/document/deep-reinforcement-learning/linear-models-content";
import { revealClass } from "@/components/layout/reveal";
import { useSitePreferences } from "@/components/layout/site-shell";

const copy = {
  en: {
    document: "Document",
    contents: "Contents",
    introduction: "Introduction",
    status: "This content is being written.",
    note: "More parts, chapters, sections, and subsections will be added as these notes develop.",
  },
  ja: {
    document: "文書",
    contents: "目次",
    introduction: "はじめに",
    status: "この内容は執筆中です。",
    note: "ノートの進行に合わせて、部・章・節・小節を順次追加していきます。",
  },
};

export default function LearningDocument() {
  const { language, theme, isReady } = useSitePreferences();
  const text = copy[language];
  const document = deepReinforcementLearning;
  const isDark = theme === "dark";
  const muted = isDark ? "text-[#a8a4a7]" : "text-[#68666a]";
  const accent = isDark ? "text-[#ef4551]" : "text-[#b81522]";
  const panel = isDark ? "border-white/15 bg-white/[0.025]" : "border-black/15 bg-white/30";

  return (
    <main className={`h-svh overflow-hidden px-[clamp(20px,5vw,80px)] pt-28 pb-6 ${isDark ? "bg-[#111113]" : "bg-[#f2f0ec]"}`}>
      <div className="mx-auto flex h-full min-h-0 max-w-[1440px] flex-col">
        <nav className={`mb-7 flex shrink-0 items-center gap-3 text-[10px] font-bold uppercase tracking-[0.16em] ${revealClass(isReady, 1)} ${muted}`} aria-label="Breadcrumb">
          <Link href="/document" className="transition-colors hover:text-current">{text.document}</Link>
          <span aria-hidden="true">/</span>
          <span className={accent}>{document.title}</span>
        </nav>

        <div className="grid min-h-0 flex-1 grid-rows-[minmax(150px,30vh)_minmax(0,1fr)] gap-7 lg:grid-cols-[300px_minmax(0,1fr)] lg:grid-rows-1 lg:gap-[clamp(42px,5vw,80px)]">
          <aside className={`min-h-0 overflow-x-hidden overflow-y-auto overscroll-contain border-b border-current/10 pr-3 pb-7 [scrollbar-gutter:stable] lg:border-r lg:border-b-0 lg:pr-7 ${revealClass(isReady, 2)}`}>
            <p className={`mb-6 text-[10px] font-bold uppercase tracking-[0.22em] ${accent}`}>
              {text.contents}
            </p>
            <ol className="m-0 space-y-7 p-0">
              {document.parts.map((part) => (
                <li key={part.id} className="list-none">
                  <a href={`#${part.id}`} className="group flex items-baseline gap-3">
                    <span className={`text-[9px] tracking-[0.16em] ${muted}`}>{part.number}</span>
                    <span className="text-sm font-bold">{part.title[language]}</span>
                  </a>
                  <ol className={`mt-3 ml-8 space-y-3 border-l pl-4 ${isDark ? "border-white/15" : "border-black/15"}`}>
                    {part.chapters.map((chapter) => (
                      <li key={chapter.id} className="list-none">
                        <a href={`#${chapter.id}`} className={`block text-xs font-semibold leading-5 transition-colors hover:text-current ${muted}`}>
                          {chapter.number} · {chapter.title[language]}
                        </a>
                        <ol className="mt-1.5 ml-3 space-y-1.5 p-0">
                          {chapter.sections.map((section) => (
                            <li key={section.id} className="list-none">
                              <a
                                href={`#${section.id}`}
                                className={`block text-[11px] leading-5 transition-colors hover:text-current ${muted}`}
                              >
                                {section.number} · {section.title[language]}
                              </a>
                            </li>
                          ))}
                        </ol>
                      </li>
                    ))}
                  </ol>
                </li>
              ))}
            </ol>
          </aside>

          <article className="min-h-0 min-w-0 w-full max-w-[900px] overflow-x-hidden overflow-y-auto overscroll-contain pr-2 pb-20 [scrollbar-gutter:stable] lg:pr-5">
            <header className={`border-b border-current/15 pb-12 ${revealClass(isReady, 3)}`}>
              <p className={`mb-4 text-[10px] font-bold uppercase tracking-[0.22em] ${accent}`}>
                {document.alternateTitle[language]}
              </p>
              <h1 className="m-0 text-[clamp(52px,8vw,112px)] font-medium leading-[0.95] tracking-[-0.055em]">
                {document.title}
              </h1>
              <p className={`mt-8 max-w-[720px] text-lg leading-8 ${muted}`}>{document.description[language]}</p>
            </header>

            <section className={`py-12 ${revealClass(isReady, 4)}`}>
              <h2 className="text-3xl font-medium tracking-[-0.03em]">{text.introduction}</h2>
              <p className={`mt-5 max-w-[680px] leading-8 ${muted}`}>{text.note}</p>
            </section>

            <div className={`space-y-10 ${revealClass(isReady, 5)}`}>
              {document.parts.map((part) => (
                <section key={part.id} id={part.id} className={`scroll-mt-28 border p-[clamp(22px,4vw,44px)] ${panel}`}>
                  <p className={`mb-3 text-[10px] font-bold tracking-[0.2em] ${accent}`}>
                    PART {part.number}
                  </p>
                  <h2 className="m-0 text-[clamp(30px,5vw,56px)] font-medium tracking-[-0.04em]">
                    {part.title[language]}
                  </h2>
                  {part.chapters.length === 0 ? (
                    <p className={`mt-6 text-sm ${muted}`}>{text.status}</p>
                  ) : (
                    <div className="mt-8 space-y-10">
                      {part.chapters.map((chapter) => (
                        <section key={chapter.id} id={chapter.id} className="scroll-mt-28 border-t border-current/15 pt-6">
                          <div className="flex items-baseline gap-4">
                            <span className={`text-[10px] tracking-[0.16em] ${muted}`}>{chapter.number}</span>
                            <h3 className="m-0 text-2xl font-medium">{chapter.title[language]}</h3>
                          </div>
                          <div className="mt-4 ml-10 divide-y divide-current/10">
                            {chapter.sections.map((section) => (
                              <div key={section.id} id={section.id} className="scroll-mt-28 py-4 first:pt-0">
                                <div className="flex items-baseline gap-4">
                                  <span className={`text-[9px] tracking-[0.14em] ${muted}`}>{section.number}</span>
                                  <h4 className="m-0 text-base font-medium">{section.title[language]}</h4>
                                </div>
                                {section.id === "linear-models" ? (
                                  <LinearModelsContent />
                                ) : section.subsections.length === 0 ? (
                                  <p className={`mt-2 text-sm ${muted}`}>{text.status}</p>
                                ) : (
                                  <div className="mt-3 ml-8 space-y-3">
                                    {section.subsections.map((subsection) => (
                                      <div key={subsection.id} id={subsection.id} className="scroll-mt-28">
                                        <span className={`mr-3 text-[9px] tracking-[0.14em] ${muted}`}>
                                          {subsection.number}
                                        </span>
                                        <h5 className="inline text-sm font-medium">{subsection.title[language]}</h5>
                                      </div>
                                    ))}
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        </section>
                      ))}
                    </div>
                  )}
                </section>
              ))}
            </div>
          </article>
        </div>
      </div>
    </main>
  );
}
