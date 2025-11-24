'use client';

import { AppId, appName } from '@hike/sdk';
import { useLogin } from '@hike/sdk-next';
import { SessionContext } from '@hike/ui';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { useRouter, useSearchParams } from 'next/navigation';
import { use } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required')
});

type LoginFormData = z.infer<typeof loginSchema>;

interface LoginParams {
  company?: {
    id: string;
    name: string;
    slug: string;
  };
  registerPath?: string;
  enableSocial?: boolean;
  appId?: AppId;
}

export const Login = ({ company, appId = '@hike/admin-web' }: LoginParams) => {
  const { update } = use(SessionContext);
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get('redirect');
  const slug = company?.slug ?? '';
  const slugPath = slug ? `/${slug}` : '';
  const tShared = useTranslations('shared');
  const t = useTranslations('shared.login.page');

  const { handleSubmit: handleLoginSubmit, isPending } = useLogin({
    appId,
    onSuccess: async () => {
      await update();
      router.replace(redirectUrl || `${slugPath}/`);
    },
    onError: (error, statusCode) => {
      if (statusCode === 429) {
        // Handle rate limiting
        return;
      }
      // Handle other errors
    }
  });

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema)
  });

  const onSubmit = (data: LoginFormData) => {
    handleLoginSubmit(data);
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>{t('title', { companyName: company?.name || appName(appId) })}</CardTitle>
          <CardDescription>Enter your credentials to sign in</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">{tShared('fields.email')}</Label>
              <Input
                id="email"
                type="email"
                placeholder={tShared('fields.emailPlaceholder')}
                autoComplete="email"
                autoCapitalize="none"
                autoCorrect="off"
                {...register('email')}
              />
              {errors.email && <p className="text-sm text-destructive">{errors.email.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">{tShared('fields.password')}</Label>
              <Input
                id="password"
                type="password"
                placeholder={tShared('fields.passwordPlaceholder')}
                autoComplete="current-password"
                {...register('password')}
              />
              {errors.password && <p className="text-sm text-destructive">{errors.password.message}</p>}
            </div>

            <Button type="submit" className="w-full" loading={isPending}>
              {tShared('action.login')}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
