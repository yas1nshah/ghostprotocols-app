import { create } from 'zustand';
import transmissions from '@/constants/data/transmissions.json';

export interface Transmission {
  id: number;
  name: string;
}

interface TransmissionStore {
  transmissions: Transmission[];
  filteredTransmissions: Transmission[];
  searchText: string;
  setSearchText: (text: string) => void;
  filterTransmissions: () => void;
  getTransmissionById: (id: number) => Transmission | undefined;
  clearSearch: () => void;
}

const useTransmissionStore = create<TransmissionStore>((set) => ({
  transmissions,
  filteredTransmissions: transmissions,
  searchText: '',
  setSearchText: (text: string) => set({ searchText: text }),
  filterTransmissions: () => set((state) => {
    const filtered = state.searchText
      ? state.transmissions.filter(transmission =>
          transmission.name.toLowerCase().includes(state.searchText.toLowerCase())
        )
      : state.transmissions;
    return { filteredTransmissions: filtered };
  }),
  getTransmissionById: (id: number) => {
    return transmissions.find(transmission => transmission.id === id);
  },
  clearSearch: () => set({ searchText: '', filteredTransmissions: transmissions }),
}));

export default useTransmissionStore;
