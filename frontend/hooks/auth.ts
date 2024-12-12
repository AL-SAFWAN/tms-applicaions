"use client";
import clientFetcher from "@/fetcher/client.fetcher";
import {
  EmailFormInputs,
  LoginFormInputs,
  ResetPasswordInputs,
  roleEnum,
  SignUpFormInputs,
  User,
} from "@/schemas/authSchema";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const login = async ({ email: username, password }: LoginFormInputs) =>
  clientFetcher(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/login`, {
    method: "POST",
    headers: {
      "content-type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "password",
      username,
      password,
    }),
  });

export const useLoginMutation = () => {
  const queryClient = useQueryClient(); // Get the queryClient instance
  const router = useRouter();

  return useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      queryClient.setQueryData(["user"], data);
      console.log("data", data, "redirecting to /");
      router.push("/");
    },
  });
};

const signup = async (data: SignUpFormInputs) =>
  clientFetcher(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/register`, {
    method: "POST",
    body: data,
  });

export const useSignUpMutation = () => {
  const router = useRouter();
  const queryClient = useQueryClient(); // Get the queryClient instance
  return useMutation({
    mutationFn: signup,
    onSuccess: (data) => {
      queryClient.setQueryData(["user"], data);
      router.push("/");
    },
  });
};

const resetPassword = (body: ResetPasswordInputs & { token: string }) =>
  clientFetcher(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/reset-password`,
    {
      method: "POST",
      body,
    },
  );

export const useResetPasswordMutation = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: resetPassword,
    onSuccess: () => {
      router.push("/login");
      toast.success("Password changed!", {
        className:
          "!border-2 border-green-500 bg-green-500/90 text-destructive-foreground [&>svg]:text-destructive ",
        description: "Try to login with your new password",
      });
    },
  });
};

const recoverPassword = (data: EmailFormInputs) =>
  clientFetcher(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/password-recovery/` +
      data.email,
    {
      method: "POST",
    },
  );

export const useRecoverPasswordMutation = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: recoverPassword,
    onSuccess: () => {
      router.push("/login");
      toast.success("Email sent!", {
        className:
          "!border-2 border-green-500 bg-green-500/90 text-destructive-foreground [&>svg]:text-destructive ",
        description: "Check your email to reset your password",
      });
    },
  });
};

const fetchUser = async () =>
  clientFetcher<User>(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/users/me`);

function calculateAge(birthDate: string) {
  const today = new Date();
  const birth = new Date(birthDate);

  let age = today.getFullYear() - birth.getFullYear();
  const monthDifference = today.getMonth() - birth.getMonth();
  const dayDifference = today.getDate() - birth.getDate();

  // Adjust age if birthday hasn't occurred yet this year
  if (monthDifference < 0 || (monthDifference === 0 && dayDifference < 0)) {
    age--;
  }
  let ageBracket = "";
  if (age >= 4 && age <= 15) {
    ageBracket = "Youth";
  } else if (age >= 16 && age <= 17) {
    ageBracket = "Juvenile";
  } else if (age >= 18 && age <= 29) {
    ageBracket = "Adult";
  } else if (age >= 30 && age <= 35) {
    ageBracket = "Master 1";
  } else if (age >= 36 && age <= 40) {
    ageBracket = "Master 2";
  } else if (age >= 41 && age <= 45) {
    ageBracket = "Master 3";
  } else if (age >= 46 && age <= 50) {
    ageBracket = "Master 4";
  } else if (age >= 51 && age <= 55) {
    ageBracket = "Master 5";
  } else if (age >= 56 && age <= 60) {
    ageBracket = "Master 6";
  } else if (age >= 61 && age <= 65) {
    ageBracket = "Master 7";
  } else if (age >= 66 && age <= 70) {
    ageBracket = "Master 8";
  } else if (age >= 71) {
    ageBracket = "Master 9";
  } else {
    ageBracket = "";
  }
  return `${age} (${ageBracket})`;
}

export const useUser = () => {
  return useQuery({
    queryKey: ["user"],
    queryFn: fetchUser,
    select: (data) => ({
      ...data,
      createdAt: new Date(data.createdAt),
      age: calculateAge(data.dateOfBirth),
    }),
    staleTime: 1000 * 60 * 60, // Data stays fresh for 1 hour
  });
};

export const useIsRoleUser = (role: roleEnum) => {
  return (
    useQuery({
      queryKey: ["user"],
      queryFn: fetchUser,
    }).data?.role === role
  );
};

const logout = async () =>
  clientFetcher(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/logout`, {
    method: "POST",
  });

export const useLogoutMutation = () => {
  const queryClient = useQueryClient(); // Get the queryClient instance
  const router = useRouter();

  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: ["user"] });
      router.push("/login");
    },
  });
};
