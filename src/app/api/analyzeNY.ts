import { apiFetch } from "@/shared/lib/fetchAPI";
import { ApiEstate, NYInfoType } from "@/shared/types/types";

export const analyzeNY = async (estates: ApiEstate[]): Promise<NYInfoType> => {
  const response = await apiFetch<{ analysis: NYInfoType }>("/api/analyze-ny", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    rawBody: JSON.stringify({ estates }),
  });

  return response.analysis;
};
