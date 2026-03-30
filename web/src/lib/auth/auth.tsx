import { Navigate, useLocation } from 'react-router';
import { Loader2 } from 'lucide-react';

import { useUser } from './auth.ts';
import { getHref } from '../../util/path.ts';
import { Button } from '@/components/ui/button';
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

const FullPageState = ({
  title,
  description,
  primaryLabel,
  onPrimary,
}: {
  title: string;
  description: string;
  primaryLabel: string;
  onPrimary: () => void;
}) => (
  <div className="flex min-h-screen items-center justify-center bg-muted/40 px-4 py-16">
    <Card className="w-full max-w-md shadow-lg text-center">
      <CardHeader>
        <CardTitle className="text-xl">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardFooter className="justify-center">
        <Button onClick={onPrimary}>
          {primaryLabel === 'Refresh' && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {primaryLabel}
        </Button>
      </CardFooter>
    </Card>
  </div>
);

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const user = useUser();
  const location = useLocation();

  if (user.isLoading) {
    return (
      <FullPageState
        title="Checking your session"
        description="Validating your account and permissions before entering the app."
        primaryLabel="Refresh"
        onPrimary={() => user.refetch()}
      />
    );
  }

  if (user.isError) {
    return (
      <FullPageState
        title="Session check failed"
        description={user.error instanceof Error ? user.error.message : 'Unable to validate your login state.'}
        primaryLabel="Retry"
        onPrimary={() => user.refetch()}
      />
    );
  }

  if (!user.data) {
    const redirectTo = `${location.pathname}${location.search}${location.hash}`;
    return <Navigate replace to={getHref('/auth/login', redirectTo)} />;
  }

  return children;
};
