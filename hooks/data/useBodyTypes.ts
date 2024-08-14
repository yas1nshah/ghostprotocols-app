import { create } from 'zustand';
import bodyTypesData from '@/constants/data/body_types.json';

interface BodyType {
  id: number;
  name: string;
}

interface BodyTypeStore {
  bodyTypes: BodyType[];
  searchText: string;
  filteredBodyTypes: BodyType[];
  setSearchText: (text: string) => void;
  clearSearch: () => void;
  getBodyTypeById: (id: number) => BodyType | undefined;
  getAllBodyTypes: () => BodyType[];
}

const useBodyTypeStore = create<BodyTypeStore>((set) => ({
  bodyTypes: bodyTypesData,
  searchText: '',
  filteredBodyTypes: bodyTypesData,

  setSearchText: (text: string) => {
    set((state) => {
      const filtered = state.bodyTypes.filter((bodyType) =>
        bodyType.name.toLowerCase().includes(text.toLowerCase())
      );
      return { searchText: text, filteredBodyTypes: filtered };
    });
  },

  clearSearch: () => {
    set({ searchText: '', filteredBodyTypes: bodyTypesData });
  },

  getBodyTypeById: (id: number) => {
    return bodyTypesData.find((bodyType) => bodyType.id === id);
  },

  getAllBodyTypes: () => {
    return bodyTypesData;
  },
}));

export default useBodyTypeStore;
