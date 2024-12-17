"use client";

import { fetchWithErrorHandling } from "./baseFetcher";

/**
 * Converts a camelCase string to snake_case.
 * @param str The camelCase string.
 * @returns The snake_case string.
 */
function camelToSnake(str: string): string {
  return str.replace(/([A-Z])/g, "_$1").toLowerCase();
}

/**
 * Recursively converts all keys in an object from camelCase to snake_case.
 * @param obj The object to convert.
 * @returns A new object with snake_case keys.
 */
function convertKeysToSnakeCase(obj: any): any {
  if (Array.isArray(obj)) {
    return obj.map(convertKeysToSnakeCase);
  } else if (obj !== null && typeof obj === "object") {
    return Object.keys(obj).reduce(
      (acc, key) => {
        const snakeKey = camelToSnake(key);
        acc[snakeKey] = convertKeysToSnakeCase(obj[key]);
        return acc;
      },
      {} as Record<string, any>,
    );
  }
  return obj;
}

/**
 * Normalizes HeadersInit to a Record<string, string>
 * @param headers HeadersInit input
 * @returns A Record<string, string> representation of headers
 */
function normalizeHeaders(headers?: HeadersInit): Record<string, string> {
  if (!headers) {
    return {};
  }

  if (headers instanceof Headers) {
    const record: Record<string, string> = {};
    headers.forEach((value, key) => {
      record[key] = value;
    });
    return record;
  } else if (Array.isArray(headers)) {
    return headers.reduce(
      (acc, [key, value]) => {
        acc[key] = value;
        return acc;
      },
      {} as Record<string, string>,
    );
  } else {
    return { ...headers };
  }
}

/**
 * Converts a snake_case string to camelCase.
 * @param str The snake_case string.
 * @returns The camelCase string.
 */
function snakeToCamel(str: string): string {
  return str.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
}

/**
 * Recursively converts all keys in an object from snake_case to camelCase.
 * @param obj The object to convert.
 * @returns A new object with camelCase keys.
 */
function convertKeysToCamelCase(obj: any): any {
  if (Array.isArray(obj)) {
    return obj.map(convertKeysToCamelCase);
  } else if (obj !== null && typeof obj === "object") {
    return Object.entries(obj).reduce(
      (acc, [key, value]) => {
        const camelKey = snakeToCamel(key);
        acc[camelKey] = convertKeysToCamelCase(value);
        return acc;
      },
      {} as Record<string, any>,
    );
  }
  return obj;
}

export interface CustomFetchOptions extends Omit<RequestInit, "body"> {
  body?: Record<string, any> | BodyInit | null;
}

export default async function clientFetcher<T = any>(
  url: string,
  options: CustomFetchOptions = {},
): Promise<T> {
  let { body, headers, ...restOptions } = options;

  const normalizedHeaders: Record<string, string> = {
    Accept: "application/json",
    ...normalizeHeaders(headers),
  };
  const contentType = normalizedHeaders["content-type"];

  if (body && typeof body === "object") {
    if (contentType !== "application/x-www-form-urlencoded") {
      const snakeCaseBody = convertKeysToSnakeCase(body);
      body = JSON.stringify(snakeCaseBody);
      normalizedHeaders["Content-Type"] = "application/json";
    } else {
      const urlSearchParams = new URLSearchParams(body as Record<string, any>);
      body = urlSearchParams.toString();
    }
  }

  const response = await fetchWithErrorHandling(url, {
    ...restOptions,
    method: options.method || "GET", // Default to GET if method not specified
    credentials: "include", // Include cookies in client-side fetch
    headers: normalizedHeaders,
    body,
  });
  const responseData = convertKeysToCamelCase(response);

  return responseData;
}
