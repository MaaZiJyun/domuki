import type { Metadata } from "next";
import MusicLibrary from "@/components/music-library";

export const metadata: Metadata = {
  title: "Music",
  description: "Orchestral music and other compositions by Domuki.",
};

export default function MusicPage() {
  return <MusicLibrary />;
}
