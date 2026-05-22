import { create } from "zustand";

import { fetchEstates } from "@/app/api/getEstates";
import { ApiEstate } from "@/shared/types/types";

interface EstateStore {
  estates: ApiEstate[];
  isLoading: boolean;
  fetchEstatesAction: () => Promise<void>;

  searchQuery: string;
  setSearchQuery: (query: string) => void;

  minPrice: string;
  setMinPrice: (val: string) => void;
  maxPrice: string;
  setMaxPrice: (val: string) => void;

  minArea: string;
  setMinArea: (val: string) => void;
  maxArea: string;
  setMaxArea: (val: string) => void;

  selectedEstateId: string | null;

  isModalOpen: boolean;
  openModal: (id: string) => void;
  closeModal: () => void;
}

export const useEstateStore = create<EstateStore>((set, get) => ({
  estates: [],
  isLoading: true,

  searchQuery: "",
  setSearchQuery: (query) => set({ searchQuery: query }),

  minPrice: "",
  setMinPrice: (val) => set({ minPrice: val }),
  maxPrice: "",
  setMaxPrice: (val) => set({ maxPrice: val }),

  minArea: "",
  setMinArea: (val) => set({ minArea: val }),
  maxArea: "",
  setMaxArea: (val) => set({ maxArea: val }),

  selectedEstateId: null,

  isModalOpen: false,
  openModal: (id) =>
    set({
      isModalOpen: true,
      selectedEstateId: id,
    }),

  closeModal: () => {
    set({ isModalOpen: false });

    setTimeout(() => {
      set({ selectedEstateId: null });
    }, 400);
  },

  fetchEstatesAction: async () => {
    if (get().estates.length > 0) {
      set({ isLoading: false });
      return;
    }

    set({ isLoading: true });
    try {
      const data = await fetchEstates();
      const results = Array.isArray(data) ? data : data?.results || [];
      set({ estates: results });
    } catch (error) {
      console.error("Failed to load data in store:", error);
    } finally {
      set({ isLoading: false });
    }
  },
}));
