"use client";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Label, LabelInputContainer } from "@/components/ui/label";
import { awardEnum, beltEnum, roleEnum, User } from "@/schemas/authSchema";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Controller, useForm } from "react-hook-form";
import { createUserInputs, createUserSchema } from "@/schemas/userSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@/lib/utils";
import { FormEvent, useEffect } from "react";
import { useCreateUserMutation, useUpdateUsersMutation } from "@/hooks/users";
import { ErrorAlert } from "@/components/ui/alert";
import { DateInput } from "@/components/ui/date-btn";

type FormFields = keyof createUserInputs;
const tabFields: Record<string, FormFields[]> = {
  personal: ["firstName", "lastName", "email", "address"],
  academy: ["role", "beltLevel", "awardLevel", "weight", "height"],
  emergency: [
    "emergencyContactName",
    "emergencyContactRelationship",
    "emergencyContactPhone",
  ],
  medical: ["allergies", "medications", "medicalConditions"],
};

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
          address: "",
          email: "",
          height: "",
          weight: undefined,
          emergencyContactName: "",
          emergencyContactPhone: "",
          emergencyContactRelationship: "",
          allergies: "None",
          medicalConditions: "None",
          medications: "None",
          beltLevel: beltEnum.White,
          awardLevel: awardEnum.None,
          role: roleEnum.student,
          isActive: true,
        },
  });

  const tabHasErrors = (fields: FormFields[]) => {
    return fields.some((field) => errors[field]);
  };

  const tabErrorStates = {
    personal: tabHasErrors(tabFields.personal),
    academy: tabHasErrors(tabFields.academy),
    emergency: tabHasErrors(tabFields.emergency),
    medical: tabHasErrors(tabFields.medical),
  };

  const onSubmit = (data: createUserInputs) => {
    console.log(data);
    // onSubmit(formData);
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
      <Tabs defaultValue="personal">
        <TabsList className="my-2 space-x-[4px]">
          <TabsTrigger
            value="personal"
            className={cn("z-50", {
              "font-semibold !text-red-500": tabErrorStates.personal,
            })}
          >
            Personal
          </TabsTrigger>
          <TabsTrigger
            value="academy"
            className={cn("z-50", {
              "font-semibold !text-red-500": tabErrorStates.academy,
            })}
          >
            Academy
          </TabsTrigger>
          <TabsTrigger
            value="emergency"
            className={cn("z-50", {
              "font-semibold !text-red-500": tabErrorStates.emergency,
            })}
          >
            Emergency
          </TabsTrigger>
          <TabsTrigger
            value="medical"
            className={cn("z-50", {
              "font-semibold !text-red-500": tabErrorStates.medical,
            })}
          >
            Medical
          </TabsTrigger>
        </TabsList>
        <div className="flex flex-col pt-4">
          <TabsContent value="personal" className="space-y-4">
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
            <LabelInputContainer>
              <Label htmlFor="name">Birth Date</Label>
              <DateInput control={control} error={errors.dateOfBirth!} />
            </LabelInputContainer>
            <LabelInputContainer>
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                {...register("address")}
                error={errors.address}
              />
            </LabelInputContainer>
          </TabsContent>
          <TabsContent value="academy" className="space-y-4">
            <LabelInputContainer>
              <Label htmlFor="role">Role</Label>
              <Controller
                control={control}
                name="role"
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger error={errors.role}>
                      <SelectValue placeholder="Select a role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value={roleEnum.student}>Student</SelectItem>
                      <SelectItem value={roleEnum.instructor}>
                        Instructor
                      </SelectItem>
                      <SelectItem value={roleEnum.admin}>Admin</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
            </LabelInputContainer>
            <LabelInputContainer>
              <Label htmlFor="beltLevel">Belt Level</Label>

              <Controller
                control={control}
                name="beltLevel"
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger error={errors.role}>
                      <SelectValue placeholder="Select a Belt" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.values(beltEnum).map((belt) => (
                        <SelectItem key={belt} value={belt}>
                          {belt}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
            </LabelInputContainer>
            <LabelInputContainer>
              <Label htmlFor="awardLevel">Award Level</Label>
              <Controller
                control={control}
                name="awardLevel"
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger error={errors.role}>
                      <SelectValue placeholder="Select a Award" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.values(awardEnum).map((award) => (
                        <SelectItem key={award} value={award}>
                          {award}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
            </LabelInputContainer>
            <div className="grid grid-cols-2 gap-4">
              <LabelInputContainer>
                <Label htmlFor="weight">Weight (kg)</Label>
                <Input
                  id="weight"
                  type="number"
                  {...register("weight")}
                  error={errors.weight}
                />
              </LabelInputContainer>
              <LabelInputContainer>
                <Label htmlFor="height">Height</Label>
                <Input
                  type="number"
                  id="height"
                  {...register("height")}
                  error={errors.height}
                />
              </LabelInputContainer>
            </div>
          </TabsContent>
          <TabsContent value="emergency" className="space-y-4">
            <LabelInputContainer>
              <Label htmlFor="emergencyContactName">
                Emergency Contact Name
              </Label>
              <Input
                id="emergencyContactName"
                {...register("emergencyContactName")}
                error={errors.emergencyContactName}
              />
            </LabelInputContainer>
            <LabelInputContainer>
              <Label htmlFor="emergencyContactRelationship">
                Emergency Contact Relationship
              </Label>
              <Input
                id="emergencyContactRelationship"
                {...register("emergencyContactRelationship")}
                error={errors.emergencyContactRelationship}
              />
            </LabelInputContainer>
            <LabelInputContainer>
              <Label htmlFor="emergencyContactPhone">
                Emergency Contact Phone
              </Label>
              <Input
                id="emergencyContactPhone"
                {...register("emergencyContactPhone")}
                error={errors.emergencyContactPhone}
              />
            </LabelInputContainer>
          </TabsContent>
          <TabsContent value="medical" className="space-y-4">
            <LabelInputContainer>
              <Label htmlFor="allergies">Allergies</Label>
              <Input
                id="allergies"
                {...register("allergies")}
                error={errors.allergies}
              />
            </LabelInputContainer>
            <LabelInputContainer>
              <Label htmlFor="medications">Medications</Label>
              <Input
                id="medications"
                {...register("medications")}
                error={errors.medications}
              />
            </LabelInputContainer>
            <LabelInputContainer>
              <Label htmlFor="medicalConditions">Medical Conditions</Label>
              <Input
                id="medicalConditions"
                {...register("medicalConditions")}
                error={errors.medicalConditions}
              />
            </LabelInputContainer>
          </TabsContent>

          <div className="flex w-full space-x-4 pt-8 md:w-fit md:items-center md:self-end">
            <Button
              type="reset"
              variant={"secondary"}
              disabled={!isDirty}
              className="w-full md:w-fit"
            >
              Reset
            </Button>
            <Button
              type="submit"
              disabled={!isDirty}
              className="w-full md:w-fit"
            >
              {user ? "Update User" : "Create User"}
            </Button>
          </div>
        </div>
      </Tabs>
    </form>
  );
}
