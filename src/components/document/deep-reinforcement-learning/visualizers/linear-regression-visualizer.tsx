"use client";

import { useEffect, useState } from "react";
import MathFormula from "@/components/document/deep-reinforcement-learning/math-formula";
import VisualizerToggle from "@/components/document/deep-reinforcement-learning/visualizer-toggle";
import { useSitePreferences } from "@/components/layout/site-shell";

const samples = [
  { x: 0.1, y: 0.2 },
  { x: 0.22, y: 0.34 },
  { x: 0.36, y: 0.33 },
  { x: 0.5, y: 0.51 },
  { x: 0.64, y: 0.55 },
  { x: 0.78, y: 0.72 },
  { x: 0.9, y: 0.68 },
];

const target = { weight: 0.64, bias: 0.15 };

function clamp(value: number) {
  return Math.min(0.96, Math.max(0.04, value));
}

export default function LinearRegressionVisualizer() {
  const { theme } = useSitePreferences();
  const [parameters, setParameters] = useState({ weight: 0.28, bias: 0.38 });
  const [isExpanded, setIsExpanded] = useState(false);
  const [isFitting, setIsFitting] = useState(false);
  const isDark = theme === "dark";
  const accentBackground = isDark ? "bg-[#ef4551]" : "bg-[#b81522]";
  const accentSoftBackground = isDark ? "bg-[#ef4551]/55" : "bg-[#b81522]/45";

  useEffect(() => {
    if (!isFitting) return;

    const timer = window.setInterval(() => {
      setParameters((current) => {
        const next = {
          weight: current.weight + (target.weight - current.weight) * 0.16,
          bias: current.bias + (target.bias - current.bias) * 0.16,
        };

        if (
          Math.abs(next.weight - target.weight) < 0.002 &&
          Math.abs(next.bias - target.bias) < 0.002
        ) {
          window.clearInterval(timer);
          setIsFitting(false);
          return target;
        }

        return next;
      });
    }, 90);

    return () => window.clearInterval(timer);
  }, [isFitting]);

  const predictions = samples.map(({ x }) => clamp(parameters.weight * x + parameters.bias));
  const loss = samples.reduce((sum, sample, index) => {
    const residual = predictions[index] - sample.y;
    return sum + residual * residual;
  }, 0) / (2 * samples.length);
  const lineAngle = -Math.atan(parameters.weight * 0.625) * (180 / Math.PI);

  function updateParameter(name: "weight" | "bias", value: number) {
    setIsFitting(false);
    setParameters((current) => ({ ...current, [name]: value }));
  }

  return (
    <figure className="my-7">
      <VisualizerToggle
        title="拖动参数，观察拟合直线与误差"
        isExpanded={isExpanded}
        controls="linear-regression-animation"
        onToggle={() => {
            const nextExpanded = !isExpanded;
            setIsExpanded(nextExpanded);
            if (!nextExpanded) {
              setIsFitting(false);
            }
        }}
      />

      {isExpanded && (
        <div
          id="linear-regression-animation"
          className="border border-current/15 bg-current/[0.025] p-[clamp(16px,3vw,28px)]"
        >
          <div className="grid items-start gap-7 lg:grid-cols-[minmax(0,1.35fr)_minmax(320px,0.85fr)]">
            <div className="min-w-0">
              <div
                className="relative aspect-[16/10] w-full overflow-hidden border border-current/20 bg-[linear-gradient(to_right,rgba(128,128,128,0.12)_1px,transparent_1px),linear-gradient(to_bottom,rgba(128,128,128,0.12)_1px,transparent_1px)] bg-[size:10%_10%]"
                role="img"
                aria-label="Interactive linear regression chart showing samples, predictions, residuals, and the fitted line"
              >
                <div className="absolute inset-x-[5%] bottom-[5%] h-px bg-current/35" />
                <div className="absolute inset-y-[5%] left-[5%] w-px bg-current/35" />

                <div
                  className={`absolute left-0 h-[2px] w-[118%] origin-left shadow-[0_0_14px_rgba(184,21,34,0.4)] transition-all duration-300 ease-out motion-reduce:transition-none ${accentBackground}`}
                  style={{
                    bottom: `${parameters.bias * 100}%`,
                    transform: `rotate(${lineAngle}deg)`,
                  }}
                />

                {samples.map((sample, index) => {
                  const prediction = predictions[index];
                  const residualBottom = Math.min(sample.y, prediction);
                  const residualHeight = Math.abs(sample.y - prediction);

                  return (
                    <div key={sample.x}>
                      <div
                        className={`absolute w-px transition-all duration-300 ease-out motion-reduce:transition-none ${accentSoftBackground}`}
                        style={{
                          left: `${sample.x * 100}%`,
                          bottom: `${residualBottom * 100}%`,
                          height: `${residualHeight * 100}%`,
                        }}
                      />
                      <span
                        className={`absolute z-10 size-2.5 -translate-x-1/2 translate-y-1/2 rounded-full border-2 border-current shadow-sm ${isDark ? "bg-[#111113]" : "bg-[#f2f0ec]"}`}
                        style={{ left: `${sample.x * 100}%`, bottom: `${sample.y * 100}%` }}
                        aria-hidden="true"
                      />
                      <span
                        className={`absolute size-1.5 -translate-x-1/2 translate-y-1/2 transition-all duration-300 ease-out motion-reduce:transition-none ${accentBackground}`}
                        style={{ left: `${sample.x * 100}%`, bottom: `${prediction * 100}%` }}
                        aria-hidden="true"
                      />
                    </div>
                  );
                })}

                <span className="absolute right-2 bottom-[6%] text-[10px] italic opacity-60">x</span>
                <span className="absolute top-2 left-[6%] text-[10px] italic opacity-60">y</span>
              </div>

              <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-[11px] opacity-70">
                <span className="flex items-center gap-2">
                  <i className="size-2 rounded-full border border-current" />训练样本
                </span>
                <span className="flex items-center gap-2">
                  <i className={`size-2 ${accentBackground}`} />预测值
                </span>
                <span className="flex items-center gap-2">
                  <i className={`h-px w-4 ${accentSoftBackground}`} />预测残差
                </span>
              </div>
            </div>

            <div className="min-w-0 lg:border-l lg:border-current/10 lg:pl-7">
              <div className="grid grid-cols-[minmax(0,1fr)_minmax(0,1fr)_40px] items-end gap-3">
                <label className="min-w-0 text-xs font-semibold">
                  <span className="mb-2 flex flex-wrap items-center justify-between gap-x-2 gap-y-1">
                    权重 <MathFormula>{String.raw`w=${parameters.weight.toFixed(2)}`}</MathFormula>
                  </span>
                  <input
                    type="range"
                    min="-0.8"
                    max="1.2"
                    step="0.01"
                    value={parameters.weight}
                    onChange={(event) => updateParameter("weight", Number(event.target.value))}
                    className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-current/15 [accent-color:#b81522]"
                  />
                </label>

                <label className="min-w-0 text-xs font-semibold">
                  <span className="mb-2 flex flex-wrap items-center justify-between gap-x-2 gap-y-1">
                    偏置 <MathFormula>{String.raw`b=${parameters.bias.toFixed(2)}`}</MathFormula>
                  </span>
                  <input
                    type="range"
                    min="0.02"
                    max="0.9"
                    step="0.01"
                    value={parameters.bias}
                    onChange={(event) => updateParameter("bias", Number(event.target.value))}
                    className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-current/15 [accent-color:#b81522]"
                  />
                </label>

                <button
                  type="button"
                  onClick={() => {
                    if (!isFitting && Math.abs(parameters.weight - target.weight) < 0.01) {
                      setParameters({ weight: -0.35, bias: 0.72 });
                    }
                    setIsFitting((current) => !current);
                  }}
                  aria-label={isFitting ? "暂停拟合" : "播放拟合"}
                  title={isFitting ? "暂停拟合" : "播放拟合"}
                  className={`grid size-10 place-items-center border transition ${
                    isFitting
                      ? "border-[#b81522] text-[#b81522]"
                      : "border-current/25 hover:border-[#b81522] hover:text-[#b81522]"
                  }`}
                >
                  {isFitting ? (
                    <svg viewBox="0 0 16 16" aria-hidden="true" className="size-4 fill-current">
                      <path d="M3.5 3h3v10h-3zM9.5 3h3v10h-3z" />
                    </svg>
                  ) : (
                    <svg viewBox="0 0 16 16" aria-hidden="true" className="size-4 fill-current">
                      <path d="m4 2.5 9 5.5-9 5.5z" />
                    </svg>
                  )}
                </button>
              </div>

              <div className="mt-6 space-y-3 border-t border-current/10 pt-5">
                <div className="overflow-x-auto border border-current/10 px-3 py-3 text-center text-sm">
                  <MathFormula>{String.raw`f(x)=${parameters.weight.toFixed(2)}x+${parameters.bias.toFixed(2)}`}</MathFormula>
                </div>
                <div className="overflow-x-auto border border-current/10 px-3 py-3 text-center text-sm">
                  <MathFormula>{String.raw`L(w,b)=${loss.toFixed(4)}`}</MathFormula>
                </div>
              </div>

              <figcaption className="mt-5 text-xs leading-6 opacity-65">
                空心圆是训练样本，方形点是模型预测，竖线长度表示预测误差。播放拟合会逐步调整参数，使总体损失下降。
              </figcaption>
            </div>
          </div>
        </div>
      )}
    </figure>
  );
}
