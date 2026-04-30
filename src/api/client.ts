const BASE_URL = import.meta.env.VITE_API_BASE;

export async function GET<T>(url: string): Promise<T> {
  const res = await fetch(`${BASE_URL}${url}`);

  if (!res.ok) {
    throw new Error("Request failed");
  }

  return await res.json();
}

export async function POST<T>(url: string, body: unknown): Promise<T> {
  const res = await fetch(`${BASE_URL}${url}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) throw new Error("Request failed");

  return await res.json();
}
