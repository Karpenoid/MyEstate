import { apiFetch } from "@/shared/lib/fetchAPI";
import { ApiEstate, GemType } from "@/shared/types/types";

export const analyzeGemchat = async (
  estates: ApiEstate[],
  messages: { role: "user" | "ai"; content: string }[],
): Promise<GemType> => {
  const response = await apiFetch<{ analysis: GemType }>("/api/analyze-gemchat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    rawBody: JSON.stringify({ estates, messages }),
  });

  return response.analysis;
};
