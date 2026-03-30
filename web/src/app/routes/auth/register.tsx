import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Link, Navigate, useNavigate } from 'react-router';
import { z } from 'zod';
import { Loader2 } from 'lucide-react';

import { registerInputSchema, useRegister, useUser } from '@/lib/auth';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';

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
    return <Navigate to="/app" replace />;
  }

  return (
    <div className="bg-muted/40 flex min-h-screen items-center justify-center px-4 py-12">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="space-y-1">
          <CardTitle>Create account</CardTitle>
          <CardDescription>Register with your mobile and password.</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={onSubmit}>
            <div className="space-y-2">
              <Label htmlFor="mobile">Mobile</Label>
              <Input id="mobile" placeholder="your phone number" {...register('mobile')} />
              {errors.mobile && (
                <p className="text-destructive text-[0.8rem] font-medium">
                  {getFieldMessage(errors.mobile.message)}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="nickName">Nickname (optional)</Label>
              <Input id="nickName" placeholder="your nickname" {...register('nickName')} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="your password"
                {...register('password')}
              />
              {errors.password && (
                <p className="text-destructive text-[0.8rem] font-medium">
                  {getFieldMessage(errors.password.message)}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm password</Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="repeat password"
                {...register('confirmPassword')}
              />
              {errors.confirmPassword && (
                <p className="text-destructive text-[0.8rem] font-medium">
                  {getFieldMessage(errors.confirmPassword.message)}
                </p>
              )}
            </div>

            {registerMutation.error ? (
              <Alert variant="destructive">
                <AlertDescription>
                  {registerMutation.error instanceof Error
                    ? registerMutation.error.message
                    : 'Register failed.'}
                </AlertDescription>
              </Alert>
            ) : null}

            <Button className="w-full" disabled={registerMutation.isPending} type="submit">
              {registerMutation.isPending && <Loader2 className="animate-spin" />}
              {registerMutation.isPending ? 'Creating account...' : 'Create account'}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="text-muted-foreground flex flex-wrap items-center justify-center gap-2 text-sm">
          Already have an account?{' '}
          <Link className="text-primary font-semibold hover:underline" to="/auth/login">
            Sign in
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
};

export default RegisterRoute;
