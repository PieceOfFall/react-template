import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import * as React from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { HelmetProvider } from 'react-helmet-async';
import { Loader2 } from 'lucide-react';

import { MainErrorFallback } from '@/components/errors/main.tsx';
import { getAccessToken } from '@/service';
import { AuthLoader } from '@/util/auth';
import { queryConfig } from '@/util/react-query';
import { Button } from '@/components/ui/button';
import { Toaster } from '@/components/ui/toaster';

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
  <div className="flex min-h-screen items-center justify-center bg-background px-4 text-center">
    <div className="w-full max-w-md space-y-4">
      <h2 className="text-2xl font-semibold tracking-tight text-foreground">{title}</h2>
      <p className="text-sm text-muted-foreground">{description}</p>
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
          <Loader2 className="mx-auto mt-6 h-8 w-8 animate-spin text-primary" />
        </FullScreenPanel>
      }
    >
      <ErrorBoundary FallbackComponent={MainErrorFallback}>
        <HelmetProvider>
          <QueryClientProvider client={queryClient}>
            {import.meta.env.DEV && <ReactQueryDevtools />}
            <AuthLoader
              renderLoading={() =>
                getAccessToken() ? (
                  <FullScreenPanel
                    title="Authenticating session"
                    description="Contacting the server to verify your access token and profile state."
                  >
                    <div className="mt-6 flex justify-center text-muted-foreground">
                      <Loader2 className="h-6 w-6 animate-spin" />
                    </div>
                  </FullScreenPanel>
                ) : null
              }
              renderError={(error) => (
                <FullScreenPanel
                  title="Authentication check failed"
                  description={error instanceof Error ? error.message : 'Unknown error'}
                >
                  <div className="mt-6 flex flex-wrap justify-center gap-3">
                    <Button
                      onClick={() => window.location.reload()}
                    >
                      Retry
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => window.location.assign('/auth/login')}
                    >
                      Back to Login
                    </Button>
                  </div>
                </FullScreenPanel>
              )}
            >
              {children}
            </AuthLoader>
            <Toaster />
          </QueryClientProvider>
        </HelmetProvider>
      </ErrorBoundary>
    </React.Suspense>
  );
};
