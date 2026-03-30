import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Link, Navigate, useNavigate, useSearchParams } from 'react-router';
import { Loader2 } from 'lucide-react';

import { type LoginInput, loginInputSchema, useLogin, useUser } from '@/lib/auth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';

const getFieldMessage = (message: unknown) =>
  typeof message === 'string' ? message : 'Please check this field.';

const LoginRoute = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const login = useLogin();
  const user = useUser();

  const redirectTo = searchParams.get('redirectTo') ?? '/app';
  const initialMobile = searchParams.get('mobile') ?? '';

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginInputSchema),
    defaultValues: { mobile: initialMobile, password: '' },
  });

  const onSubmit = handleSubmit(async (values) => {
    await login.mutateAsync(values);
    navigate(redirectTo, { replace: true });
  });

  if (user.data) {
    return <Navigate to="/app" replace />;
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/40 px-4 py-12">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="space-y-1">
          <CardTitle>Welcome back</CardTitle>
          <CardDescription>Sign in with your mobile and password.</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={onSubmit}>
            <div className="space-y-2">
              <Label htmlFor="mobile">Mobile</Label>
              <Input
                id="mobile"
                placeholder="e.g. 13800138000"
                {...register('mobile')}
              />
              {errors.mobile && (
                <p className="text-[0.8rem] font-medium text-destructive">{getFieldMessage(errors.mobile.message)}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="at least 5 characters"
                {...register('password')}
              />
              {errors.password && (
                <p className="text-[0.8rem] font-medium text-destructive">{getFieldMessage(errors.password.message)}</p>
              )}
            </div>

            {login.error ? (
              <Alert variant="destructive">
                <AlertDescription>
                  {login.error instanceof Error ? login.error.message : 'Login failed.'}
                </AlertDescription>
              </Alert>
            ) : null}

            <Button className="w-full" disabled={login.isPending} type="submit">
              {login.isPending && <Loader2 className="animate-spin" />}
              {login.isPending ? 'Signing in...' : 'Sign in'}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-wrap items-center justify-center gap-2 text-sm text-muted-foreground">
          No account?{' '}
          <Link className="font-semibold text-primary hover:underline" to="/auth/register">
            Create one
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
};

export default LoginRoute;
