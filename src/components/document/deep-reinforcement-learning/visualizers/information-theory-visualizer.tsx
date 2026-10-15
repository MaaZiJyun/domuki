"use client";

import { useEffect, useState } from "react";
import MathFormula from "@/components/document/deep-reinforcement-learning/math-formula";
import VisualizerToggle from "@/components/document/deep-reinforcement-learning/visualizer-toggle";
import { useSitePreferences } from "@/components/layout/site-shell";

const epsilon = 0.001;

function safeProbability(value: number) {
  return Math.min(1 - epsilon, Math.max(epsilon, value));
}

function entropy(probability: number) {
  const p = safeProbability(probability);
  return -(p * Math.log(p) + (1 - p) * Math.log(1 - p));
}

function crossEntropy(truth: number, prediction: number) {
  const p = safeProbability(truth);
  const q = safeProbability(prediction);
  return -(p * Math.log(q) + (1 - p) * Math.log(1 - q));
}

function BallBox({
  probability,
  title,
  notation,
}: {
  probability: number;
  title: string;
  notation: "p" | "q";
}) {
  const redBalls = Math.round(probability * 10);

  return (
    <div className="min-w-0">
      <div className="mb-3 text-center">
        <p className="m-0 text-sm font-semibold">{title}</p>
        <p className="mt-1 mb-0 text-[11px] opacity-60">
          {notation}(红球) = {probability.toFixed(2)}
        </p>
      </div>
      <div className="relative mx-auto max-w-[210px] border-x-2 border-b-2 border-current/30 px-4 pt-7 pb-4">
        <div className="absolute inset-x-[-2px] top-0 h-2 border-x-2 border-current/30" />
        <div className="grid grid-cols-5 gap-2.5" aria-label={`约 ${redBalls} 个红球和 ${10 - redBalls} 个黑球`}>
          {Array.from({ length: 10 }, (_, index) => (
            <span
              key={index}
              className={`aspect-square rounded-full shadow-sm ring-1 ${
                index < redBalls
                  ? "bg-[#c92632] ring-[#8d101a]/40"
                  : "bg-[#161618] ring-white/35"
              }`}
              aria-hidden="true"
            />
          ))}
        </div>
      </div>
      <p className="mt-3 mb-0 text-center text-[11px] opacity-60">
        图中约 {redBalls} 个红球、{10 - redBalls} 个黑球
      </p>
    </div>
  );
}

