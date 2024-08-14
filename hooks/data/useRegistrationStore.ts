import { create } from 'zustand';
import registrations from '@/constants/data/registrations.json';

interface Registration {
  id: number;
  name: string;
  name_ur: string;
  type: string;
}

interface RegistrationStore {
  registrations: Registration[];
  filteredRegistrations: Registration[];
  searchText: string;
  setSearchText: (text: string) => void;
  filterRegistrations: () => void;
  getRegistrationById: (id: number) => Registration | undefined;
  clearSearch: () => void;
}

const useRegistrationStore = create<RegistrationStore>((set) => ({
  registrations,
  filteredRegistrations: registrations,
  searchText: '',
  setSearchText: (text: string) => set({ searchText: text }),
  filterRegistrations: () => set((state) => {
    const filtered = state.searchText
      ? state.registrations.filter(registration =>
          registration.name.toLowerCase().includes(state.searchText.toLowerCase())
        )
      : state.registrations;
    return { filteredRegistrations: filtered };
  }),
  getRegistrationById: (id: number) => {
    return registrations.find(registration => registration.id === id);
  },
  clearSearch: () => set({ searchText: '', filteredRegistrations: registrations }),
}));

export default useRegistrationStore;
