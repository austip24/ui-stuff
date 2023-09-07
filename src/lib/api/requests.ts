import { API_URL } from "./config";

export const getData = async () => {
	try {
		const res = await fetch(`${API_URL}/api`);

		if (!res.ok) {
			throw new Error("Failed to fetch data");
		}

		const json = await res.json();
		return json;
	} catch (error) {
		console.error(error);
	}
};
