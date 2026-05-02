type QueryValue = string | number | boolean | null | undefined | Array<string | number | boolean>;
type QueryParams = Record<string, QueryValue>;

const BASE_URL = import.meta.env.VITE_API_BASE;

function buildUrl(url: string, params?: QueryParams) {
  const fullUrl = new URL(`${BASE_URL}${url}`, window.location.origin);

  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value === undefined || value === null) return;

      if (Array.isArray(value)) {
        value.forEach((item) => fullUrl.searchParams.append(key, String(item)));
      } else {
        fullUrl.searchParams.append(key, String(value));
      }
    });
  }

  return fullUrl.toString();
}

export async function GET<T>(url: string, params?: QueryParams): Promise<T> {
  const res = await fetch(buildUrl(url, params));

  if (!res.ok) {
    throw new Error("GET request failed");
  }

  return res.json();
}

export class ApiError<T = unknown> extends Error {
  status: number;
  response: T;

  constructor(message: string, status: number, response: T) {
    super(message);
    this.status = status;
    this.response = response;
  }
}

export async function POST<T>(url: string, body?: unknown, params?: QueryParams): Promise<T> {
  const res = await fetch(buildUrl(url, params), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: body ? JSON.stringify(body) : undefined,
  });

  const data = await res.json();

  if (!res.ok) {
    throw new ApiError("Request failed", res.status, data);
  }

  return data;
}
