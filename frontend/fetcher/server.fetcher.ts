// lib/fetcher/server.fetcher.ts

import { cookies } from "next/headers";
import { fetchWithErrorHandling, ApiResponse } from "./baseFetcher";

export default async function serverFetcher<T = any>(
  url: string,
  options: RequestInit = {},
): Promise<ApiResponse<T>> {
  // Extract cookies from the incoming request
  const cookieStore = cookies();
  const cookieHeader = cookieStore.toString();

  console.log(`Server Fetcher: Fetching ${url} with cookies ${cookieHeader}`);

  return fetchWithErrorHandling(url, {
    ...options,
    headers: {
      ...options.headers,
      Cookie: cookieHeader, // Include cookies in server-side fetch
    },
  });
}
