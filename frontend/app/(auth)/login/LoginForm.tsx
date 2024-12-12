"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderPinwheel } from "lucide-react";
import { cn } from "@/lib/utils";
import { Label, LabelInputContainer } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { ErrorAlert } from "@/components/ui/alert";
import { LoginFormInputs, loginSchema } from "@/schemas/authSchema";
import { useLoginMutation } from "@/hooks/auth";
import { BottomGradient } from "@/components/ui/button";
import { TogglePassword } from "@/components/ui/password";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function LoginForm({ className, ...props }: UserAuthFormProps) {
  const { mutate, isError, error, isPending, isSuccess } = useLoginMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema),
  });

  function onSubmit(data: LoginFormInputs) {
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
          />
        </LabelInputContainer>
        <LabelInputContainer>
          <Label htmlFor="password">Password</Label>
          <TogglePassword
            id="password"
            disabled={isPending || isSuccess}
            register={register("password")}
            errors={errors.password}
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
          Login &rarr;
          {!isPending && <BottomGradient />}
        </button>
      </form>
    </div>
  );
}
