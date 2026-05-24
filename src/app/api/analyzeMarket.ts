import { ApiEstate, MarketAnalysis } from "@/shared/types/types";

export const analyzeMarket = async (estates: ApiEstate[]): Promise<MarketAnalysis> => {
  const response = await fetch("/api/analyze-market", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ estates }),
  });

  const data = await response.json();

  if (!data.success) {
    throw new Error(data.error || "Failed to analyze market data");
  }

  return data.analysis;
};