export default function InformationTheoryVisualizer() {
  const { theme } = useSitePreferences();
  const [p, setP] = useState(0.72);
  const [q, setQ] = useState(0.32);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMatching, setIsMatching] = useState(false);
  const [drawnBall, setDrawnBall] = useState<"red" | "black" | null>(null);
  const isDark = theme === "dark";
  const informationEntropy = entropy(p);
  const predictionCrossEntropy = crossEntropy(p, q);
  const klDivergence = predictionCrossEntropy - informationEntropy;
  const entropyShare = predictionCrossEntropy === 0 ? 100 : (informationEntropy / predictionCrossEntropy) * 100;
  const accentText = isDark ? "text-[#ef4551]" : "text-[#b81522]";
  const accentBackground = isDark ? "bg-[#ef4551]" : "bg-[#b81522]";

  useEffect(() => {
    if (!isMatching) return;

    const timer = window.setInterval(() => {
      setQ((current) => {
        const next = current + (p - current) * 0.16;
        if (Math.abs(next - p) < 0.002) {
          window.clearInterval(timer);
          setIsMatching(false);
          return p;
        }
        return next;
      });
    }, 70);

    return () => window.clearInterval(timer);
  }, [isMatching, p]);

  return (
    <figure className="my-7">
      <VisualizerToggle
        title="一张图理解熵、交叉熵与 KL 散度"
        isExpanded={isExpanded}
        controls="information-theory-diagram"
        onToggle={() => {
            const nextExpanded = !isExpanded;
            setIsExpanded(nextExpanded);
            if (!nextExpanded) setIsMatching(false);
        }}
      />

      {isExpanded && (
        <div
          id="information-theory-diagram"
          className="border border-current/15 bg-current/[0.025] p-[clamp(16px,3vw,28px)]"
        >
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1.05fr)_minmax(280px,0.95fr)]">
            <div className="border border-current/15 p-5">
              <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="m-0 text-[10px] font-bold uppercase tracking-[0.14em] opacity-55">Probability distributions</p>
                  <p className="mt-1 mb-0 text-sm">真实箱子 p 与模型想象的箱子 q</p>
                </div>
                <button
                  type="button"
                  onClick={() => setIsMatching((current) => !current)}
                  className={`border px-3 py-2 text-[10px] font-bold tracking-[0.1em] transition ${
                    isMatching
                      ? "border-[#b81522] text-[#b81522]"
                      : "border-current/25 hover:border-[#b81522] hover:text-[#b81522]"
                  }`}
                >
                  {isMatching ? "暂停趋近" : "让 q 逼近 p"}
                </button>
              </div>

              <div className="grid gap-7 sm:grid-cols-2">
                <BallBox probability={p} title="真实箱子" notation="p" />
                <BallBox probability={q} title="模型想象的箱子" notation="q" />
              </div>

              <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-y border-current/15 py-4">
                <div>
                  <p className="m-0 text-sm font-semibold">从真实箱子 p 随机抽取一个球</p>
                  <p className="mt-1 mb-0 text-[11px] opacity-60">每次抽取后放回，因此概率保持不变。</p>
                </div>
                <div className="flex items-center gap-3">
                  {drawnBall && (
                    <span className="flex items-center gap-2 text-xs" aria-live="polite">
                      <i
                        className={`size-6 rounded-full shadow-sm ring-1 ${
                          drawnBall === "red"
                            ? "bg-[#c92632] ring-[#8d101a]/40"
                            : "bg-[#161618] ring-white/35"
                        }`}
                      />
                      抽到{drawnBall === "red" ? "红球" : "黑球"}
                    </span>
                  )}
                  <button
                    type="button"
                    onClick={() => setDrawnBall(Math.random() < p ? "red" : "black")}
                    className="border border-current/25 px-3 py-2 text-[10px] font-bold tracking-[0.1em] transition hover:border-[#b81522] hover:text-[#b81522]"
                  >
                    随机抽一个球
                  </button>
                </div>
              </div>

              <div className="mt-6 space-y-5">
                <label className="block text-sm font-semibold">
                  <span className="mb-2 flex justify-between gap-3">
                    真实分布 <MathFormula>{String.raw`p(y=1)=${p.toFixed(2)}`}</MathFormula>
                  </span>
                  <input
                    type="range"
                    min="0.02"
                    max="0.98"
                    step="0.01"
                    value={p}
                    onChange={(event) => {
                      setIsMatching(false);
                      setDrawnBall(null);
                      setP(Number(event.target.value));
                    }}
                    className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-current/15 [accent-color:#b81522]"
                  />
                </label>
                <label className="block text-sm font-semibold">
                  <span className="mb-2 flex justify-between gap-3">
                    预测分布 <MathFormula>{String.raw`q(y=1)=${q.toFixed(2)}`}</MathFormula>
                  </span>
                  <input
                    type="range"
                    min="0.02"
                    max="0.98"
                    step="0.01"
                    value={q}
                    onChange={(event) => {
                      setIsMatching(false);
                      setQ(Number(event.target.value));
                    }}
                    className={`h-1.5 w-full cursor-pointer appearance-none rounded-full bg-current/15 ${isDark ? "[accent-color:#f1efeb]" : "[accent-color:#242325]"}`}
                  />
                </label>
              </div>
            </div>

            <div className="grid gap-3">
              <div className="border border-current/15 p-5">
                <p className="m-0 text-[10px] font-bold uppercase tracking-[0.14em] opacity-55">01 · Information entropy</p>
                <div className={`mt-2 text-2xl font-semibold ${accentText}`}>{informationEntropy.toFixed(3)}</div>
                <div className="mt-3 overflow-x-auto border-y border-current/10 py-3 text-[12px]">
                  <MathFormula>
                    {String.raw`H(p)=-[${p.toFixed(2)}\ln(${p.toFixed(2)})+${(1 - p).toFixed(2)}\ln(${(1 - p).toFixed(2)})]=${informationEntropy.toFixed(3)}`}
                  </MathFormula>
                </div>
                <p className="mt-3 mb-0 text-xs leading-6 opacity-70">只看真实箱子 p：下一次会抽到哪种颜色有多难猜。红黑球越接近各半，不确定性越大。</p>
              </div>
              <div className="border border-current/15 p-5">
                <p className="m-0 text-[10px] font-bold uppercase tracking-[0.14em] opacity-55">02 · Cross entropy</p>
                <div className={`mt-2 text-2xl font-semibold ${accentText}`}>{predictionCrossEntropy.toFixed(3)}</div>
                <div className="mt-3 overflow-x-auto border-y border-current/10 py-3 text-[12px]">
                  <MathFormula>
                    {String.raw`H(p,q)=-[${p.toFixed(2)}\ln(${q.toFixed(2)})+${(1 - p).toFixed(2)}\ln(${(1 - q).toFixed(2)})]=${predictionCrossEntropy.toFixed(3)}`}
                  </MathFormula>
                </div>
                <p className="mt-3 mb-0 text-xs leading-6 opacity-70">真实球按 p 出现，但你按照模型想象的比例 q 去猜颜色；交叉熵是平均猜测代价。</p>
              </div>
              <div className="border border-current/15 p-5">
                <p className="m-0 text-[10px] font-bold uppercase tracking-[0.14em] opacity-55">03 · KL divergence</p>
                <div className={`mt-2 text-2xl font-semibold ${accentText}`}>{klDivergence.toFixed(3)}</div>
                <div className="mt-3 overflow-x-auto border-y border-current/10 py-3 text-[12px]">
                  <MathFormula>
                    {String.raw`\mathrm{KL}(p\parallel q)=${p.toFixed(2)}\ln\frac{${p.toFixed(2)}}{${q.toFixed(2)}}+${(1 - p).toFixed(2)}\ln\frac{${(1 - p).toFixed(2)}}{${(1 - q).toFixed(2)}}=${klDivergence.toFixed(3)}`}
                  </MathFormula>
                </div>
                <p className="mt-3 mb-0 text-xs leading-6 opacity-70">模型把箱子比例想错后多付出的代价；想象的箱子 q 与真实箱子 p 相同时，它正好等于 0。</p>
              </div>
            </div>
          </div>

          <div className="mt-6 border border-current/15 p-5">
            <div className="mb-3 flex flex-wrap items-end justify-between gap-3">
              <div>
                <p className="m-0 text-[10px] font-bold uppercase tracking-[0.14em] opacity-55">Cost decomposition</p>
                <p className="mt-1 mb-0 text-sm">交叉熵 = 无法消除的不确定性 + 预测不匹配的额外代价</p>
              </div>
              <MathFormula>{String.raw`H(p,q)=H(p)+\mathrm{KL}(p\parallel q)`}</MathFormula>
            </div>
            <div className="flex h-9 w-full overflow-hidden border border-current/15">
              <div
                className={`grid place-items-center overflow-hidden whitespace-nowrap text-[10px] font-bold text-white transition-[width] duration-300 ${accentBackground}`}
                style={{ width: `${entropyShare}%` }}
              >
                H(p)
              </div>
              <div
                className={`grid place-items-center overflow-hidden whitespace-nowrap text-[10px] font-bold transition-[width] duration-300 ${
                  isDark ? "bg-white/20" : "bg-black/15"
                }`}
                style={{ width: `${100 - entropyShare}%` }}
              >
                KL
              </div>
            </div>
            <p className="mt-3 mb-0 text-xs leading-6 opacity-65">
              拖动 q 远离 p，右侧 KL 区域会增大；让 q 逼近 p，KL 会缩小到 0，此时交叉熵降到信息熵。
            </p>
          </div>
        </div>
      )}
    </figure>
  );
}
