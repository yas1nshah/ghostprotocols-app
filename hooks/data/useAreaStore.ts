import { create } from 'zustand';
import areas from '@/constants/data/areas.json';

interface Area {
  id: number;
  city_id: number;
  name: string;
  name_ur: string;
}

interface AreaStore {
  areas: Area[];
  filteredAreas: Area[];
  searchText: string;
  setSearchText: (text: string) => void;
  filterAreas: () => void;
  setAreasByCityId: (city_id: number) => void;
  getAreaById: (id: number) => Area | undefined;
  clearSearch: () => void;
  getAreasByCityId: (city_id: number) => Area[];
}

const useAreaStore = create<AreaStore>((set) => ({
  areas,
  filteredAreas: areas,
  searchText: '',
  setSearchText: (text: string) => set({ searchText: text }),

  filterAreas: () => set((state) => {
    const filtered = state.searchText
      ? state.areas.filter(area =>
          area.name.toLowerCase().includes(state.searchText.toLowerCase())
        )
      : state.areas;
    return { filteredAreas: filtered };
  }),

  setAreasByCityId: (city_id: number) => set((state) => {
    const filtered = state.areas.filter(area => area.city_id === city_id);
    return { filteredAreas: filtered };
  }),

  getAreaById: (id: number) => {
    return areas.find(area => area.id === id);
  },

  clearSearch: () => set({ searchText: '', filteredAreas: areas }),

  getAreasByCityId: (city_id: number) => {
    return areas.filter(area => area.city_id === city_id);
  },
}));

export default useAreaStore;
