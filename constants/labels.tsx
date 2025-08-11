import { LabelOption } from "@/types/types";

export const PREDEFINED_LABELS: LabelOption[] = [
  { value: "bug", label: "bug", colorClass: "bg-red-100 text-red-800 border-red-200" },
  { value: "feature", label: "feature", colorClass: "bg-green-100 text-green-800 border-green-200" },
  { value: "enhancement", label: "enhancement", colorClass: "bg-blue-100 text-blue-800 border-blue-200" },
  { value: "help wanted", label: "help wanted", colorClass: "bg-purple-100 text-purple-800 border-purple-200" },
  { value: "good first issue", label: "good first issue", colorClass: "bg-violet-100 text-violet-800 border-violet-200" },
  { value: "documentation", label: "documentation", colorClass: "bg-yellow-100 text-yellow-800 border-yellow-200" },
  { value: "question", label: "question", colorClass: "bg-pink-100 text-pink-800 border-pink-200" },
];
