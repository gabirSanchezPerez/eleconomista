import axios from "axios";

const URLBACK = process.env.NEXT_PUBLIC_URL_BACKEND;
axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('auth_token')}`;

export const instanceAXIOSBack = axios.create({
  baseURL: URLBACK, // Reemplaza con la URL base de tu API
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json",
    //"Authorization": `Bearer ${localStorage.getItem('auth_token')}`,
  },
  withCredentials: true,
  withXSRFToken: true,
});

export const instanceAXIOSBackFiles = axios.create({
  baseURL: URLBACK, // Reemplaza con la URL base de tu API
  headers: {
    "Content-Type": "multipart/form-data",
  },
  withCredentials: true,
  withXSRFToken: true,
});
/*
export const instanceAXIOSBack = axios.create({
  baseURL: URLBACK, // Reemplaza con la URL base de tu API
  headers: {
    "Content-Type": "multipart/form-data",
  },
  withCredentials: true,
  withXSRFToken: true,
});*/