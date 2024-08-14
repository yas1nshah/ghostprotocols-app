import { create } from 'zustand';
import bodyTypes from '@/constants/data/body_types.json';

export interface BodyType {
  id: number;
  name: string;
}

interface BodyStore {
  bodyTypes: BodyType[];
  filteredBodyTypes: BodyType[];
  searchText: string;
  setSearchText: (text: string) => void;
  filterBodyTypes: () => void;
  getBodyTypeById: (id: number) => BodyType | undefined;
  clearSearch: () => void;
}

const useBodyTypeStore = create<BodyStore>((set) => ({
  bodyTypes,
  filteredBodyTypes: bodyTypes,
  searchText: '',
  setSearchText: (text: string) => set({ searchText: text }),
  filterBodyTypes: () => set((state) => {
    const filtered = state.searchText
      ? state.bodyTypes.filter(bodyType =>
          bodyType.name.toLowerCase().includes(state.searchText.toLowerCase())
        )
      : state.bodyTypes;
    return { filteredBodyTypes: filtered };
  }),
  getBodyTypeById: (id: number) => {
    return bodyTypes.find(bodyType => bodyType.id === id);
  },
  clearSearch: () => set({ searchText: '', filteredBodyTypes: bodyTypes }),
}));

export default useBodyTypeStore;
