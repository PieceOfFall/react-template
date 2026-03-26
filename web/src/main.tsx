import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { QueryClientProvider } from '@tanstack/react-query'
import { RouterProvider } from 'react-router-dom'
import DevtoolsInDev from './components/DevtoolsInDev'
import { queryClient } from './lib/queryClient'
import { router } from './router'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      {import.meta.env.DEV ? <DevtoolsInDev /> : null}
    </QueryClientProvider>
  </StrictMode>,
)
