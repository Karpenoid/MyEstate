import { ApiEstate, NYInfoType } from "@/shared/types/types";

export const analyzeNY = async (estates: ApiEstate[]): Promise<NYInfoType> => {
  const response = await fetch("/api/analyze-ny", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ estates }),
  });

  const data = await response.json();

  if (!data.success) {
    throw new Error(data.error || "Failed to analyze NY market data");
  }

  return data.analysis;
};
