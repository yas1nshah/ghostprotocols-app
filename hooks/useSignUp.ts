import { create } from 'zustand';

export type SignUpState = {
    name: string;
    email: string;
    phone: string;
    city: number;
    address: string;
    isDealer: boolean;
    timingsFrom: Date;
    timingsTo: Date;
    password: string;
    confirmPassword: string;
};

type SignUpActions = {
    updateName: (name: SignUpState['name']) => void;
    updateEmail: (email: SignUpState['email']) => void;
    updatePhone: (phone: SignUpState['phone']) => void;
    updateCity: (city: SignUpState['city']) => void;
    updateAddress: (address: SignUpState['address']) => void;
    updateIsDealer: (isDealer: SignUpState['isDealer']) => void;
    updateTimingsFrom: (timingsFrom: SignUpState['timingsFrom']) => void;
    updateTimingsTo: (timingsTo: SignUpState['timingsTo']) => void;
    updatePassword: (password: SignUpState['password']) => void;
    updateConfirmPassword: (confirmPassword: SignUpState['confirmPassword']) => void;
};

const useSignUp = create<SignUpState & SignUpActions>((set) => ({
    name: "",
    email: "",
    phone: "",
    city: 0,
    address: "",
    isDealer: false,
    timingsFrom: new Date(),
    timingsTo: new Date(),
    password: "",
    confirmPassword: "",
    updateName: (name) => set({ name }),
    updateEmail: (email) => set({ email }),
    updatePhone: (phone) => set({ phone }),
    updateCity: (city) => set({ city }),
    updateAddress: (address) => set({ address }),
    updateIsDealer: (isDealer) => set({ isDealer }),
    updateTimingsFrom: (timingsFrom) => set({ timingsFrom }),
    updateTimingsTo: (timingsTo) => set({ timingsTo }),
    updatePassword: (password) => set({ password }),
    updateConfirmPassword: (confirmPassword) => set({ confirmPassword }),
}));

export default useSignUp;
