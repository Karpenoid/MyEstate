import { ApiEstate, SoloEstateAnalysis } from "@/shared/types/types";

export const analyzeSingle = async (estate: ApiEstate): Promise<SoloEstateAnalysis> => {
  const response = await fetch("/api/analyze-single", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ estate }),
  });

  const data = await response.json();

  if (!data.success) {
    throw new Error(data.error || "Failed to analyze the property");
  }

  return data.analysis;
};
