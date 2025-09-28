import { contactServer } from "./client";

// Read base URL from env
const BASE_URL = import.meta.env.VITE_LOCAL_BASE_URL;

// Function to post user data
export async function createtUser(user, endpoint) {
  const url = `${BASE_URL}${endpoint}`; // combining base URL + endpoint

  const request = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: user, // user = { name, email, password }
  };

  return await contactServer(url, request);
}
