import axios, { AxiosError } from 'axios';

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

export interface AuthResponse {
  access_token: string;
  token_type: string;
}

{/*
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


  export interface User {
    id: string;
    username: string;
    role: string;
    // Otros campos necesarios
  }

*/}
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    console.log("Interceptor: Error detectado:", error);
    if (error.response?.status === 401 && !error.config._retry) {
      error.config._retry = true;
      try {
        const refreshResponse = await axios.post<AuthResponse>(
          "/auth/refresh",
          {},
          { withCredentials: true }
        );
        console.log("refresh goodd..")
        const newAccessToken = refreshResponse.data.access_token;
        console.log(newAccessToken)
        error.config.headers = {
          ...error.config.headers,
          Authorization: `Bearer ${newAccessToken}`,
        };

        return axiosInstance.request(error.config); // Reintenta la solicitud
      } catch (refreshError) {
        console.error("Error al refrescar el token:", refreshError);
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

