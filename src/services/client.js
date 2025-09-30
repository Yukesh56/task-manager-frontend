import axios from "axios";

// Generic function to contact backend
export async function contactServer(url, request) {
  try {
    console.log(url, request)
    const response = await axios({
      url, //endPoint
      method: request.method || "POST", //method
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
