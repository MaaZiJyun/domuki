"use client";

import { useEffect, useState, type RefObject } from "react";

export default function useActiveReadingSection(
  contentRef: RefObject<HTMLElement | null>,
  contentsRef: RefObject<HTMLElement | null>,
) {
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const content = contentRef.current;
    if (!content) return;
    const contentElement: HTMLElement = content;

    let animationFrame = 0;

    function updateActiveSection() {
      animationFrame = 0;
      const sections = Array.from(
        contentElement.querySelectorAll<HTMLElement>("[data-reading-section]"),
      );
      if (sections.length === 0) return;

      const readingLine = contentElement.getBoundingClientRect().top + 96;
      let nextActiveId = sections[0].id;

      for (const section of sections) {
        if (section.getBoundingClientRect().top > readingLine) break;
        nextActiveId = section.id;
      }

      setActiveId((currentId) =>
        currentId === nextActiveId ? currentId : nextActiveId,
      );
    }

    function scheduleUpdate() {
      if (animationFrame) return;
      animationFrame = window.requestAnimationFrame(updateActiveSection);
    }

    updateActiveSection();
    contentElement.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);

    return () => {
      contentElement.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      if (animationFrame) window.cancelAnimationFrame(animationFrame);
    };
  }, [contentRef]);

  useEffect(() => {
    const contents = contentsRef.current;
    if (!contents || !activeId) return;

    const activeLink = contents.querySelector<HTMLElement>(
      `[data-toc-id="${activeId}"]`,
    );
    if (!activeLink) return;

    const contentsRect = contents.getBoundingClientRect();
    const linkRect = activeLink.getBoundingClientRect();
    const edgePadding = 24;

    if (linkRect.top < contentsRect.top + edgePadding) {
      contents.scrollTo({
        top: contents.scrollTop + linkRect.top - contentsRect.top - edgePadding,
        behavior: "smooth",
      });
    } else if (linkRect.bottom > contentsRect.bottom - edgePadding) {
      contents.scrollTo({
        top:
          contents.scrollTop +
          linkRect.bottom -
          contentsRect.bottom +
          edgePadding,
        behavior: "smooth",
      });
    }
  }, [activeId, contentsRef]);

  return activeId;
}
