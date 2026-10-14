import type { Metadata } from "next";
import LearningDocument from "@/components/learning-document";

export const metadata: Metadata = {
  title: "深度强化学习",
  description: "Domuki's structured notes on deep reinforcement learning.",
};

export default function DeepReinforcementLearningPage() {
  return <LearningDocument />;
}
