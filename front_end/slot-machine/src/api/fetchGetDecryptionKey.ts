import { IfetchRNDnumber } from "./fetchRNDnumber";

export async function fetchGetDecryptionKey(response: IfetchRNDnumber) {

  const url = `http://localhost:5002/generate_key_with_keyid`;

  const headers = new Headers();
  headers.append("Content-Type", "application/json");

  const payload = response;

  const options = {
    method: "POST",
    headers,
    body: JSON.stringify(payload),
  };

  try {
    const response = await fetch(url, options).then((response) => {
      if (!response.ok) {
        throw new Error(
          `Failed to fetch data: ${response.status} ${response.statusText}`
        );
      }
      return response.json();
    });

    return response;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error; // Re-throw the error for further handling
  }
}
