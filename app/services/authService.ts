import axios from 'axios';
import { NextApiRequest } from 'next';
import { instanceAXIOSBack } from './requestConfig';

const API_URL = process.env.NEXT_PUBLIC_URL_BACKEND;

export const register = async (name: string, password: string, email: string,) => {
    await instanceAXIOSBack.get(`${API_URL}/sanctum/csrf-cookie`);
    const response = await instanceAXIOSBack.post(`${API_URL}/api/register`, { name, password, email });
    return response.data;
};

export const login = async (email: string, password: string) => {
    await instanceAXIOSBack.get(`${API_URL}/sanctum/csrf-cookie`);
    const response = await instanceAXIOSBack.post(`${API_URL}/api/login`, { email, password });
    return response.data;
};

export const getSession = async (req?: NextApiRequest) => {
    // Implement your session retrieval logic here
    // For example, you can check cookies or headers for a session token
    // This is a placeholder implementation
    return req?.headers.cookie ? { user: 'exampleUser' } : null;
};