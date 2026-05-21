import { create } from "zustand";

import { fetchEstates } from "@/app/api/getEstates";
import { ApiEstate } from "@/shared/types/types";

interface EstateStore {
  estates: ApiEstate[];
  isLoading: boolean;
  fetchEstatesAction: () => Promise<void>;

  searchQuery: string;
  setSearchQuery: (query: string) => void;

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
