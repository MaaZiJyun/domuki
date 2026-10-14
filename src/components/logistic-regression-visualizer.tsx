"use client";

import { useEffect, useState } from "react";
import MathFormula from "@/components/math-formula";
import { useSitePreferences } from "@/components/site-shell";

const input = [0.8, -0.4, 0.6];
const weights = [0.7, -0.5, 0.9];
const bias = -0.2;
const linearOutput = input.reduce((sum, value, index) => sum + value * weights[index], bias);
const probability = 1 / (1 + Math.exp(-linearOutput));

export default function LogisticRegressionVisualizer() {
  const { theme } = useSitePreferences();
  const [isExpanded, setIsExpanded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const isDark = theme === "dark";
  const accentText = isDark ? "text-[#ef4551]" : "text-[#b81522]";

  useEffect(() => {
    if (!isPlaying) return;

    const timer = window.setTimeout(() => {
      const nextStep = Math.min(4, activeStep + 1);
      setActiveStep(nextStep);
      if (nextStep === 4) setIsPlaying(false);
    }, 850);

    return () => window.clearTimeout(timer);
  }, [activeStep, isPlaying]);

  const stages = [
    {
      eyebrow: "Input",
      title: "向量 x",
      content: <MathFormula>{String.raw`x=[0.8,-0.4,0.6]^T`}</MathFormula>,
      detail: "输入特征",
    },
    {
      eyebrow: "Linear",
      title: "线性函数",
      content: <MathFormula>{String.raw`w=[0.7,-0.5,0.9]^T,\;b=-0.2`}</MathFormula>,
      detail: "参数 w、b",
    },
    {
      eyebrow: "Logit",
      title: "线性输出",
      content: <MathFormula>{String.raw`z=x^T w+b=1.10`}</MathFormula>,
      detail: "加权求和",
    },
    {
      eyebrow: "Activation",
      title: "Sigmoid 激活",
      content: <MathFormula>{String.raw`\sigma(z)=\frac{1}{1+e^{-z}}`}</MathFormula>,
      detail: "映射至 (0, 1)",
    },
    {
      eyebrow: "Output",
      title: "预测概率",
      content: <MathFormula>{String.raw`\hat{y}=\sigma(z)=${probability.toFixed(3)}`}</MathFormula>,
      detail: "正类概率",
    },
  ];

  return (
    <figure className="my-8 border border-current/15 bg-current/[0.025] p-[clamp(16px,3vw,28px)]">
      <div className={`flex flex-wrap items-start justify-between gap-4 ${isExpanded ? "mb-5" : ""}`}>
        <div>
          <p className={`m-0 text-[10px] font-bold uppercase tracking-[0.18em] ${accentText}`}>
            Binary classifier flow
          </p>
          <h6 className="mt-1 mb-0 text-lg font-semibold">线性二元分类器流程</h6>
        </div>
        <button
          type="button"
          onClick={() => {
            const nextExpanded = !isExpanded;
            setIsExpanded(nextExpanded);
            if (!nextExpanded) setIsPlaying(false);
          }}
          aria-expanded={isExpanded}
          aria-controls="binary-classifier-animation"
          className="border border-current/25 px-4 py-2 text-[10px] font-bold tracking-[0.12em] transition hover:border-[#b81522] hover:text-[#b81522]"
        >
          {isExpanded ? "关闭动画 ↑" : "展开动画 ↓"}
        </button>
      </div>

      {isExpanded && (
        <div id="binary-classifier-animation">
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <p className="m-0 text-xs opacity-65">红色高亮表示数据当前所在的计算阶段。</p>
            <button
              type="button"
              onClick={() => {
                if (!isPlaying) {
                  setActiveStep(0);
                  setIsPlaying(true);
                } else {
                  setIsPlaying(false);
                }
              }}
              className={`border px-4 py-2 text-[10px] font-bold tracking-[0.12em] transition ${
                isPlaying
                  ? "border-[#b81522] text-[#b81522]"
                  : "border-current/25 hover:border-[#b81522] hover:text-[#b81522]"
              }`}
            >
              {isPlaying ? "暂停流程" : "播放流程"}
            </button>
          </div>

          <div className="overflow-x-auto pb-3">
            <div className="flex min-w-[1080px] items-stretch">
              {stages.map((stage, index) => {
                const isActive = activeStep === index;
                const isComplete = activeStep > index;

                return (
                  <div key={stage.title} className="contents">
                    <div
                      className={`flex w-[184px] shrink-0 flex-col justify-between border p-4 transition-all duration-500 motion-reduce:transition-none ${
                        isActive
                          ? isDark
                            ? "border-[#ef4551] bg-[#ef4551]/10 shadow-[0_0_24px_rgba(239,69,81,0.12)]"
                            : "border-[#b81522] bg-[#b81522]/8 shadow-[0_0_24px_rgba(184,21,34,0.1)]"
                          : isComplete
                            ? "border-current/25 bg-current/[0.035] opacity-70"
                            : "border-current/15 opacity-45"
                      }`}
                    >
                      <div>
                        <span className={`text-[9px] font-bold uppercase tracking-[0.16em] ${isActive ? accentText : "opacity-55"}`}>
                          {String(index + 1).padStart(2, "0")} · {stage.eyebrow}
                        </span>
                        <h6 className="mt-2 mb-4 text-base font-semibold">{stage.title}</h6>
                        <div className="overflow-x-auto text-sm leading-7">{stage.content}</div>
                      </div>
                      <p className="mt-5 mb-0 text-[11px] opacity-60">{stage.detail}</p>
                    </div>

                    {index < stages.length - 1 && (
                      <div className={`flex w-10 shrink-0 items-center justify-center transition-colors duration-500 ${activeStep > index ? accentText : "opacity-25"}`} aria-hidden="true">
                        <span className="h-px w-5 bg-current" />
                        <span className="-ml-1 border-y-[4px] border-l-[6px] border-y-transparent border-l-current" />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-5 overflow-x-auto border border-current/10 px-4 py-4 text-center text-sm">
            <MathFormula>
              {String.raw`x\;\longrightarrow\;(w,b)\;\longrightarrow\;z=x^T w+b\;\longrightarrow\;\sigma(z)\;\longrightarrow\;\hat{y}=\sigma(z)`}
            </MathFormula>
          </div>

          <figcaption className="mt-4 text-xs leading-6 opacity-65">
            输入向量先经过带参数的线性变换得到 logit 值 z，再通过 Sigmoid 映射为正类概率。
          </figcaption>
        </div>
      )}
    </figure>
  );
}
