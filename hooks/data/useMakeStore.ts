// stores/makeStore.ts
import { create } from 'zustand';
import makes from '@/constants/makes.json';
import { Model, useModelStore } from './useModelStore';

export interface Make {
  id: number;
  name: string;
  name_ur: string;
}

interface MakeStore {
  makes: Make[];
  filteredMakes: Make[];
  searchText: string;
  setSearchText: (text: string) => void;
  filterMakes: () => void;
  getMakeById: (id: number) => Make | undefined;
  getModels: (makeId: number) => Model[];
}

export const useMakeStore = create<MakeStore>((set) => ({
  makes,
  filteredMakes: makes,
  searchText: '',
  setSearchText: (text: string) => set({ searchText: text }),
  filterMakes: () => set((state) => {
    const filtered = state.searchText
      ? state.makes.filter(make =>
          make.name.toLowerCase().includes(state.searchText.toLowerCase())
        )
      : state.makes;
    return { filteredMakes: filtered };
  }),
  getMakeById: (id: number) => {
    const make = makes.find(make => make.id === id);
    return make;
  },
  getModels: (makeId: number) => {
    const modelStore = useModelStore.getState();
    return modelStore.models.filter(model => model.make_id === makeId);
  },
}));

export default useMakeStore;
