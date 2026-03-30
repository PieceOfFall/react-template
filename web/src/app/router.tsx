/* eslint-disable @typescript-eslint/no-explicit-any */
import { QueryClient, useQueryClient } from '@tanstack/react-query';
import { useMemo } from 'react';
import { Navigate, createBrowserRouter } from 'react-router';
import { RouterProvider } from 'react-router/dom';
import { Loader2 } from 'lucide-react';

import { ProtectedRoute } from '@/components/auth/index.ts';

import { default as AppRoot, ErrorBoundary as AppRootErrorBoundary } from './routes/app/root.tsx';

const RouteHydrateFallback = () => (
  <div className="bg-background flex min-h-screen items-center justify-center px-4">
    <div className="flex flex-col items-center space-y-4 text-center">
      <Loader2 className="text-primary h-8 w-8 animate-spin" />
      <div className="space-y-1">
        <h2 className="text-foreground text-lg font-semibold tracking-tight">Loading route</h2>
        <p className="text-muted-foreground text-sm">
          Fetching route module and preparing page state.
        </p>
      </div>
    </div>
  </div>
);

const convert = (queryClient: QueryClient) => (m: any) => {
  const { clientLoader, clientAction, default: Component, ...rest } = m;
  return {
    ...rest,
    loader: clientLoader?.(queryClient),
    action: clientAction?.(queryClient),
    Component,
  };
};

const createAppRouter = (queryClient: QueryClient) =>
  createBrowserRouter([
    {
      path: '/',
      element: <Navigate replace to="/app" />,
    },
    {
      path: '/auth/register',
      HydrateFallback: RouteHydrateFallback,
      lazy: () => import('./routes/auth/register.tsx').then(convert(queryClient)),
    },
    {
      path: '/auth/login',
      HydrateFallback: RouteHydrateFallback,
      lazy: () => import('./routes/auth/login.tsx').then(convert(queryClient)),
    },
    {
      path: '/app',
      element: (
        <ProtectedRoute>
          <AppRoot />
        </ProtectedRoute>
      ),
      ErrorBoundary: AppRootErrorBoundary,
      children: [
        {
          index: true,
          HydrateFallback: RouteHydrateFallback,
          lazy: () => import('./routes/app/home.tsx').then(convert(queryClient)),
        },
      ],
    },
    {
      path: '*',
      HydrateFallback: RouteHydrateFallback,
      lazy: () => import('./routes/not-found.tsx').then(convert(queryClient)),
    },
  ]);

export const AppRouter = () => {
  const queryClient = useQueryClient();

  const router = useMemo(() => createAppRouter(queryClient), [queryClient]);

  return <RouterProvider router={router} />;
};
