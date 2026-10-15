import type { Metadata } from "next";
import LearningDocument from "@/components/document/deep-reinforcement-learning/learning-document";

export const metadata: Metadata = {
  title: "Deep Reinforcement Learning",
  description: "Domuki's structured notes on deep reinforcement learning.",
};

export default function DeepReinforcementLearningPage() {
  return <LearningDocument />;
}
