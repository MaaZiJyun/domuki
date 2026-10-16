import type { Metadata } from "next";
import AboutPage from "@/components/about/about-page";

export const metadata: Metadata = {
  title: "About",
  description: "About Domuki, a composer of emotional orchestral music.",
};

export default function Page() {
  return <AboutPage />;
}
