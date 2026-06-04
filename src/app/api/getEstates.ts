"use server";
import { apiFetch, ApiFetchOptions } from "@/shared/lib/fetchAPI";
import { ApiEstate } from "@/shared/types/types";

import mockData from "./mockEstate.json";

interface EstateResponse {
  results: ApiEstate[];
  success: boolean;
  totalCount: number;
  filteredCount: number;
  currentPage: string;
  regionId: number;
}

export async function fetchEstates({ page = 1 }: { page?: number }) {
  const url = `https://real-estate101.p.rapidapi.com/api/search/byurl?url=https%3A%2F%2Fwww.zillow.com%2Fnew-york-ny%2F%3FsearchQueryState%3D%257B%2522isMapVisible%2522%253Atrue%252C%2522mapBounds%2522%253A%257B%2522north%2522%253A40.99288801644816%252C%2522south%2522%253A40.4015026337193%252C%2522east%2522%253A-73.4399776308594%252C%2522west%2522%253A-74.51938436914065%257D%252C%2522filterState%2522%253A%257B%2522sort%2522%253A%257B%2522value%2522%253A%2522globalrelevanceex%2522%257D%257D%252C%2522isListVisible%2522%253Atrue%252C%2522usersSearchTerm%2522%253A%2522New%2520York%252C%2520NY%2522%252C%2522regionSelection%2522%253A%255B%257B%2522regionId%2522%253A6181%252C%2522regionType%2522%253A6%257D%255D%257D&page=${page}`;

  const options: ApiFetchOptions<undefined> = {
    method: "GET",
    headers: {
      "x-rapidapi-key": process.env.RAPIDAPI_KEY as string,
      "x-rapidapi-host": process.env.RAPIDAPI_HOST as string,
    },
    next: { revalidate: 24000 },
  };

  try {
    const response = await apiFetch<EstateResponse>(url, options);
    console.log(response, "options", options);

    if (!response || !response.results || response.results.length === 0) {
      console.warn("Api returned 200 OK, but 'results' are empty. Using local mock json file.");
      return mockData;
    }

    return response;
  } catch (error) {
    console.error("Api error, using local mock json file.", error);
    return mockData;
  }
}
