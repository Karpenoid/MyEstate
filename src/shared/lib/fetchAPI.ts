import { ApiError } from "@/shared/types/api-error";

export type ApiFetchOptions<TBody> = {
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  body?: TBody;
  headers?: HeadersInit;
  cache?: RequestCache;
  next?: NextFetchRequestConfig;
  rawBody?: BodyInit;
};

export async function apiFetch<TResponse, TBody = unknown>(
  url: string,
  options: ApiFetchOptions<TBody> = {},
): Promise<TResponse> {
  const method = options.method ?? "GET";

  /** 1. Create a URL object to handle parameters safely */
  // const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  // const fullUrl = new URL(`${url}`);

  const isFormData = options.body instanceof FormData;
  const headers = new Headers(options.headers);

  if (!isFormData) {
    headers.set("Content-Type", "application/json");
  } else {
    headers.delete("Content-Type");
  }

  const requestBody =
    options.rawBody ?? (options.body !== undefined ? JSON.stringify(options.body) : undefined);

  const res = await fetch(url, {
    method,
    headers,
    body: requestBody,
    // options.body && method !== "GET"
    //   ? isFormData
    //     ? (options.body as BodyInit | undefined)
    //     : JSON.stringify(options.body)
    //   : undefined,
    /** if revalidate is passed - skip 'cache' prop */
    cache: options.next?.revalidate !== undefined ? undefined : (options.cache ?? "no-store"), // options.cache ?? 'no-store',
    next: options.next ?? undefined,
  });

  if (!res.ok) {
    let error: ApiError = {
      message: "Request failed",
      status: res.status,
    };

    try {
      const data = await res.json();

      // Normalize the message (handle string or array)
      const rawMessage = data?.message ?? error.message;
      const normalizedMessage = Array.isArray(rawMessage) ? rawMessage[0] : rawMessage;

      error = {
        ...error,
        status: data?.statusCode ?? data?.status ?? res.status,
        message: normalizedMessage, // data?.message ?? error.message,
        code: data?.code || data?.error,
      };
    } catch {
      // backend returned no JSON
    }

    throw error;
  }
  return res.json() as Promise<TResponse>;
}
