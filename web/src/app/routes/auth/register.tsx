import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router';
import { z } from 'zod';

import { registerInputSchema, useRegister, useUser } from '@/util/auth';

const getFieldMessage = (message: unknown) =>
  typeof message === 'string' ? message : 'Please check this field.';

const registerFormSchema = registerInputSchema
  .extend({
    confirmPassword: z.string().min(5, 'Password should be at least 5 chars'),
  })
  .refine((values) => values.password === values.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

type RegisterFormValues = z.infer<typeof registerFormSchema>;

const RegisterRoute = () => {
  const registerMutation = useRegister();
  const navigate = useNavigate();
  const user = useUser();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      mobile: '',
      password: '',
      confirmPassword: '',
      nickName: '',
    },
  });

  const onSubmit = handleSubmit(async (values) => {
    await registerMutation.mutateAsync({
      mobile: values.mobile,
      password: values.password,
      nickName: values.nickName,
    });
    navigate(`/auth/login?mobile=${encodeURIComponent(values.mobile)}`, { replace: true });
  });

  if (user.data) {
    navigate('/app', { replace: true });
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-snow to-secondary/40 px-4 py-12">
      <div className="mx-auto w-full max-w-md rounded-2xl border border-border bg-card p-8 shadow-xl">
        <h1 className="text-2xl font-semibold text-foreground">Create account</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Register with your mobile and password.
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
            <span className="mb-2 block text-sm font-medium text-foreground">Nickname (optional)</span>
            <input
              className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/30"
              placeholder="your nickname"
              {...register('nickName')}
            />
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

          <label className="block">
            <span className="mb-2 block text-sm font-medium text-foreground">Confirm password</span>
            <input
              className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/30"
              type="password"
              placeholder="repeat password"
              {...register('confirmPassword')}
            />
            {errors.confirmPassword && (
              <p className="mt-1 text-xs text-destructive">
                {getFieldMessage(errors.confirmPassword.message)}
              </p>
            )}
          </label>

          {registerMutation.error ? (
            <div className="rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">
              {registerMutation.error instanceof Error
                ? registerMutation.error.message
                : 'Register failed.'}
            </div>
          ) : null}

          <button
            className="w-full rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
            disabled={registerMutation.isPending}
            type="submit"
          >
            {registerMutation.isPending ? 'Creating account...' : 'Create account'}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          Already have an account?{' '}
          <Link
            className="font-semibold text-primary underline-offset-2 hover:underline"
            to="/auth/login"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterRoute;
