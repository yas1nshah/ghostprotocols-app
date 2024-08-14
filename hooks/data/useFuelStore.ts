import { create } from 'zustand';
import FuelTypes from '@/constants/data/fuel_types.json';

export interface FuelType {
  id: number;
  name: string;
}

interface FuelStore {
  FuelTypes: FuelType[];
  filteredFuelTypes: FuelType[];
  searchText: string;
  setSearchText: (text: string) => void;
  filterFuelTypes: () => void;
  getFuelTypeById: (id: number) => FuelType | undefined;
  clearSearch: () => void;
}

const useFuelTypeStore = create<FuelStore>((set) => ({
  FuelTypes,
  filteredFuelTypes: FuelTypes,
  searchText: '',
  setSearchText: (text: string) => set({ searchText: text }),
  filterFuelTypes: () => set((state) => {
    const filtered = state.searchText
      ? state.FuelTypes.filter(FuelType =>
          FuelType.name.toLowerCase().includes(state.searchText.toLowerCase())
        )
      : state.FuelTypes;
    return { filteredFuelTypes: filtered };
  }),
  getFuelTypeById: (id: number) => {
    return FuelTypes.find(FuelType => FuelType.id === id);
  },
  clearSearch: () => set({ searchText: '', filteredFuelTypes: FuelTypes }),
}));

export default useFuelTypeStore;
