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

export type DocumentPart = {
  id: string;
  number: string;
  title: LocalizedText;
  chapters: DocumentChapter[];
};

export type LearningDocument = {
  slug: string;
  title: string;
  alternateTitle: LocalizedText;
  description: LocalizedText;
  parts: DocumentPart[];
};

export const deepReinforcementLearning: LearningDocument = {
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
  parts: [
    {
      id: "part-1",
      number: "01",
      title: { en: "Part 1 Foundations", ja: "第1部 基礎" },
      chapters: [
        {
          id: "machine-learning-foundations",
          number: "01",
          title: { en: "Machine learning foundations", ja: "機械学習基礎" },
          sections: [
            {
              id: "linear-models",
              number: "1.1",
              title: { en: "Linear models", ja: "線形モデル" },
              subsections: [],
            },
            {
              id: "neural-networks",
              number: "1.2",
              title: { en: "Neural networks", ja: "ニューラルネットワーク" },
              subsections: [],
            },
            {
              id: "backpropagation-and-gradient-descent",
              number: "1.3",
              title: {
                en: "Backpropagation and gradient descent",
                ja: "誤差逆伝播と勾配降下法",
              },
              subsections: [],
            },
          ],
        },
        {
          id: "monte-carlo",
          number: "02",
          title: { en: "Monte Carlo", ja: "モンテカルロ" },
          sections: [
            {
              id: "random-variables",
              number: "2.1",
              title: { en: "Random variables", ja: "確率変数" },
              subsections: [],
            },
            {
              id: "monte-carlo-estimation",
              number: "2.2",
              title: { en: "Monte Carlo estimation", ja: "モンテカルロ推定" },
              subsections: [],
            },
          ],
        },
        {
          id: "reinforcement-learning-foundations",
          number: "03",
          title: { en: "Reinforcement learning foundations", ja: "強化学習基礎" },
          sections: [
            {
              id: "markov-decision-processes",
              number: "3.1",
              title: { en: "Markov decision processes", ja: "マルコフ決定過程" },
              subsections: [],
            },
            {
              id: "policies",
              number: "3.2",
              title: { en: "Policies", ja: "方策" },
              subsections: [],
            },
            {
              id: "sources-of-randomness",
              number: "3.3",
              title: { en: "Sources of randomness", ja: "ランダム性の源泉" },
              subsections: [],
            },
            {
              id: "returns-and-discounted-returns",
              number: "3.4",
              title: { en: "Returns and discounted returns", ja: "リターンと割引リターン" },
              subsections: [],
            },
            {
              id: "value-functions",
              number: "3.5",
              title: { en: "Value functions", ja: "価値関数" },
              subsections: [],
            },
            {
              id: "experimental-environments",
              number: "3.6",
              title: { en: "Experimental environments", ja: "実験環境" },
              subsections: [],
            },
          ],
        },
      ],
    },
    {
      id: "part-2",
      number: "02",
      title: { en: "Part 2", ja: "第2部" },
      chapters: [],
    },
    {
      id: "part-3",
      number: "03",
      title: { en: "Part 3", ja: "第3部" },
      chapters: [],
    },
    {
      id: "part-4",
      number: "04",
      title: { en: "Part 4", ja: "第4部" },
      chapters: [],
    },
    {
      id: "part-5",
      number: "05",
      title: { en: "Part 5", ja: "第5部" },
      chapters: [],
    },
  ],
} as const;
