/* eslint-disable @typescript-eslint/no-explicit-any */
import { QueryClient, useQueryClient } from '@tanstack/react-query';
import { useMemo } from 'react';
import { createBrowserRouter } from 'react-router';
import { RouterProvider } from 'react-router/dom';

import { ProtectedRoute } from '@/util/auth';

import {
  default as AppRoot,
  ErrorBoundary as AppRootErrorBoundary,
} from './routes/app/root.tsx';

const RouteHydrateFallback = () => (
  <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-950 px-6 py-16 text-slate-100">
    <div className="pointer-events-none absolute -left-24 top-[-30%] h-96 w-96 rounded-full bg-cyan-500/20 blur-3xl" />
    <div className="pointer-events-none absolute -right-24 bottom-[-30%] h-96 w-96 rounded-full bg-indigo-400/20 blur-3xl" />
    <div className="relative w-full max-w-xl rounded-3xl border border-white/15 bg-white/10 p-8 shadow-2xl backdrop-blur-xl">
      <h2 className="text-2xl font-semibold tracking-tight">Loading route</h2>
      <p className="mt-3 text-sm leading-6 text-slate-300">
        Fetching route module and preparing page state.
      </p>
      <div className="mt-6 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
        <div className="h-full w-1/3 animate-pulse rounded-full bg-cyan-300" />
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
