import { ApiEstate, GemType } from "@/shared/types/types";

export const analyzeGemchat = async (
  estates: ApiEstate[],
  messages: { role: "user" | "ai"; content: string }[],
): Promise<GemType> => {
  const response = await fetch("/api/analyze-gemchat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ estates, messages }),
  });

  const data = await response.json();

  if (!data.success) {
    throw new Error(data.error || "Failed to analyze market data");
  }

  return data.analysis;
};
