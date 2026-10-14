import type { Metadata } from "next";
import ArchivePage from "@/components/archive-page";

export const metadata: Metadata = {
  title: "Music",
  description: "Orchestral music and other compositions by Domuki.",
};

export default function MusicPage() {
  return <ArchivePage kind="music" />;
}
