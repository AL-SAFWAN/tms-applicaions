import clientFetcher from "@/fetcher/client.fetcher";
import { User } from "@/schemas/authSchema";
import { createUserInputs } from "@/schemas/userSchema";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

// CRUD
const createUser = async (data: createUserInputs) =>
  clientFetcher<User>(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/users/`, {
    method: "POST",
    body: data,
  });

export const useCreateUserMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createUser,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["userChartInfo"] });
      queryClient.setQueryData(["users"], (oldData: User[]) => [
        ...oldData,
        data,
      ]);
    },
  });
};
const readUsers = async () =>
  clientFetcher<User[]>(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/users/`);

function calculateAge(birthDate: string) {
  const today = new Date();
  const birth = new Date(birthDate);

  let age = today.getFullYear() - birth.getFullYear();
  const monthDifference = today.getMonth() - birth.getMonth();
  const dayDifference = today.getDate() - birth.getDate();

  if (monthDifference < 0 || (monthDifference === 0 && dayDifference < 0)) {
    age--;
  }

  return age.toString();
}

export const useUsers = () => {
  return useQuery({
    queryKey: ["users"],
    queryFn: readUsers,
    select: (data) =>
      data.map((data) => ({
        ...data,
        age: calculateAge(data.dateOfBirth),
      })),
  });
};

const updateUser = async ({
  id,
  data,
}: {
  id: string;
  data: createUserInputs | { isActive: boolean };
}) =>
  await clientFetcher<User>(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/users/${id}`,
    {
      method: "PATCH",
      body: data,
    },
  );

export const useUpdateUsersMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateUser,
    onSuccess: (newData, variables) => {
      queryClient.setQueryData(["users"], (oldData: User[]) =>
        oldData
          ? oldData.map((user) => (user.id === variables.id ? newData : user))
          : [newData],
      );
    },
  });
};

const deleteUser = async (id: string) =>
  clientFetcher(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/users/${id}`, {
    method: "DELETE",
  });

export const useDeleteUserMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteUser,
    onSuccess: (_data, id: string) => {
      queryClient.invalidateQueries({ queryKey: ["userChartInfo"] });
      queryClient.setQueryData(["users"], (oldData: User[]) =>
        oldData.filter((user) => user.id !== id),
      );
    },
    onError: (error) => {
      toast.error("Error", {
        className:
          "!border-2 border-destructive bg-destructive/90 text-destructive-foreground [&>svg]:text-destructive ",
        description: error?.message,
        duration: 2500,
      });
    },
  });
};

const getUserChartInfo = async () =>
  clientFetcher(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/users/info`);

export const useUserChartInfo = () => {
  return useQuery({
    queryKey: ["userChartInfo"],
    queryFn: getUserChartInfo,
  });
};
