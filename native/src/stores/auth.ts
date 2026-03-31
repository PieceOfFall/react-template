import AsyncStorage from '@react-native-async-storage/async-storage'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

export type AuthState = {
  isHydrated: boolean
  isLoggedIn: boolean
  login: (account: string, password: string) => boolean
  logout: () => void
  setHydrated: (value: boolean) => void
}

const AUTH_STORAGE_KEY = 'mall-auth'

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isHydrated: false,
      isLoggedIn: false,
      login: (account: string, password: string) => {
        const ok = account.trim().length > 0 && password.trim().length > 0
        if (!ok) {
          return false
        }

        set({ isLoggedIn: true })
        return true
      },
      logout: () => {
        set({ isLoggedIn: false })
      },
      setHydrated: (value: boolean) => {
        set({ isHydrated: value })
      },
    }),
    {
      name: AUTH_STORAGE_KEY,
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state: AuthState) => ({ isLoggedIn: state.isLoggedIn }),
      onRehydrateStorage: () => (state?: AuthState) => {
        state?.setHydrated(true)
      },
    },
  ),
)
