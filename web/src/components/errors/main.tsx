import type { FallbackProps } from 'react-error-boundary';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export const MainErrorFallback = ({ error, resetErrorBoundary }: FallbackProps) => {
  return (
    <div
      className="bg-muted/40 flex min-h-screen items-center justify-center px-4 py-16"
      role="alert"
    >
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader>
          <div className="bg-destructive/10 mb-4 flex h-12 w-12 items-center justify-center rounded-full">
            <AlertTriangle className="text-destructive h-6 w-6" />
          </div>
          <CardTitle className="text-2xl">Something went wrong</CardTitle>
          <CardDescription>An unexpected runtime error occurred.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="bg-muted text-muted-foreground rounded-md p-4 text-sm">
            {error instanceof Error ? error.message : 'Unknown error'}
          </div>
        </CardContent>
        <CardFooter className="flex gap-3">
          <Button onClick={resetErrorBoundary} variant="default" className="flex-1">
            <RefreshCw className="mr-2 h-4 w-4" />
            Retry
          </Button>
          <Button
            onClick={() => window.location.assign(window.location.origin)}
            variant="outline"
            className="flex-1"
          >
            <Home className="mr-2 h-4 w-4" />
            Go Home
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};
