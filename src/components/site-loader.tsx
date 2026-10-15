"use client";

import { useEffect, useState } from "react";
import { Solar } from "lunar-javascript";

const englishMonths = [
  "JANUARY",
  "FEBRUARY",
  "MARCH",
  "APRIL",
  "MAY",
  "JUNE",
  "JULY",
  "AUGUST",
  "SEPTEMBER",
  "OCTOBER",
  "NOVEMBER",
  "DECEMBER",
];

function pad(value: number) {
  return String(value).padStart(2, "0");
}

function formatSolarTime(date: Date) {
  return `${date.getFullYear()} ${englishMonths[date.getMonth()]} ${pad(date.getDate())} · ${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
}

function formatGanZhiTime(date: Date) {
  const lunar = Solar.fromDate(date).getLunar();

  return `${lunar.getYearInGanZhiExact()}年 ${lunar.getMonthInGanZhiExact()}月 ${lunar.getDayInGanZhiExact()}日 ${lunar.getTimeInGanZhi()}时`;
}

export default function SiteLoader({ isReady }: { isReady: boolean }) {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    if (isReady) return;

    const updateClock = () => setNow(new Date());
    updateClock();
    const timer = window.setInterval(updateClock, 1000);

    return () => window.clearInterval(timer);
  }, [isReady]);

  const solarTime = now ? formatSolarTime(now) : "0000 MONTH 00 · 00:00:00";
  const ganZhiTime = now ? formatGanZhiTime(now) : "天干地支年 天干地支月 天干地支日 天干地支时";

  return (
    <div
      className={`fixed inset-0 z-[100] grid place-items-center bg-[#f2f0ec] text-[#151517] transition-[opacity,visibility] duration-700 motion-reduce:transition-none ${
        isReady ? "pointer-events-none invisible opacity-0" : "visible opacity-100"
      }`}
      role="status"
      aria-live="polite"
      aria-label="Loading website"
    >
      <div className="flex max-w-[calc(100vw-40px)] flex-col items-center gap-3 text-center tabular-nums">
        <time
          className="whitespace-nowrap text-[clamp(9px,1.6vw,19px)] font-bold tracking-[clamp(0.08em,0.8vw,0.22em)] text-[#b81522]"
          dateTime={now?.toISOString()}
        >
          {solarTime}
        </time>
        <p className="m-0 whitespace-nowrap text-[clamp(13px,2.4vw,30px)] tracking-[clamp(0.05em,0.6vw,0.14em)] text-black">
          {ganZhiTime}
        </p>
        <div
          className="mt-4 h-px w-[min(280px,70vw)] overflow-hidden bg-black/15"
          aria-hidden="true"
        >
          <span className="block h-full w-1/2 animate-pulse bg-[#b81522] motion-reduce:animate-none" />
        </div>
      </div>
    </div>
  );
}
