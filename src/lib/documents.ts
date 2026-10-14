export type LocalizedText = {
  en: string;
  ja: string;
};

export type DocumentSubsection = {
  id: string;
  number: string;
  title: LocalizedText;
};

export type DocumentSection = {
  id: string;
  number: string;
  title: LocalizedText;
  subsections: DocumentSubsection[];
};

export type DocumentChapter = {
  id: string;
  number: string;
  title: LocalizedText;
  sections: DocumentSection[];
};

export const deepReinforcementLearning = {
  slug: "deep-reinforcement-learning",
  title: "深層強化学習",
  alternateTitle: {
    en: "Deep Reinforcement Learning",
    ja: "深層強化学習",
  },
  description: {
    en: "Structured notes on agents, environments, value functions, and learning through interaction.",
    ja: "エージェント、環境、価値関数、そして相互作用による学習についての体系的なノート。",
  },
  chapters: [
    {
      id: "chapter-1",
      number: "01",
      title: { en: "Chapter 1", ja: "第1章" },
      sections: [
        {
          id: "machine-learning-foundations",
          number: "1.1",
          title: { en: "Machine learning foundations", ja: "機械学習基礎" },
          subsections: [
            {
              id: "linear-models",
              number: "1.1.1",
              title: { en: "Linear models", ja: "線形モデル" },
            },
            {
              id: "neural-networks",
              number: "1.1.2",
              title: { en: "Neural networks", ja: "ニューラルネットワーク" },
            },
            {
              id: "backpropagation-and-gradient-descent",
              number: "1.1.3",
              title: {
                en: "Backpropagation and gradient descent",
                ja: "誤差逆伝播と勾配降下法",
              },
            },
          ],
        },
        {
          id: "monte-carlo",
          number: "1.2",
          title: { en: "Monte Carlo", ja: "モンテカルロ" },
          subsections: [
            {
              id: "random-variables",
              number: "1.2.1",
              title: { en: "Random variables", ja: "確率変数" },
            },
            {
              id: "monte-carlo-estimation",
              number: "1.2.2",
              title: { en: "Monte Carlo estimation", ja: "モンテカルロ推定" },
            },
          ],
        },
        {
          id: "reinforcement-learning-foundations",
          number: "1.3",
          title: { en: "Reinforcement learning foundations", ja: "強化学習基礎" },
          subsections: [
            {
              id: "markov-decision-processes",
              number: "1.3.1",
              title: { en: "Markov decision processes", ja: "マルコフ決定過程" },
            },
            {
              id: "policies",
              number: "1.3.2",
              title: { en: "Policies", ja: "方策" },
            },
            {
              id: "sources-of-randomness",
              number: "1.3.3",
              title: { en: "Sources of randomness", ja: "ランダム性の源泉" },
            },
            {
              id: "returns-and-discounted-returns",
              number: "1.3.4",
              title: { en: "Returns and discounted returns", ja: "リターンと割引リターン" },
            },
            {
              id: "value-functions",
              number: "1.3.5",
              title: { en: "Value functions", ja: "価値関数" },
            },
            {
              id: "experimental-environments",
              number: "1.3.6",
              title: { en: "Experimental environments", ja: "実験環境" },
            },
          ],
        },
      ],
    },
    {
      id: "chapter-2",
      number: "02",
      title: { en: "Chapter 2", ja: "第2章" },
      sections: [],
    },
    {
      id: "chapter-3",
      number: "03",
      title: { en: "Chapter 3", ja: "第3章" },
      sections: [],
    },
    {
      id: "chapter-4",
      number: "04",
      title: { en: "Chapter 4", ja: "第4章" },
      sections: [],
    },
    {
      id: "chapter-5",
      number: "05",
      title: { en: "Chapter 5", ja: "第5章" },
      sections: [],
    },
  ] satisfies DocumentChapter[],
} as const;
