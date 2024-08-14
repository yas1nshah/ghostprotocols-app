import { create } from 'zustand';
import versions from '@/constants/data/versions.json';

export interface Version {
  id: number;
  gen_id: number;
  model_id: number;
  name: string;
  name_ur: string;
  transmission: number;
  engine_capacity: number;
  fuel_type: number;
}

interface VersionStore {
  versions: Version[];
  filteredVersions: Version[];
  searchText: string;
  setSearchText: (text: string) => void;
  filterVersions: () => void;
  getVersionById: (id: number) => Version | undefined;
  getVersionsByModelId: (model_id: number) => Version[];
  clearSearch: () => void;
}

const useVersionStore = create<VersionStore>((set) => ({
  versions,
  filteredVersions: versions,
  searchText: '',
  setSearchText: (text: string) => set({ searchText: text }),
  filterVersions: () => set((state) => {
    const filtered = state.searchText
      ? state.versions.filter(version =>
          version.name.toLowerCase().includes(state.searchText.toLowerCase())
        )
      : state.versions;
    return { filteredVersions: filtered };
  }),
  getVersionById: (id: number) => {
    return versions.find(version => version.id === id);
  },
  getVersionsByModelId: (model_id: number) => {
    return versions.filter(version => version.model_id === model_id);
  },
  clearSearch: () => set({ searchText: '', filteredVersions: versions }),
}));

export default useVersionStore;
