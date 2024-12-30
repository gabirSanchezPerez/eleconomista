import axios from "axios";

const URLBACK = process.env.NEXT_PUBLIC_URL_BACKEND;

export const instanceAXIOSBack = axios.create({
  baseURL: URLBACK, // Reemplaza con la URL base de tu API
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export const instanceAXIOSBackFiles = axios.create({
  baseURL: URLBACK, // Reemplaza con la URL base de tu API
  headers: {
    "Content-Type": "multipart/form-data",
  },
  withCredentials: true,
});
