const API_URL = import.meta.env.WP_URL;

export async function APICall<T>(query: string): Promise<T> {
	try {
		const res = await fetch(API_URL, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ query }),
		});

		const json = await res.json();

		if (json.errors) {
			console.error("GraphQL error API", json.errors);
			throw new Error("GraphQL error API");
		}

		return json.data;
	} catch (error) {
		console.error("Call failed");
		throw error;
	}
}
