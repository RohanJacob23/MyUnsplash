import { create } from "zustand";

interface SearchState {
  search: string;
  setSearch: (searchValue: string) => void;
}

const useSearch = create<SearchState>()((set) => ({
  search: "",
  setSearch: (searchValue) => set({ search: searchValue }),
}));

export { useSearch };
