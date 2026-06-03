import { apiFetch } from "@/shared/lib/fetchAPI";
import { ApiEstate, SoloEstateAnalysis } from "@/shared/types/types";

export const analyzeSingle = async (estate: ApiEstate): Promise<SoloEstateAnalysis> => {
  const response = await apiFetch<{ analysis: SoloEstateAnalysis }>("/api/analyze-single", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    rawBody: JSON.stringify({ estate }),
  });

  return response.analysis;
};
