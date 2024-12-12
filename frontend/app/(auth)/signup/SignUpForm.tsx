"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { LoaderPinwheel } from "lucide-react";
import { Label, LabelInputContainer } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignUpFormInputs, signUpSchema } from "@/schemas/authSchema";
import { useSignUpMutation } from "@/hooks/auth";
import { ErrorAlert } from "@/components/ui/alert";
import { BottomGradient } from "@/components/ui/button";
import Password, { TogglePassword } from "@/components/ui/password";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function SignUpForm({ className, ...props }: UserAuthFormProps) {
  const { mutate, isError, error, isPending, isSuccess } = useSignUpMutation();
  const isLoading = isPending || isSuccess;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormInputs>({
    resolver: zodResolver(signUpSchema),
  });
  function onSubmit(data: SignUpFormInputs) {
    mutate(data);
  }
  return (
    <>
      <div className={cn("", className)} {...props}>
        <form className="grid gap-6" onSubmit={handleSubmit(onSubmit)}>
          <ErrorAlert isError={isError} error={error} />
          <div className="flex flex-col space-y-6 md:flex-row md:space-x-3 md:space-y-0">
            <LabelInputContainer>
              <Label htmlFor="firstName">First name</Label>
              <Input
                id="firstName"
                placeholder="Tyler"
                type="text"
                disabled={isLoading}
                {...register("firstName")}
                error={errors.firstName}
              />
            </LabelInputContainer>
            <LabelInputContainer>
              <Label htmlFor="lastName">Last name</Label>
              <Input
                id="lastName"
                placeholder="Durden"
                type="text"
                disabled={isLoading}
                {...register("lastName")}
                error={errors.lastName}
              />
            </LabelInputContainer>
          </div>
          <LabelInputContainer>
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              placeholder="name@example.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading}
              {...register("email")}
              error={errors.email}
            />
          </LabelInputContainer>
          <LabelInputContainer>
            <Label htmlFor="password">Password</Label>
            <Password
              register={register}
              errors={errors.password}
              disabled={isLoading}
            />
          </LabelInputContainer>
          <LabelInputContainer>
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <TogglePassword
              id="confirmPassword"
              disabled={isLoading}
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
            {isLoading && (
              <LoaderPinwheel className="mr-2 h-4 w-4 animate-spin" />
            )}
            sign up &rarr;
            {!isLoading && <BottomGradient />}
          </button>
        </form>
      </div>
    </>
  );
}
