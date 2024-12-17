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

export const useUser = () => {
  return useQuery({
    queryKey: ["user"],
    queryFn: fetchUser,
    select: (data) => ({
      ...data,
      createdAt: new Date(data.createdAt),
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
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: ["user"] });
      router.push("/login");
    },
  });
};
