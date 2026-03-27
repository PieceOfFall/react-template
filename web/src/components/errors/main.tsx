import type { FallbackProps } from 'react-error-boundary';

export const MainErrorFallback = ({ error, resetErrorBoundary }: FallbackProps) => {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-950 px-6 py-16 text-slate-100" role="alert">
      <div className="pointer-events-none absolute -left-24 top-[-30%] h-96 w-96 rounded-full bg-rose-500/25 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-[-30%] h-96 w-96 rounded-full bg-amber-400/20 blur-3xl" />

      <div className="relative w-full max-w-xl rounded-3xl border border-white/15 bg-white/10 p-8 shadow-2xl backdrop-blur-xl">
        <p className="text-xs uppercase tracking-[0.24em] text-rose-200/80">Unexpected Error</p>
        <h2 className="mt-2 text-2xl font-semibold tracking-tight">Something went wrong</h2>
        <p className="mt-3 text-sm leading-6 text-slate-300">
          {error instanceof Error ? error.message : 'An unexpected runtime error occurred.'}
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <button
            className="inline-flex items-center rounded-lg bg-rose-400 px-4 py-2 text-sm font-medium text-slate-950 transition hover:bg-rose-300"
            onClick={resetErrorBoundary}
            type="button"
          >
            Retry
          </button>
          <button
            className="inline-flex items-center rounded-lg border border-white/20 bg-white/5 px-4 py-2 text-sm font-medium text-slate-100 transition hover:bg-white/10"
            onClick={() => window.location.assign(window.location.origin)}
            type="button"
          >
            Go Home
          </button>
        </div>
      </div>
    </div>
  );
};
