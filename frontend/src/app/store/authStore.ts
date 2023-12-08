import {create} from 'zustand';
import { isAuth } from '../utils/auth/isAuth';

interface AuthState {
  isAuthenticated:() => Promise<boolean | undefined>;
  loading: boolean;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: async() => {
    return await isAuth()
  },
  loading: true,
}));
