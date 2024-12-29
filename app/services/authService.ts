import axios from 'axios';
import { NextApiRequest } from 'next';

const API_URL = 'http://localhost/test/eleconomista-back/api';

export const register = async (name: string, password: string, email: string,) => {
    const response = await axios.post(`${API_URL}/register`, { name, password, email });
    return response.data;
};

export const login = async (email: string, password: string) => {
    const response = await axios.post(`${API_URL}/login`, { email, password });
    return response.data;
};

export const getSession = async (req?: NextApiRequest) => {
    // Implement your session retrieval logic here
    // For example, you can check cookies or headers for a session token
    // This is a placeholder implementation
    return req?.headers.cookie ? { user: 'exampleUser' } : null;
};