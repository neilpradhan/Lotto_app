export async function fetchGenerateOutputFile() {
  const headers = new Headers();
  headers.append("Content-Type", "application/json")

  const options = {
    method: "GET",
    headers,
  };

  await fetch(
    `http://192.36.164.187:5000/generate_output_file`,
    options
  );


}
