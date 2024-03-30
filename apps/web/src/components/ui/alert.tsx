import * as React from 'react';
import { cva } from 'class-variance-authority';

import { cn } from '@/lib/utils';

export enum AlertType {
  SUCCESS = 'success',
  INFO = 'info',
  ERROR = 'error',
  WARNING = 'warning',
}

const alertVariants = cva(
  [
    'relative w-full rounded-lg border p-4',
    '[&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px]',
    '[&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4',
  ],
  {
    variants: {
      variant: {
        [AlertType.SUCCESS]:
          'bg-white text-slate-900 border-slate-200 dark:bg-slate-900 dark:text-white dark:border-slate-700',
        [AlertType.ERROR]:
          'bg-red-50 text-red-700 border-red-500 dark:bg-red-800/20 dark:border-red-900 dark:text-red-500',
        [AlertType.INFO]:
          'bg-blue-50 text-blue-700 border-blue-400 dark:bg-blue-800/20 dark:border-blue-700 dark:text-blue-400',
        [AlertType.WARNING]:
          'bg-yellow-50 text-yellow-700 border-yellow-500 dark:bg-yellow-900/20 dark:border-yellow-900 dark:text-yellow-500',
      },
    },
    defaultVariants: {
      variant: AlertType.INFO,
    },
  }
);

interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  variant: AlertType;
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  ({ className, variant = AlertType.INFO, ...props }, ref) => (
    <div
      ref={ref}
      role="alert"
      className={cn(alertVariants({ variant }), className)}
      {...props}
    />
  )
);
Alert.displayName = 'Alert';

const AlertTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h5
    ref={ref}
    className={cn('mb-1 font-medium leading-none tracking-tight', className)}
    {...props}
  />
));
AlertTitle.displayName = 'AlertTitle';

const AlertDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('text-sm [&_p]:leading-relaxed', className)}
    {...props}
  />
));
AlertDescription.displayName = 'AlertDescription';

export { Alert, AlertTitle, AlertDescription };
