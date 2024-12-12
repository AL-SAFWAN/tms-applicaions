import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { AlertCircleIcon } from "lucide-react";

const alertVariants = cva(
  "relative w-full rounded-lg border border-zinc-200 p-4 [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-zinc-950 dark:border-zinc-800 dark:[&>svg]:text-zinc-50",
  {
    variants: {
      variant: {
        default: "bg-white text-zinc-950 dark:bg-zinc-950 dark:text-zinc-50",
        destructive:
          " !border-red-200 dark:!border-red-950  !text-destructive-foreground  !bg-destructive   [&>svg]:!text-destructive-foreground ",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);
// destructive:
//       "border-red-500/50 text-red-500 dark:border-red-500 [&>svg]:text-red-500 dark:border-red-900/50 dark:text-red-900 dark:dark:border-red-900 dark:[&>svg]:text-red-900",
const Alert = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof alertVariants>
>(({ className, variant, ...props }, ref) => (
  <div
    ref={ref}
    role="alert"
    className={cn(alertVariants({ variant }), className)}
    {...props}
  />
));
Alert.displayName = "Alert";

const AlertWithClose = ({ children }: React.HTMLAttributes<HTMLDivElement>) => {
  const [visible, setVisible] = React.useState(true);

  if (!visible) return null;
  return (
    <div className="relative">
      {children}
      <button
        onClick={() => setVisible(false)}
        aria-label="Close"
        className="absolute right-4 top-[16px] text-destructive-foreground hover:text-destructive-foreground/80"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>
  );
};
AlertWithClose.displayName = "AlertWithClose";

const AlertTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h5
    ref={ref}
    className={cn("mb-1 font-semibold leading-none tracking-tight", className)}
    {...props}
  />
));
AlertTitle.displayName = "AlertTitle";

const AlertDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-sm [&_p]:leading-relaxed", className)}
    {...props}
  />
));
AlertDescription.displayName = "AlertDescription";

const ErrorAlert = ({
  error,
  isError,
  className = "rounded-sm py-3 ",
}: {
  error: Error | null;
  isError: boolean;
  className?: string;
}) =>
  isError && (
    <AlertWithClose>
      <Alert variant="destructive" className={className}>
        <AlertCircleIcon className="mt-1 size-6" />
        <div>
          <AlertTitle className="mt-1 px-3">Error</AlertTitle>
          <AlertDescription className="px-3 pr-5">
            {error?.message}
          </AlertDescription>
        </div>
      </Alert>
    </AlertWithClose>
  );
ErrorAlert.displayName = "ErrorAlert";

export { Alert, AlertTitle, AlertDescription, AlertWithClose, ErrorAlert };
