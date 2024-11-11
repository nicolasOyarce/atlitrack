"use client";

import {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode
} from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Toast } from "@/components/ui/toast"; // Asegúrate de que el componente Toast esté correctamente importado.

interface User {
  access_token: string;
  refresh_token: string;
  token_type: string;
  expires_in: number;
  // Agrega aquí más campos según tu respuesta de API
}

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  // Configuración base de axios
  axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_URL;

  // Obtener el token desde las cookies al cargar
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const response = await fetch('/api/auth/token'); // Llamar a la API Route para obtener el token
        const data = await response.json();

        if (data.access_token) {
          axios.defaults.headers.common["Authorization"] = `Bearer ${data.access_token}`;
          setUser(data); // Establece el usuario con los datos obtenidos
        }
      } catch (error) {
        console.error('Error al obtener el token:', error);
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, []);

  // Interceptor para manejar errores de autenticación
  useEffect(() => {
    const interceptor = axios.interceptors.response.use(
      response => response,
      error => {
        if (error.response?.status === 401) {
          logout();
        }
        return Promise.reject(error);
      }
    );

    return () => axios.interceptors.response.eject(interceptor);
  }, []);

  const login = async (username: string, password: string) => {
    try {
      setIsLoading(true);
      const formData = new URLSearchParams();
      formData.append("username", username);
      formData.append("password", password);

      const response = await axios.post("/auth/token", formData.toString(), {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      });

      const { access_token } = response.data;

      // Almacenar el token en las cookies (deberías implementar un setCookie en el lado del servidor)
      document.cookie = `access_token=${access_token}; path=/; secure; SameSite=Strict`;

      // Establecer el token en los headers de axios
      axios.defaults.headers.common["Authorization"] = `Bearer ${access_token}`;

      // Almacenar en localStorage si es necesario
      localStorage.setItem("token", access_token);

      setUser(response.data);
      router.push("/dashboard/admin/sport-center-manager"); // Redirige al dashboard o página de inicio después del login
    } catch (error) {
      console.error("Error de inicio de sesión:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
    delete axios.defaults.headers.common["Authorization"];

    // Eliminar el token de las cookies
    document.cookie = "access_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT"; // Eliminar cookie

    router.push("/sign-in");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isLoading,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// Hook personalizado para usar el contexto
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth debe ser usado dentro de un AuthProvider");
  }
  return context;
}

export default AuthContext;
