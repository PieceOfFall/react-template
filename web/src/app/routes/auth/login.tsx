import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Link, useNavigate, useSearchParams } from 'react-router';

import { type LoginInput, loginInputSchema, useLogin, useUser } from '@/util/auth';

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
    navigate('/app', { replace: true });
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-snow to-secondary/40 px-4 py-12">
      <div className="mx-auto w-full max-w-md rounded-2xl border border-border bg-card p-8 shadow-xl">
        <h1 className="text-2xl font-semibold text-foreground">Welcome back</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Sign in with your mobile and password.
        </p>

        <form className="mt-8 space-y-5" onSubmit={onSubmit}>
          <label className="block">
            <span className="mb-2 block text-sm font-medium text-foreground">Mobile</span>
            <input
              className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/30"
              placeholder="e.g. 13800138000"
              {...register('mobile')}
            />
            {errors.mobile && (
              <p className="mt-1 text-xs text-destructive">{getFieldMessage(errors.mobile.message)}</p>
            )}
          </label>

          <label className="block">
            <span className="mb-2 block text-sm font-medium text-foreground">Password</span>
            <input
              className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/30"
              type="password"
              placeholder="at least 5 characters"
              {...register('password')}
            />
            {errors.password && (
              <p className="mt-1 text-xs text-destructive">{getFieldMessage(errors.password.message)}</p>
            )}
          </label>

          {login.error ? (
            <div className="rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">
              {login.error instanceof Error ? login.error.message : 'Login failed.'}
            </div>
          ) : null}

          <button
            className="w-full rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
            disabled={login.isPending}
            type="submit"
          >
            {login.isPending ? 'Signing in...' : 'Sign in'}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          No account?{' '}
          <Link
            className="font-semibold text-primary underline-offset-2 hover:underline"
            to="/auth/register"
          >
            Create one
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginRoute;
