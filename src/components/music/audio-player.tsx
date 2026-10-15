"use client";

import { PauseIcon, PlayIcon } from "@heroicons/react/24/solid";
import { useRef, useState } from "react";

function formatTime(seconds: number) {
  if (!Number.isFinite(seconds)) return "0:00";

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
}

type AudioPlayerProps = {
  src: string;
  title: string;
  fallbackDuration: string;
  isDark: boolean;
};

export default function AudioPlayer({
  src,
  title,
  fallbackDuration,
  isDark,
}: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const progress = duration > 0 ? Math.min((currentTime / duration) * 100, 100) : 0;

  async function togglePlayback() {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused) await audio.play();
    else audio.pause();
  }

  function seek(nextTime: number) {
    const audio = audioRef.current;
    if (!audio) return;

    audio.currentTime = nextTime;
    setCurrentTime(nextTime);
  }

  return (
    <div className="mt-5">
      <audio
        ref={audioRef}
        preload="metadata"
        src={src}
        onLoadedMetadata={(event) => setDuration(event.currentTarget.duration)}
        onDurationChange={(event) => setDuration(event.currentTarget.duration)}
        onTimeUpdate={(event) => setCurrentTime(event.currentTarget.currentTime)}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onEnded={() => setIsPlaying(false)}
      >
        Your browser does not support the audio element.
      </audio>

      <div className="flex min-w-0 items-center gap-3">
        <button
          type="button"
          onClick={togglePlayback}
          className="grid size-11 shrink-0 place-items-center rounded-full bg-[#b81522] text-white transition duration-300 hover:scale-105 hover:bg-[#d11d2b] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#b81522] active:scale-95"
          aria-label={isPlaying ? `Pause ${title}` : `Play ${title}`}
        >
          {isPlaying ? (
            <PauseIcon className="size-4" aria-hidden="true" />
          ) : (
            <PlayIcon className="size-4 translate-x-px" aria-hidden="true" />
          )}
        </button>

        <div className="min-w-0 flex-1">
          <div className="mb-1 flex items-center justify-between gap-3 text-[9px] font-bold uppercase tracking-[0.16em]">
            <span className={isDark ? "text-[#a8a4a7]" : "text-[#68666a]"}>
              <span className="tabular-nums text-current">{formatTime(currentTime)}</span>
              <span className="mx-1.5 opacity-45">/</span>
              <span className="tabular-nums text-current">
                {duration ? formatTime(duration) : fallbackDuration}
              </span>
            </span>
          </div>

          <div className="relative flex h-5 items-center">
            <span className={`absolute inset-x-0 h-px ${isDark ? "bg-white/20" : "bg-black/20"}`} />
            <span
              className={`absolute left-0 h-[2px] ${isDark ? "bg-[#ef4551]" : "bg-[#b81522]"}`}
              style={{ width: `${progress}%` }}
            />
            <span
              className={`pointer-events-none absolute size-2.5 -translate-x-1/2 rounded-full border-2 ${
                isDark ? "border-[#111113] bg-[#ef4551]" : "border-[#f2f0ec] bg-[#b81522]"
              }`}
              style={{ left: `${progress}%` }}
            />
            <input
              type="range"
              min="0"
              max={duration || 1}
              step="0.01"
              value={Math.min(currentTime, duration || 1)}
              onChange={(event) => seek(Number(event.target.value))}
              className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
              aria-label={`Seek through ${title}`}
              aria-valuetext={`${formatTime(currentTime)} of ${duration ? formatTime(duration) : fallbackDuration}`}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
