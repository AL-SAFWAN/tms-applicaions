import { toast } from "sonner";

export interface ApiResponse<T> {
  data: T | null;
  error: string | null;
}

export async function fetchWithErrorHandling(
  url: string,
  options: RequestInit = {},
) {
  const response = await fetch(url, options);

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    const errorMessage = errorData.detail || "An error occurred";
    throw new Error(errorMessage);
  }

  const data = await response.json();
  return data;
}
