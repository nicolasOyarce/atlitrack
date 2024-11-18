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
  axios.defaults.withCredentials = true;

  // Obtener el token desde las cookies al cargar
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const response = await fetch('/api/auth/token', {
          method: 'GET',
          credentials: 'include'  // Asegúrate de enviar las cookies
        });
  
        if (response.ok) {
          const data = await response.json();
          setUser(data);  // Aquí asignas el usuario desde la respuesta
        } else {
          console.log("Usuario no autenticado.");
          setUser(null);  // Si la respuesta no es 200, el usuario no está autenticado
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
        console.log("ERROR", error)
        if (error.response?.status === 401) {
          console.log("Error 301 detectado jaja")
          logout();
        }
        return Promise.reject(error);
      }
    );

    return () => axios.interceptors.response.eject(interceptor);
  }, []);

  const login = async (username: string, password: string) => {
    try {
      const response = await axios.post("/auth/token", new URLSearchParams({
        username,
        password
      }), {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        withCredentials: true,  // Asegúrate de enviar cookies en las solicitudes
      });
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setUser(response.data);
      
      // Redirigir a la página deseada
      router.push("/dashboard/admin/sport-center-manager");// Redirige al dashboard o página de inicio después del login
    } catch (error) {
      console.error("Error de inicio de sesión:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      console.log("Redirigiendo al sign-in..")
      await axios.post("/auth/logout");
      setUser(null);
      router.push("/sign-in"); // Redirige al iniciar sesión
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
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