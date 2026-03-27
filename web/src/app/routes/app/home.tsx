import { useNavigate } from 'react-router';

import { useLogout, useUser } from '@/util/auth';

const HomeRoute = () => {
  const user = useUser();
  const logout = useLogout();
  const navigate = useNavigate();

  const profile = user.data?.user;

  const handleLogout = async () => {
    await logout.mutateAsync(undefined);
    navigate('/auth/login', { replace: true });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-snow to-secondary/40 px-4 py-10">
      <div className="mx-auto w-full max-w-4xl space-y-6">
        <header className="rounded-2xl border border-border bg-card p-6 shadow-md">
          <p className="text-sm text-muted-foreground">Home</p>
          <h1 className="mt-1 text-3xl font-bold text-foreground">
            {profile?.nickName ? `Hi, ${profile.nickName}` : 'Hi there'}
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            This is your default protected homepage.
          </p>
        </header>

        <section className="rounded-2xl border border-border bg-card p-6 shadow-md">
          <h2 className="text-lg font-semibold text-foreground">Account info</h2>
          <div className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
            <div className="rounded-lg bg-muted px-4 py-3">
              <p className="text-xs uppercase tracking-wide text-muted-foreground">Mobile</p>
              <p className="mt-1 font-medium text-foreground">{profile?.mobile ?? '-'}</p>
            </div>
            <div className="rounded-lg bg-muted px-4 py-3">
              <p className="text-xs uppercase tracking-wide text-muted-foreground">Nickname</p>
              <p className="mt-1 font-medium text-foreground">{profile?.nickName ?? '-'}</p>
            </div>
            <div className="rounded-lg bg-muted px-4 py-3">
              <p className="text-xs uppercase tracking-wide text-muted-foreground">User ID</p>
              <p className="mt-1 font-medium text-foreground">{profile?.id ?? '-'}</p>
            </div>
            <div className="rounded-lg bg-muted px-4 py-3">
              <p className="text-xs uppercase tracking-wide text-muted-foreground">Level</p>
              <p className="mt-1 font-medium text-foreground">{profile?.userLevelName ?? '-'}</p>
            </div>
          </div>

          <button
            className="mt-6 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
            disabled={logout.isPending}
            onClick={handleLogout}
            type="button"
          >
            {logout.isPending ? 'Signing out...' : 'Sign out'}
          </button>
        </section>
      </div>
    </div>
  );
};

export default HomeRoute;
