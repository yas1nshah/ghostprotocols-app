import { create } from 'zustand';

export type UpdateState = {
    name: string;
    city: number;
    address: string;
    timingsFrom: Date;
    timingsTo: Date;
    isDealer: boolean;

};

type UpdateActions = {
    updateName: (name: UpdateState['name']) => void;
    updateCity: (city: UpdateState['city']) => void;
    updateAddress: (address: UpdateState['address']) => void;
    updateTimingsFrom: (timingsFrom: UpdateState['timingsFrom']) => void;
    updateTimingsTo: (timingsTo: UpdateState['timingsTo']) => void;
    updateIsDealer: (isDealer: UpdateState['isDealer']) => void;
};

const useUpdate = create<UpdateState & UpdateActions>((set) => ({
    name: "",
    city: 0,
    address: "",
    timingsFrom: new Date(),
    timingsTo: new Date(),
    isDealer: false,
    updateName: (name) => set({ name }),
    updateCity: (city) => set({ city }),
    updateAddress: (address) => set({ address }),
    updateTimingsFrom: (timingsFrom) => set({ timingsFrom }),
    updateTimingsTo: (timingsTo) => set({ timingsTo }),
    updateIsDealer: (isDealer) => set({ isDealer }),
}));

export default useUpdate;
