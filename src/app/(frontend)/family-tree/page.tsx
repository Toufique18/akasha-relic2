import { Metadata } from "next";
import { FamilyTreeScreen } from "@/components/family-tree-screen/FamilyTreeScreen";

export const metadata: Metadata = {
  title: "Family Tree Builder",
  description: "Create, edit, and explore your family heritage using our interactive family tree builder canvas.",
};

export default function FamilyTreePage() {
  return <FamilyTreeScreen />;
}
