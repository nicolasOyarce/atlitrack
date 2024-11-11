import axios from 'axios';
import { getCookie } from 'cookies-next';

console.log('Configurando axios instance');
const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
console.log('BASE_URL: ', BASE_URL);

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para agregar el token JWT
axiosInstance.interceptors.request.use(
  (config) => {
    const token = getCookie('access_token');
    console.log('Token en interceptor:', token);
    console.log('Headers antes:', config.headers);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log('Headers después:', config.headers);
    }
    return config;
  },
  (error) => {
    console.error('Error en interceptor de request:', error);
    return Promise.reject(error);
  }
);
axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
      console.error('Error en respuesta:', {
        status: error.response?.status,
        data: error.response?.data,
        headers: error.response?.headers,
      });
      
      if (error.response?.status === 401) {
        console.log('Error 401 detectado - No autenticado');
        // window.location.href = '/auth/login';
      }
      return Promise.reject(error);
    }
  );