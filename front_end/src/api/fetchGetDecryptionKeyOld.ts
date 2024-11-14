// import fs from "fs";
// import path from "path";
// import https from "https";

export async function fetchGetDecryptionKey(keyID: string) {
  const url =
    " https://192.36.164.182/api/v1/keys/alice_client1/dec_keys?key_ID=" +
    keyID;

  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  debugger;

  // // Define the paths to the certificates and key
  // const ca_path = "./cert/rootCA_auth.crt";
  // const cert_path = "./cert/bob_client1.crt";
  // const key_path = "./cert/bob_client1.key";

  // const httpsAgent = new https.Agent({
  //   cert: fs.readFileSync(path.resolve(__dirname, cert_path), `utf-8`),
  //   key: fs.readFileSync(path.resolve(__dirname, key_path), "utf-8"),
  //   ca: fs.readFileSync(path.resolve(__dirname, ca_path), "utf-8"),
  // });

  const options = {
    method: "GET",
    headers,
    // httpsAgent,
  };

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(
        `Failed to fetch data: ${response.status} ${response.statusText}`
      );
    }
    debugger;
    return response;
  } catch (error) {
    console.error("Error fetching data:", error);
    debugger;
    throw error; // Re-throw the error for further handling
  }
}
