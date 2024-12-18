import clientFetcher from "@/fetcher/client.fetcher";
import { PasswordUpdateInputs, UserUpdateInputs } from "@/schemas/userSchema";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const updateUser = async (data: UserUpdateInputs) =>
  clientFetcher(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/users/me`, {
    method: "PATCH",
    body: data,
  });

export const userUserUpdateMutation = () => {
  const queryClient = useQueryClient(); // Get the queryClient instance

  return useMutation({
    mutationFn: updateUser,
    onSuccess: (data) => {
      queryClient.setQueryData(["user"], data);
    },
  });
};
const updateUserPassword = async (data: PasswordUpdateInputs) =>
  clientFetcher(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/users/me/password`,
    {
      method: "PATCH",
      body: data,
    },
  );

export const useUserUpdatePasswordMutation = () => {
  return useMutation({
    mutationFn: updateUserPassword,
  });
};
