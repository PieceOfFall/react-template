import AsyncStorage from '@react-native-async-storage/async-storage'
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'

type AuthContextValue = {
  isHydrated: boolean
  isLoggedIn: boolean
  login: (account: string, password: string) => boolean
  logout: () => void
}

const AUTH_STORAGE_KEY = 'mall-auth:isLoggedIn'

const AuthContext = createContext<AuthContextValue | null>(null)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isHydrated, setIsHydrated] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    const hydrate = async () => {
      try {
        const value = await AsyncStorage.getItem(AUTH_STORAGE_KEY)
        setIsLoggedIn(value === '1')
      } finally {
        setIsHydrated(true)
      }
    }

    void hydrate()
  }, [])

  const login = (account: string, password: string) => {
    const ok = account.trim().length > 0 && password.trim().length > 0
    if (!ok) {
      return false
    }

    setIsLoggedIn(true)
    void AsyncStorage.setItem(AUTH_STORAGE_KEY, '1')
    return true
  }

  const logout = () => {
    setIsLoggedIn(false)
    void AsyncStorage.removeItem(AUTH_STORAGE_KEY)
  }

  const value = useMemo<AuthContextValue>(
    () => ({
      isHydrated,
      isLoggedIn,
      login,
      logout,
    }),
    [isHydrated, isLoggedIn],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used inside AuthProvider')
  }
  return context
}
