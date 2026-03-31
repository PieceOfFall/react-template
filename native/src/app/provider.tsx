import { QueryClientProvider } from '@tanstack/react-query'
import type { ReactNode } from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { queryClient } from '../lib/queryClient'

export const AppProvider = ({ children }: { children: ReactNode }) => (
  <SafeAreaProvider>
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  </SafeAreaProvider>
)
