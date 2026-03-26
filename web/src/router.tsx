import { createBrowserRouter } from 'react-router-dom'

export const router = createBrowserRouter([
  {
    path: '/login',
    lazy: async () => {
      const module = await import('./pages/LoginPage')
      return { Component: module.default }
    },
  },
  {
    lazy: async () => {
      const module = await import('./components/RequireAuth')
      return { Component: module.default }
    },
    children: [
      {
        path: '/',
        lazy: async () => {
          const module = await import('./App')
          return { Component: module.default }
        },
        children: [
          {
            index: true,
            lazy: async () => {
              const module = await import('./pages/HomePage')
              return { Component: module.default }
            },
          },
          {
            path: 'me',
            lazy: async () => {
              const module = await import('./pages/UserCenterPage')
              return { Component: module.default }
            },
          },
        ],
      },
    ],
  },
])
