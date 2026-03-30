import type { ReactNode } from 'react';

import { cn } from '@/util/tailwind-util';

export const AuthShell = ({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: ReactNode;
}) => {
  return (
    <div className="relative min-h-screen overflow-hidden bg-background px-4 py-14 sm:px-6">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,hsl(var(--secondary))_0%,transparent_55%)] opacity-70" />
      <div className="pointer-events-none absolute right-0 top-16 h-72 w-72 -translate-x-8 rounded-full bg-primary/20 blur-3xl" />

      <div className="relative mx-auto w-full max-w-md">
        <div
          className={cn(
            'mb-6 rounded-xl border border-border bg-card/70 px-4 py-3 text-xs uppercase tracking-[0.18em] text-muted-foreground backdrop-blur',
          )}
        >
          Secure Access Portal
        </div>

        <div className="mb-6">
          <h1 className="text-3xl font-bold tracking-tight text-foreground">{title}</h1>
          <p className="mt-2 text-sm text-muted-foreground">{description}</p>
        </div>

        {children}
      </div>
    </div>
  );
};
