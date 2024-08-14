import { create } from 'zustand';
import models from '@/constants/models.json';

export interface Model {
  id: number;
  name: string;
  name_ur: string;
  make_id: number;
}

interface ModelStore {
  models: Model[];
  filteredModels: Model[];
  searchText: string;
  setSearchText: (text: string) => void;
  filterModels: () => void;
  clearSearch: () => void;
  getModelById: (id: number) => Model | undefined;
}

export const useModelStore = create<ModelStore>((set) => ({
  models,
  filteredModels: models,
  searchText: '',
  setSearchText: (text: string) => set({ searchText: text }),
  filterModels: () => set((state) => {
    const filtered = state.searchText
      ? state.models.filter(model =>
          model.name.toLowerCase().includes(state.searchText.toLowerCase())
        )
      : state.models;
    return { filteredModels: filtered };
  }),
  clearSearch: () => set(() => ({
    searchText: '',
    filteredModels: models,
  })),
  getModelById: (id: number) => {
    const model = models.find(model => model.id === id);
    return model;
  },
}));

export default useModelStore;
