const API_URL = import.meta.env.PUBLIC_WP_URL;
const WP_USER = import.meta.env.SECRET_WP_USER;
const WP_PASSWORD = import.meta.env.SECRET_WP_PASSWORD;
export async function APICall<T>(query: string): Promise<T> {
  try {
    if (!API_URL) throw new Error("Brak WP_URL w .env");

    const headers: HeadersInit = { "Content-Type": "application/json" };

    if (WP_PASSWORD && WP_USER) {
      const token = btoa(`${WP_USER}:${WP_PASSWORD}`);
      headers["Authorization"] = `Basic ${token}`;
    }
    const res = await fetch(API_URL, {
      method: "POST",
      headers: headers,
      body: JSON.stringify({ query }),
    });

    const json = await res.json();

    if (json.errors) {
      console.error("GraphQL error API", json.errors);
      throw new Error("GraphQL error API", json.errors);
    }

    return json.data;
  } catch (error) {
    console.error("Call failed");
    throw error;
  }
}
