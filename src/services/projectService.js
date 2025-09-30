import { contactServer } from "./client";

const BASE_URL = import.meta.env.VITE_LOCAL_BASE_URL;


// Method to build the request for get the projects
export async function fetchProjectService(token, endpoint) {
  const url = `${BASE_URL}${endpoint}`; // combining base URL + endpoint

  const request = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`
    }
  };

  return await contactServer(url, request);
};

// Method to build the request to create the project
export async function createProjectService(project, token, endpoint) {
  const url = `${BASE_URL}${endpoint}`; // combining base URL + endpoint

  const request = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`
    },
    body: project
  };

  return await contactServer(url, request);
};

// Method to build the request to update the project
export async function updateProjectService(project, token, endpoint) {
  const url = `${BASE_URL}${endpoint}`; // combining base URL + endpoint

  const request = {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`
    },
    body: project
  };

  return await contactServer(url, request);
};
