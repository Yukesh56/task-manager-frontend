import { contactServer } from "./client";

//Fetching the base url from env file.
const BASE_URL = import.meta.env.VITE_LOCAL_BASE_URL;

// API service method for creating the task
export async function createTaskService(task, token, endpoint) {

  const url = `${BASE_URL}${endpoint}`;

  const request = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(task),
  };

  return await contactServer(url, request);
};


// API service method to GET Tasks by Project
export async function getTasksByProjectService(endpoint, token) {

  const url = `${BASE_URL}${endpoint}`;

  const request = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`
    },
  };

  return await contactServer(url, request);
};

//Service method to update a task
export async function updateTaskService(endpoint, task, token) {

  const url = `${BASE_URL}${endpoint}`;

  const request = {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(task),
  };

  return await contactServer(url, request);
}

// Service method to SOFT DELETE Task
export async function deleteTaskService(endpoint, token) {

  const url = `${BASE_URL}${endpoint}`;

  const request = {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`
    },
  };
  
  return await contactServer(url, request);
};