import { create } from 'zustand';
import cities from '@/constants/cities.json';

interface City {
  id: number;
  name: string;
  name_ur: string;
  popular: boolean;
}

interface CityStore {
  cities: City[];
  filteredCities: City[];
  searchText: string;
  setSearchText: (text: string) => void;
  filterCities: () => void;
  getCityById: (id: number) => City | undefined;
  clearSearch: () => void;
}

const useCityStore = create<CityStore>((set) => ({
  cities,
  filteredCities: cities,
  searchText: '',
  setSearchText: (text: string) => set({ searchText: text }),
  filterCities: () => set((state) => {
    const filtered = state.searchText
      ? state.cities.filter(city =>
          city.name.toLowerCase().includes(state.searchText.toLowerCase())
        )
      : state.cities;
    return { filteredCities: filtered };
  }),
  getCityById: (id: number) => {
    return cities.find(city => city.id === id);
  },
  clearSearch: () => set({ searchText: '', filteredCities: cities }),
}));

export default useCityStore;
