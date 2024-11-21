import Cookies from 'js-cookie';
import { format } from 'date-fns';

export const getToken = (): string | undefined => {
  const token = Cookies.get('token'); // Obtiene el valor de la cookie "auth_token"
  return token; // Puede ser undefined si no existe la cookie
};

export const formatDate = (date) => {
  const new_date = new Date(date); // Convierte el valor a un objeto Date
  return format(new_date, 'dd-MM-yyyy');
}


