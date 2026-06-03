import { apiFetch } from "@/shared/lib/fetchAPI";
import { ApiEstate, MarketAnalysis } from "@/shared/types/types";

export const analyzeMarket = async (estates: ApiEstate[]): Promise<MarketAnalysis> => {
  const response = await apiFetch<{ analysis: MarketAnalysis }>("/api/analyze-market", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    rawBody: JSON.stringify({ estates }),
  });

  return response.analysis;
};
