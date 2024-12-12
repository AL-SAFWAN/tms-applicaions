import React, { FormEvent, useEffect } from "react";

import { Input } from "@/components/ui/input";
import { Label, LabelInputGridContainer } from "@/components/ui/label";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { userUserUpdateMutation } from "@/hooks/user";
import { useForm } from "react-hook-form";
import {
  EmergencyInfoUpdateInputs,
  EmergencyInfoUpdateSchema,
  UserUpdateInputs,
  UserUpdateSchema,
} from "@/schemas/userSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { User } from "@/schemas/authSchema";
import { ErrorAlert } from "@/components/ui/alert";

const EmergencyForm = ({ user }: { user: User }) => {
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
    reset,
  } = useForm<EmergencyInfoUpdateInputs>({
    resolver: zodResolver(EmergencyInfoUpdateSchema),
    defaultValues: user,
  });

  function onReset(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    reset();
    resetCall();
  }

  function onSubmit(data: EmergencyInfoUpdateInputs) {
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
          <Label htmlFor="emergencyName" className="text-right">
            Name
          </Label>
          <Input
            id="emergencyName"
            divClassName="col-span-3"
            {...register("emergencyContactName")}
          />
        </LabelInputGridContainer>
        <LabelInputGridContainer>
          <Label htmlFor="emergencyRelation" className="text-right">
            Relation
          </Label>
          <Input
            id="emergencyRelation"
            divClassName="col-span-3"
            {...register("emergencyContactRelationship")}
          />
        </LabelInputGridContainer>
        <LabelInputGridContainer>
          <Label htmlFor="emergencyPhone" className="text-right">
            Phone
          </Label>
          <Input
            id="emergencyPhone"
            divClassName="col-span-3"
            {...register("emergencyContactPhone")}
          />
        </LabelInputGridContainer>
        <LabelInputGridContainer>
          <Label htmlFor="allergies" className="text-right">
            Allergies
          </Label>
          <Textarea
            id="allergies"
            className="col-span-3"
            {...register("allergies")}
          />
        </LabelInputGridContainer>
        <LabelInputGridContainer>
          <Label htmlFor="medications" className="text-right">
            Medications
          </Label>
          <Textarea
            id="medications"
            {...register("medications")}
            className="col-span-3"
          />
        </LabelInputGridContainer>
        <LabelInputGridContainer>
          <Label htmlFor="conditions" className="text-right">
            Conditions
          </Label>
          <Textarea
            id="conditions"
            {...register("medicalConditions")}
            className="col-span-3"
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
            Save Changes
          </Button>
        </div>
      </form>
    </>
  );
};
EmergencyForm.displayName = "EditForm";
export default EmergencyForm;
