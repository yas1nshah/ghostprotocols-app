import { create } from 'zustand';

export type SignInState = {
    identifier: string;
    password: string;
};

type SignInActions = {
    updateIdentifier: (identifier: SignInState['identifier']) => void
    updatePassword: (password: SignInState['password']) => void
}

const useSignIn =  create<SignInState & SignInActions>((set)=>({
    identifier: "",
    password: "",
    updateIdentifier: (identifier) => set({identifier}),
    updatePassword: (password) => set({password}),
}))

export default useSignIn;
