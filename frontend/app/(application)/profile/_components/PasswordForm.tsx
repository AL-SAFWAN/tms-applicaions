import React, { FormEvent, useEffect } from "react";

import { Input } from "@/components/ui/input";
import { Label, LabelInputGridContainer } from "@/components/ui/label";

import { Button } from "@/components/ui/button";
import { useUserUpdatePasswordMutation } from "@/hooks/user";
import { useForm } from "react-hook-form";
import {
  PasswordUpdateInputs,
  PasswordUpdateSchema,
} from "@/schemas/userSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { ErrorAlert } from "@/components/ui/alert";
import { TogglePassword } from "@/components/ui/password";

const PasswordForm = ({ closeOverlay }: { closeOverlay: () => void }) => {
  const {
    mutate,
    isError,
    error,
    isPending,
    isSuccess,
    reset: resetCall,
  } = useUserUpdatePasswordMutation();
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    reset,
  } = useForm<PasswordUpdateInputs>({
    resolver: zodResolver(PasswordUpdateSchema),
    defaultValues: {
      newPassword: "",
      currentPassword: "",
      confirmPassword: "",
    },
  });

  function onReset(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    reset();
    resetCall();
  }

  function onSubmit(data: PasswordUpdateInputs) {
    mutate(data);
  }

  useEffect(() => {
    if (isSuccess) {
      closeOverlay();
    }
  }, [isSuccess]);

  return (
    <>
      <ErrorAlert isError={isError} error={error} className={"-mb-4 mt-4"} />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid gap-4 pt-4"
        onReset={onReset}
      >
        <LabelInputGridContainer>
          <Label htmlFor="name" className="text-right">
            Current Password
          </Label>
          <TogglePassword
            divClassName="col-span-3"
            id="currentPassword"
            // type="password"
            disabled={isPending}
            register={register("currentPassword")}
            errors={errors.currentPassword}
          />
        </LabelInputGridContainer>
        <LabelInputGridContainer>
          <Label htmlFor="name" className="text-right">
            New Password
          </Label>
          <TogglePassword
            divClassName="col-span-3"
            id="password"
            disabled={isPending}
            register={register("newPassword")}
            errors={errors.newPassword}
          />
        </LabelInputGridContainer>

        <LabelInputGridContainer>
          <Label htmlFor="name" className="text-right">
            Confirm Password
          </Label>

          <TogglePassword
            id="confirmPassword"
            divClassName="col-span-3"
            register={register("confirmPassword")}
            disabled={isPending}
            errors={errors.confirmPassword}
          />
        </LabelInputGridContainer>

        <div className="flex w-full justify-between space-x-4 pt-4">
          <Button
            type="reset"
            disabled={isPending || !isDirty}
            className="w-full"
            variant={"secondary"}
          >
            Reset
          </Button>
          <Button
            type="submit"
            disabled={isPending || !isDirty}
            className="w-full"
          >
            Save changes
          </Button>
        </div>
      </form>
    </>
  );
};
PasswordForm.displayName = "EditForm";
export default PasswordForm;
