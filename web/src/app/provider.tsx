import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import * as React from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { HelmetProvider } from 'react-helmet-async';

import { MainErrorFallback } from '@/components/errors/main.tsx';
import { AuthLoader } from '@/util/auth';
import { queryConfig } from '@/util/react-query';

type AppProviderProps = {
  children: React.ReactNode;
};

const FullScreenPanel = ({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children?: React.ReactNode;
}) => (
  <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-950 px-6 py-16 text-slate-100">
    <div className="pointer-events-none absolute -left-24 top-[-30%] h-96 w-96 rounded-full bg-cyan-500/20 blur-3xl" />
    <div className="pointer-events-none absolute -right-24 bottom-[-30%] h-96 w-96 rounded-full bg-indigo-400/20 blur-3xl" />

    <div className="relative w-full max-w-xl rounded-3xl border border-white/15 bg-white/10 p-8 shadow-2xl backdrop-blur-xl">
      <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>
      <p className="mt-3 text-sm leading-6 text-slate-300">{description}</p>
      {children}
    </div>
  </div>
);

export const AppProvider = ({ children }: AppProviderProps) => {
  const [queryClient] = React.useState(
    () =>
      new QueryClient({
        defaultOptions: queryConfig,
      }),
  );

  return (
    <React.Suspense
      fallback={
        <FullScreenPanel
          title="Loading application"
          description="Preparing modules and restoring cached client state."
        >
          <div className="mt-6 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
            <div className="h-full w-1/3 animate-pulse rounded-full bg-cyan-300" />
          </div>
        </FullScreenPanel>
      }
    >
      <ErrorBoundary FallbackComponent={MainErrorFallback}>
        <HelmetProvider>
          <QueryClientProvider client={queryClient}>
            {import.meta.env.DEV && <ReactQueryDevtools />}
            <AuthLoader
              renderLoading={() => (
                <FullScreenPanel
                  title="Authenticating session"
                  description="Contacting the server to verify your access token and profile state."
                >
                  <div className="mt-6 inline-flex items-center gap-2 text-sm text-slate-200">
                    <span className="h-2 w-2 animate-ping rounded-full bg-cyan-300" />
                    Please wait...
                  </div>
                </FullScreenPanel>
              )}
              renderError={(error) => (
                <FullScreenPanel
                  title="Authentication check failed"
                  description={error instanceof Error ? error.message : 'Unknown error'}
                >
                  <div className="mt-6 flex flex-wrap gap-3">
                    <button
                      className="inline-flex items-center rounded-lg bg-cyan-400 px-4 py-2 text-sm font-medium text-slate-950 transition hover:bg-cyan-300"
                      onClick={() => window.location.reload()}
                      type="button"
                    >
                      Retry
                    </button>
                    <button
                      className="inline-flex items-center rounded-lg border border-white/20 bg-white/5 px-4 py-2 text-sm font-medium text-slate-100 transition hover:bg-white/10"
                      onClick={() => window.location.assign('/auth/login')}
                      type="button"
                    >
                      Back to Login
                    </button>
                  </div>
                </FullScreenPanel>
              )}
            >
              {children}
            </AuthLoader>
          </QueryClientProvider>
        </HelmetProvider>
      </ErrorBoundary>
    </React.Suspense>
  );
};
