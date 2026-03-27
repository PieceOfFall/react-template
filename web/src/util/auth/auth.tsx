import { Navigate, useLocation } from 'react-router';

import { useUser } from './auth.ts';
import { getHref } from '../path.ts';

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
  <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-950 px-6 py-16 text-slate-100">
    <div className="pointer-events-none absolute -left-24 top-[-30%] h-96 w-96 rounded-full bg-sky-500/25 blur-3xl" />
    <div className="pointer-events-none absolute -right-24 bottom-[-30%] h-96 w-96 rounded-full bg-cyan-400/20 blur-3xl" />

    <div className="relative w-full max-w-xl rounded-3xl border border-white/15 bg-white/10 p-8 shadow-2xl backdrop-blur-xl">
      <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>
      <p className="mt-3 text-sm leading-6 text-slate-300">{description}</p>
      <button
        className="mt-6 inline-flex items-center rounded-lg bg-cyan-400 px-4 py-2 text-sm font-medium text-slate-950 transition hover:bg-cyan-300"
        onClick={onPrimary}
        type="button"
      >
        {primaryLabel}
      </button>
    </div>
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
