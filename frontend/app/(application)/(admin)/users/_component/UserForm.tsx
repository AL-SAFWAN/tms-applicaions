"use client";
import { Input } from "@/components/ui/input";

import { Label, LabelInputContainer } from "@/components/ui/label";
import { roleEnum, User } from "@/schemas/authSchema";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { createUserInputs, createUserSchema } from "@/schemas/userSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormEvent, useEffect } from "react";
import { useCreateUserMutation, useUpdateUsersMutation } from "@/hooks/users";
import { ErrorAlert } from "@/components/ui/alert";

export function UserForm({
  user,
  setOpen,
}: {
  user: User | null;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const updateUser = useUpdateUsersMutation();
  const createUser = useCreateUserMutation();
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    reset,
    control,
  } = useForm<createUserInputs>({
    resolver: zodResolver(createUserSchema),
    defaultValues: user
      ? user
      : {
          firstName: "",
          lastName: "",
          password: undefined,
          email: "",
          role: roleEnum.requester,
          isActive: true,
        },
  });

  const onSubmit = (data: createUserInputs) => {
    if (user) {
      updateUser.mutate({ id: user.id, data });
    } else {
      createUser.mutate(data);
    }
  };

  function onReset(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    reset();
    if (user) {
      updateUser.reset();
    } else {
      createUser.reset();
    }
  }
  useEffect(() => {
    if (updateUser.isSuccess) {
      reset(updateUser.data);
    }
  }, [updateUser.isSuccess]);

  useEffect(() => {
    if (createUser.isSuccess) {
      setOpen(false);
    }
  }, [createUser.isSuccess]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} onReset={onReset}>
      <ErrorAlert
        isError={updateUser.isError || createUser.isError}
        error={updateUser.error || createUser.error}
        className={"mb-4 mt-4"}
      />

      <div className="flex flex-col space-y-4 pt-4">
        <div className="grid grid-cols-2 gap-4">
          <LabelInputContainer>
            <Label htmlFor="firstName">First Name</Label>
            <Input
              id="firstName"
              type="text"
              {...register("firstName")}
              error={errors.firstName}
            />
          </LabelInputContainer>
          <LabelInputContainer>
            <Label htmlFor="lastName">Last Name</Label>
            <Input
              id="lastName"
              type="text"
              {...register("lastName")}
              error={errors.lastName}
            />
          </LabelInputContainer>
        </div>
        {!user && (
          <LabelInputContainer>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              {...register("password")}
              error={errors.password}
            />
          </LabelInputContainer>
        )}
        <LabelInputContainer>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            autoCapitalize="none"
            autoComplete="email"
            autoCorrect="off"
            {...register("email")}
            error={errors.email}
          />
        </LabelInputContainer>

        <div className="flex w-full space-x-4 pt-8 md:w-fit md:items-center md:self-end">
          <Button
            type="reset"
            variant={"secondary"}
            disabled={!isDirty}
            className="w-full md:w-fit"
          >
            Reset
          </Button>
          <Button type="submit" disabled={!isDirty} className="w-full md:w-fit">
            {user ? "Update User" : "Create User"}
          </Button>
        </div>
      </div>
    </form>
  );
}
