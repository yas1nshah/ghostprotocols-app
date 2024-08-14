import { create } from 'zustand';
import colors from '@/constants/data/colors.json';

export interface Color {
  id: number;
  name: string;
  name_ur: string;
  hex_code: string;
}

interface ColorStore {
  colors: Color[];
  filteredColors: Color[];
  searchText: string;
  setSearchText: (text: string) => void;
  filterColors: () => void;
  getColorById: (id: number) => Color | undefined;
  clearSearch: () => void;
}

const useColorStore = create<ColorStore>((set) => ({
  colors,
  filteredColors: colors,
  searchText: '',
  setSearchText: (text: string) => set({ searchText: text }),
  filterColors: () => set((state) => {
    const filtered = state.searchText
      ? state.colors.filter(color =>
          color.name.toLowerCase().includes(state.searchText.toLowerCase())
        )
      : state.colors;
    return { filteredColors: filtered };
  }),
  getColorById: (id: number) => {
    return colors.find(color => color.id === id);
  },
  clearSearch: () => set({ searchText: '', filteredColors: colors }),
}));

export default useColorStore;
