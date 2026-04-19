import { errorResponseSchema } from "@/types/auth";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

type ApiOptions = RequestInit & {
  auth?: boolean;
};

function getTokenFromCookie(): string | null {
  if (typeof document === "undefined") return null;

  const match = document.cookie.match(/(^| )token=([^;]+)/);
  return match ? match[2] : null;
}

export async function apiClient<T>(
  path: string,
  options: ApiOptions = {}
): Promise<{ data: T; token?: string }> {
  const token = getTokenFromCookie();

  const headers = new Headers(options.headers || {});

  if (!(options.body instanceof FormData)) {
    headers.set("Content-Type", "application/json");
  }

  if (options.auth && token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  const res = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers,
    credentials: "include",
  });

  const authHeader = res.headers.get("Authorization");
  const newToken = authHeader?.startsWith("Bearer ")
    ? authHeader.replace("Bearer ", "")
    : undefined;

  if (!res.ok) {
    let errorBody: unknown = {};

    try {
      errorBody = await res.json();
    } catch {}

    const parsed = errorResponseSchema.safeParse(errorBody);

    if (parsed.success) {
      const err = parsed.data;

      throw new Error(
        err.errors?.join(", ") || err.message || "API Error"
      );
    }

    throw new Error("API Error");
  }

  let data: T;
  const contentType = res.headers.get("content-type");

  if (contentType?.includes("application/json")) {
    data = await res.json();
  } else {
    data = {} as T;
  }

  return {
    data,
    token: newToken,
  };
}