import Cookies from 'js-cookie';

export const getToken = (): string | undefined => {
  const token = Cookies.get('token'); // Obtiene el valor de la cookie "auth_token"
  return token; // Puede ser undefined si no existe la cookie
};


