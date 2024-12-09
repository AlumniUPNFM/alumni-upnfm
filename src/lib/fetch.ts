// Para poder hacer peticiones
import { ApiResponse } from "@/types/api-response";

export const FETCH_GET = async <T>(
  url: string,
  options?: {
    headers?: HeadersInit;
  }
) => {
  const res = await fetch(url, {
    method: "GET",
    headers: options?.headers,
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message);

  return data as ApiResponse<T>;
};

export const FETCH_POST = async <T>(
  url: string,
  body: unknown,
  options?: {
    headers?: HeadersInit;
  }
) => {
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
    body: JSON.stringify(body),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message);

  return data as ApiResponse<T>;
};

export const FETCH_PUT = async <T>(
  url: string,
  body: unknown,
  options?: {
    headers?: HeadersInit;
  }
) => {
  const res = await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
    body: JSON.stringify(body),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message);

  return data as ApiResponse<T>;
};

export const FETCH_DELETE = async <T>(
  url: string,
  options?: {
    headers?: HeadersInit;
  }
) => {
  const res = await fetch(url, {
    method: "DELETE",
    headers: options?.headers,
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message);

  return data as ApiResponse<T>;
};
