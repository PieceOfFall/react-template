import { useNavigate } from 'react-router';
import { LogOut } from 'lucide-react';

import { useLogout, useUser } from '@/lib/auth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

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
    <div className="bg-muted/40 min-h-screen px-4 py-10">
      <div className="mx-auto w-full max-w-4xl space-y-6">
        <Card>
          <CardHeader>
            <CardDescription className="text-xs font-semibold tracking-widest uppercase">
              Home
            </CardDescription>
            <CardTitle className="text-3xl font-bold tracking-tight">
              {profile?.nickName ? `Hi, ${profile.nickName}` : 'Hi there'}
            </CardTitle>
            <CardDescription>This is your default protected homepage.</CardDescription>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Account info</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 text-sm sm:grid-cols-2">
              <div className="bg-card rounded-lg border p-4 shadow-sm">
                <p className="text-muted-foreground text-xs font-medium tracking-wide uppercase">
                  Mobile
                </p>
                <p className="text-foreground mt-1 font-medium">{profile?.mobile ?? '-'}</p>
              </div>
              <div className="bg-card rounded-lg border p-4 shadow-sm">
                <p className="text-muted-foreground text-xs font-medium tracking-wide uppercase">
                  Nickname
                </p>
                <p className="text-foreground mt-1 font-medium">{profile?.nickName ?? '-'}</p>
              </div>
              <div className="bg-card rounded-lg border p-4 shadow-sm">
                <p className="text-muted-foreground text-xs font-medium tracking-wide uppercase">
                  User ID
                </p>
                <p className="text-foreground mt-1 font-medium">{profile?.id ?? '-'}</p>
              </div>
              <div className="bg-card rounded-lg border p-4 shadow-sm">
                <p className="text-muted-foreground text-xs font-medium tracking-wide uppercase">
                  Level
                </p>
                <p className="text-foreground mt-1 font-medium">{profile?.userLevelName ?? '-'}</p>
              </div>
            </div>

            <Button
              className="mt-6"
              disabled={logout.isPending}
              onClick={handleLogout}
              type="button"
            >
              <LogOut className="mr-2 h-4 w-4" />
              {logout.isPending ? 'Signing out...' : 'Sign out'}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default HomeRoute;
