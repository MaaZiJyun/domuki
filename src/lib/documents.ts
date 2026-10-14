export type LocalizedText = {
  en: string;
  ja: string;
};

export type DocumentSection = {
  id: string;
  number: string;
  title: LocalizedText;
};

export type DocumentChapter = {
  id: string;
  number: string;
  title: LocalizedText;
  sections: DocumentSection[];
};

export const deepReinforcementLearning = {
  slug: "deep-reinforcement-learning",
  title: "深度强化学习",
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
      id: "foundations",
      number: "01",
      title: { en: "Foundations", ja: "基礎" },
      sections: [
        {
          id: "agent-and-environment",
          number: "1.1",
          title: { en: "Agent and environment", ja: "エージェントと環境" },
        },
        {
          id: "rewards-and-returns",
          number: "1.2",
          title: { en: "Rewards and returns", ja: "報酬とリターン" },
        },
      ],
    },
    {
      id: "value-methods",
      number: "02",
      title: { en: "Value-based methods", ja: "価値ベース手法" },
      sections: [
        {
          id: "value-functions",
          number: "2.1",
          title: { en: "Value functions", ja: "価値関数" },
        },
        {
          id: "q-learning",
          number: "2.2",
          title: { en: "Q-learning", ja: "Q学習" },
        },
      ],
    },
    {
      id: "policy-methods",
      number: "03",
      title: { en: "Policy methods", ja: "方策ベース手法" },
      sections: [
        {
          id: "policy-gradients",
          number: "3.1",
          title: { en: "Policy gradients", ja: "方策勾配法" },
        },
        {
          id: "actor-critic",
          number: "3.2",
          title: { en: "Actor–critic", ja: "Actor–Critic" },
        },
      ],
    },
  ] satisfies DocumentChapter[],
} as const;
