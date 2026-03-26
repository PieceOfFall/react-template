import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type AuthState = {
  isLoggedIn: boolean
  login: (account: string, password: string) => boolean
  logout: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isLoggedIn: false,
      login: (account, password) => {
        const ok = account.trim().length > 0 && password.trim().length > 0
        if (ok) {
          set({ isLoggedIn: true })
        }
        return ok
      },
      logout: () => set({ isLoggedIn: false }),
    }),
    {
      name: 'mall-auth',
      partialize: (state) => ({ isLoggedIn: state.isLoggedIn }),
    },
  ),
)
