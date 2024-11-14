export interface IfetchRNDnumber {
  result: string;
  key_id: string;
  iv: string;
}

// export async function fetchRNDnumber(
//   numberOfSymbols: number
// ): Promise<IfetchRNDnumber | null> {
//   const headers = new Headers();
//   headers.append("Content-Type", "application/json");
//   const payload = {
//     numberOfSymbols: numberOfSymbols.toString(),
//   };
//   const options = {
//     method: "POST",
//     headers,
//     body: JSON.stringify(payload),
//   };

//   const res = await fetch(
//     `http://192.36.164.187:5000/generate_random_number`,
//     options
//   );

//   if (res.status === 500) {
//     return null;
//   }

//   const jsonData = await res.json();

//   return jsonData;
// }


// export async function fetchRNDnumber(
//   numberOfSymbols: number
// ): Promise<IfetchRNDnumber | null> {
//   const headers = new Headers();
//   headers.append("Content-Type", "application/json");
  
//   const payload = {
//     numberOfSymbols: numberOfSymbols.toString(),
//   };
  
//   const options = {
//     method: "POST",
//     headers,
//     body: JSON.stringify(payload),
//   };

//   try {
//     const res = await fetch(`http://192.36.164.187:5000/generate_random_number`, options);

//     // Check for any non-OK responses
//     if (!res.ok) {
//       console.error(`Error: ${res.status} ${res.statusText}`);
//       return null;
//     }

//     const jsonData = await res.json();
//     return jsonData;
//   } catch (error) {
//     console.error("Network error or server unreachable:", error);
//     return null;
//   }
// }


// # it is localhost:50000
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export async function fetchRNDnumber(
  numberOfSymbols: number
): Promise<IfetchRNDnumber | null> {
  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  
  const payload = {
    numberOfSymbols: numberOfSymbols.toString(),
  };
  
  const options = {
    method: "POST",
    headers,
    body: JSON.stringify(payload),
  };

  try {
    const res = await fetch(`${API_BASE_URL}/generate_random_number`, options);

    // Check for any non-OK responses
    if (!res.ok) {
      console.error(`Error: ${res.status} ${res.statusText}`);
      return null;
    }

    const jsonData = await res.json();
    return jsonData;
  } catch (error) {
    console.error("Network error or server unreachable:", error);
    return null;
  }
}