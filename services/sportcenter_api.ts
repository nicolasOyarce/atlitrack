//no hace nada
import api from './api'
import axios, { AxiosError } from 'axios';
import { getToken } from '@/utils/utils';
  

export const createSportcenter = async (data: {sport_center_name: string;
    city_id: number;
    comuna_id: number;
    address: string;
    phone: number;
    mail: string;
    open_hour: string;
    close_hour: string;}) => {
        return api.post('/admin/sport-centers/create', data);
    };
    
export const getSportcenters = async () => {
    const token = getToken();
    console.log(token)
    try {
        const res = await api.get("/admin/sport-centers/get-all", {
          headers: {
            Authorization: `Bearer ${token}`, // Envía el token en las cabeceras
          },
        });
    
        return res.data; // Aquí puedes retornar la respuesta de las ciudades
      } catch (error: unknown) {
        if (axios.isAxiosError(error)) { // Usamos `isAxiosError` para verificar el tipo
            if (error.response?.status === 401) {
              console.error("No autorizado. Redirigiendo al login.");
              //window.location.href = "/sign-in";
              console.log(token)
              console.log(error)
            } else {
              console.error("Error inesperado en la API:", error);
            }
          } else {
            console.error("Error desconocido:", error);
          }
        throw error;
      }

}