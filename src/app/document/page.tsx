import type { Metadata } from "next";
import DocumentLibrary from "@/components/document-library";

export const metadata: Metadata = {
  title: "Document",
  description: "Notes, creative fragments, and working documents by Domuki.",
};

export default function DocumentPage() {
  return <DocumentLibrary />;
}
