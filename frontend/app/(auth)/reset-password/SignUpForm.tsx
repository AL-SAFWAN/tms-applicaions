"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { LoaderPinwheel } from "lucide-react";
import { Label, LabelInputContainer } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ResetPasswordInputs, resetPasswordSchema } from "@/schemas/authSchema";
import { useResetPasswordMutation } from "@/hooks/auth";
import { ErrorAlert } from "@/components/ui/alert";
import { BottomGradient } from "@/components/ui/button";
import Password, { TogglePassword } from "@/components/ui/password";
import { useRouter } from "next/navigation";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function SignUpForm({ className, ...props }: UserAuthFormProps) {
  const router = useRouter();
  const [token, setToken] = React.useState<string | null>(null);
  const { mutate, isError, error, isPending } = useResetPasswordMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordInputs>({
    resolver: zodResolver(resetPasswordSchema),
  });
  function onSubmit(data: ResetPasswordInputs) {
    console.log(token);
    if (token) {
      mutate({ ...data, token });
    }
  }

  React.useEffect(() => {
    const tokenFromUrl = new URLSearchParams(window.location.search).get(
      "token",
    );
    if (!tokenFromUrl) {
      router.push("/");
    } else {
      setToken(tokenFromUrl);
    }
  }, [token, router]);

  return (
    <>
      <div className={cn("", className)} {...props}>
        <form className="grid gap-6" onSubmit={handleSubmit(onSubmit)}>
          <ErrorAlert isError={isError} error={error} />

          <LabelInputContainer>
            <Label htmlFor="password">New Password</Label>
            <Password
              register={register}
              errors={errors.password}
              disabled={isPending}
            />
          </LabelInputContainer>
          <LabelInputContainer>
            <Label htmlFor="confirmPassword">Confirm New Password</Label>
            <TogglePassword
              id="confirmPassword"
              disabled={isPending}
              register={register("confirmPassword")}
              errors={errors.confirmPassword}
            />
          </LabelInputContainer>
          <button
            className={cn(
              "group/btn relative flex h-10 w-full items-center justify-center rounded-md bg-gradient-to-br from-neutral-300 to-neutral-300 font-medium text-neutral-900 shadow-[0px_1px_0px_0px_#ffffff_inset,0px_-1px_0px_0px_#ffffff_inset] dark:bg-zinc-800 dark:from-zinc-900 dark:to-zinc-900 dark:text-white dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]",
            )}
            type="submit"
          >
            {isPending && (
              <LoaderPinwheel className="mr-2 h-4 w-4 animate-spin" />
            )}
            Reset &rarr;
            {!isPending && <BottomGradient />}
          </button>
        </form>
      </div>
    </>
  );
}
