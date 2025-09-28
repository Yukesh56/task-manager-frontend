import axios from "axios";

// Generic function to contact backend
export async function contactServer(url, request) {
  try {
    const response = await axios({
      url,
      method: request.method || "POST",
      headers: {
        "Content-Type": "application/json",
        ...(request.headers || {}), // merge any custom headers
      },
      data: request.body, // payload
    });
    
    return response.data; // return backend response
  } catch (error) {
    console.error("Error contacting server:", error.response?.data || error.message);
    throw error.response?.data || { message: "Server error" };
  }
}
