import axios from 'axios';
import { 
  authenticateUserAuthTokenPost,
  AuthenticateUserAuthTokenPostData,
  client 
} from "@/src/client";
import { createClient } from '@hey-api/client-axios';
import type {TokenResponse} from "@/src/client/types.gen"

client.setConfig({
    // set default base url for requests
    baseURL: 'http://localhost:8000',
    // set default headers for requests
    headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
  });
// Crear una instancia de axio

// Interceptor para añadir el token a las peticiones
client.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Interceptor para manejar errores de autenticación
client.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Si el error es 401 y tenemos un refresh token
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = localStorage.getItem('refresh_token');

      if (!refreshToken) {
        throw new Error('No refresh token available');
      }

      try {
        // Estructura correcta para la llamada de refresh token
        const refreshData: AuthenticateUserAuthTokenPostData = {
          body: {
            grant_type: 'refresh_token',
            //refresh_token: refreshToken,
            username: '', // Requerido según el schema
            password: '', // Requerido según el schema
            scope: '',
            client_id: null,
            client_secret: null
          }
        };

        const response = await authenticateUserAuthTokenPost({
          ...refreshData
        });

        const { access_token } = response.data;
        localStorage.setItem('access_token', access_token);

        // Reintentar la petición original con el nuevo token
        originalRequest.headers.Authorization = `Bearer ${access_token}`;
        return client(originalRequest);
      } catch (error) {
        // Si falla el refresh, redirigir al login
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        window.location.href = '/login';
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  }
);

export default api;