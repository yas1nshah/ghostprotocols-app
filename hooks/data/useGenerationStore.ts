import { create } from 'zustand';
import generations from '@/constants/data/generations.json';

export interface Generation {
  id: number;
  start: number;
  end: number;
  model_id: number;
}

interface GenerationStore {
  generations: Generation[];
  filteredGenerations: Generation[];
  searchText: string;
  setSearchText: (text: string) => void;
  filterGenerations: () => void;
  getGenerationById: (id: number) => Generation | undefined;
  clearSearch: () => void;
  filterByModelAndYear: (modelId: number, year: number) => number; // Updated method signature
}

const useGenerationStore = create<GenerationStore>((set) => ({
  generations,
  filteredGenerations: generations,
  searchText: '',
  setSearchText: (text: string) => set({ searchText: text }),
  filterGenerations: () => set((state) => {
    const filtered = state.searchText
      ? state.generations.filter(generation =>
          `${generation.start}-${generation.end}`
            .toLowerCase()
            .includes(state.searchText.toLowerCase())
        )
      : state.generations;
    return { filteredGenerations: filtered };
  }),
  getGenerationById: (id: number) => {
    return generations.find(generation => generation.id === id);
  },
  clearSearch: () => set({ searchText: '', filteredGenerations: generations }),
  filterByModelAndYear: (modelId: number, year: number) => {
    return generations.filter(generation =>
      generation.model_id === modelId &&
      year >= generation.start &&
      year <= generation.end
    ).length;
  },
}));

export default useGenerationStore;
