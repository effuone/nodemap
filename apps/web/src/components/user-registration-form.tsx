import * as React from 'react';

import { cn } from '@/lib/utils';
import { Icons } from '@/components/icons';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Button } from './ui/button';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';

import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useAuth } from '@/lib/hooks/useAuth';
import useAlertMessage from '@/lib/hooks/useAlertMessage';
import AlertMessage from './alert-message';
import { AlertType } from './ui/alert';

const formSchema = z.object({
  firstName: z.string().min(2).max(50),
  lastName: z.string().min(2).max(50),
  email: z.string().min(2).max(50),
  password: z.string().min(8).max(50),
});

interface UserRegistrationFormProps
  extends React.HTMLAttributes<HTMLDivElement> {}

export default function UserRegistrationForm({
  className,
  ...props
}: UserRegistrationFormProps) {
  const { showAlertMessage, hideAlertMessage, alertState } = useAlertMessage();

  const auth = useAuth();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await auth.register({
        email: values.email,
        password: values.password,
      });
    } catch (e: any) {
      if (e.response.status === 400)
        showAlertMessage(
          'Error during registration',
          e.response.data.message,
          AlertType.ERROR,
          2500
        );
    }
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
    }, 2500);
  }

  return (
    <div className={cn('grid gap-6', className)} {...props}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <Label className="sr-only" htmlFor="email">
                  Почта
                </Label>
                <FormControl>
                  <Input
                    id="email"
                    placeholder="Enter your email"
                    type="email"
                    autoCapitalize="none"
                    autoComplete="email"
                    autoCorrect="off"
                    disabled={isLoading}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <Label className="sr-only" htmlFor="password">
                  Почта
                </Label>
                <FormControl>
                  <Input
                    id="password"
                    placeholder="Enter your password"
                    type="password"
                    autoCapitalize="none"
                    autoComplete="password"
                    autoCorrect="off"
                    disabled={isLoading}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid gap-2">
            <div className="grid gap-1"></div>
            <Button disabled={isLoading} variant="default">
              {isLoading && (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              )}
              Register
            </Button>
          </div>
        </form>
      </Form>
      {alertState && (
        <AlertMessage
          message={alertState.message}
          alertTitle={alertState.title}
          alertType={alertState.type}
          duration={alertState.duration}
          onClose={hideAlertMessage}
          className="lg:left-3/4 top-36"
        />
      )}

      {/* <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="dark:bg-background bg-white px-2 text-muted-foreground">
            или продолжить с
          </span>
        </div>
      </div>
      <Button variant="outline" type="button" disabled={isLoading}>
        {isLoading ? (
          <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Icons.gitHub className="mr-2 h-4 w-4" />
        )}{' '}
        GitHub
      </Button> */}
    </div>
  );
}
