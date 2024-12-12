"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderPinwheel } from "lucide-react";
import { cn } from "@/lib/utils";
import { Label, LabelInputContainer } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { ErrorAlert } from "@/components/ui/alert";
import { EmailFormInputs, emailSchema } from "@/schemas/authSchema";
import { useRecoverPasswordMutation } from "@/hooks/auth";
import { BottomGradient } from "@/components/ui/button";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function ResetForm({ className, ...props }: UserAuthFormProps) {
  const { mutate, isError, error, isPending, isSuccess } =
    useRecoverPasswordMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EmailFormInputs>({
    resolver: zodResolver(emailSchema),
  });

  function onSubmit(data: EmailFormInputs) {
    mutate(data);
  }
  return (
    <div className={cn("", className)} {...props}>
      <form className="grid gap-6" onSubmit={handleSubmit(onSubmit)}>
        <ErrorAlert isError={isError} error={error} />
        <LabelInputContainer>
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            placeholder="name@example.com"
            type="email"
            autoCapitalize="none"
            autoComplete="email"
            autoCorrect="off"
            disabled={isPending || isSuccess}
            {...register("email")}
            error={errors.email}
            // className="bg-green-500/90 border-green-500"
          />
        </LabelInputContainer>

        <button
          disabled={isPending || isSuccess}
          className={cn(
            "group/btn relative flex h-10 w-full items-center justify-center rounded-md bg-gradient-to-br from-neutral-300 to-neutral-300 font-medium text-neutral-900 shadow-[0px_1px_0px_0px_#ffffff_inset,0px_-1px_0px_0px_#ffffff_inset] dark:bg-zinc-800 dark:from-zinc-900 dark:to-zinc-900 dark:text-white dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]",
            { "opacity-60": isPending },
          )}
          type="submit"
        >
          {(isPending || isSuccess) && (
            <LoaderPinwheel className="mr-2 h-4 w-4 animate-spin" />
          )}
          Send Email &rarr;
          {!isPending && <BottomGradient />}
        </button>
      </form>
    </div>
  );
}
