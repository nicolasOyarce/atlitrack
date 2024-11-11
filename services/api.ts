import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// Configura la instancia de axios
export const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export default api;