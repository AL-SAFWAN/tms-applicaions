import React, { FormEvent, useEffect } from "react";

import { Input } from "@/components/ui/input";
import { Label, LabelInputGridContainer } from "@/components/ui/label";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { userUserUpdateMutation } from "@/hooks/user";
import { useForm } from "react-hook-form";
import { UserUpdateInputs, UserUpdateSchema } from "@/schemas/userSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { User } from "@/schemas/authSchema";
import { ErrorAlert } from "@/components/ui/alert";
import { DateInput } from "@/components/ui/date-btn";

const EditForm = ({ user }: { user: User }) => {
  const {
    mutate,
    isError,
    error,
    isPending,
    isSuccess,
    data: newData,
    reset: resetCall,
  } = userUserUpdateMutation();

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    control,
    reset,
  } = useForm<UserUpdateInputs>({
    resolver: zodResolver(UserUpdateSchema),
    defaultValues: user,
  });

  function onReset(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    reset();
    resetCall();
  }

  function onSubmit(data: UserUpdateInputs) {
    console.log(data);
    mutate(data);
  }

  useEffect(() => {
    if (isSuccess) {
      reset(newData);
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
            First Name
          </Label>
          <Input
            divClassName="col-span-3"
            id="firstName"
            type="text"
            disabled={isPending}
            {...register("firstName")}
            error={errors.firstName}
          />
        </LabelInputGridContainer>
        <LabelInputGridContainer>
          <Label htmlFor="name" className="text-right">
            Last Name
          </Label>
          <Input
            divClassName="col-span-3"
            id="lastName"
            type="text"
            disabled={isPending}
            {...register("lastName")}
            error={errors.lastName}
          />
        </LabelInputGridContainer>
        <LabelInputGridContainer>
          <Label htmlFor="name" className="text-right">
            Birth Date
          </Label>
          <DateInput control={control} error={errors.dateOfBirth} />
        </LabelInputGridContainer>
        <LabelInputGridContainer>
          <Label htmlFor="email" className="text-right">
            Email
          </Label>
          <Input
            divClassName="col-span-3"
            id="email"
            placeholder="name@example.com"
            type="email"
            autoCapitalize="none"
            autoComplete="email"
            autoCorrect="off"
            disabled={isPending}
            {...register("email")}
            error={errors.email}
          />
        </LabelInputGridContainer>

        <LabelInputGridContainer>
          <Label htmlFor="weight" className="text-right">
            Weight (kg)
          </Label>
          <Input
            min={0}
            id="weight"
            type="number"
            {...register("weight")}
            error={errors.weight}
            divClassName="col-span-3"
          />
        </LabelInputGridContainer>
        <LabelInputGridContainer>
          <Label htmlFor="height" className="text-right">
            Height (cm)
          </Label>
          <Input
            min={0}
            id="height"
            type="number"
            {...register("height")}
            error={errors.height}
            divClassName="col-span-3"
          />
        </LabelInputGridContainer>
        <LabelInputGridContainer>
          <Label htmlFor="address" className="text-right">
            Address
          </Label>
          <Textarea
            id="address"
            className="col-span-3"
            {...register("address")}
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
EditForm.displayName = "EditForm";
export default EditForm;
