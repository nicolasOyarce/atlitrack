"use client"

import { Separator } from "@/components/ui/separator"
{/*import { useAuth } from "@clerk/nextjs";*/}
import { dataGeneralSidebar, dataAdminSidebar } from "./SidebarRoutes.data";
import { SidebarItem } from "./SidebarItem";
import { useAuth } from "@/app/api/auth/login/route"

export const SidebarRoutes = () => {
    {/*const { userId } = useAuth();*/}
    const { logout } = useAuth(); // Obtén la función logout desde el contexto de autenticación

    const handleLogout = () => {
        logout(); // Llama a la función logout cuando el usuario haga clic
    };
    
    return (
        <div className="flex flex-col justify-between h-full">
            <div>
                <div className="p-2 md:p-6">
                    <p className="mb-2 text-slate-300">GENERAL</p>
                    {dataGeneralSidebar.map((item) => (
                        <SidebarItem key={item.label} item={item} />
                    ))}
                </div>
                <Separator />
                <div>
                    <div className="p-2 md:p-6 mt-3">
                        <p className="mb-2 text-slate-300">ADMIN</p>
                        {dataAdminSidebar.map((item) => (
                            <SidebarItem key={item.label} item={item} />
                        ))}
                    </div>
                </div>
                {/* Lógica para el botón de cerrar sesión */}
                <div className="p-2">
                <button
                    className="flex items-center space-x-2 text-red-500" // Puedes ajustar los estilos según sea necesario
                    onClick={handleLogout} // Llama a handleLogout al hacer clic
                >
                    <div className="w-5 h-5" /> {/* Asegúrate de que el icono esté presente */}
                    <span>Cerrar sesión</span>
                </button>
                </div>
                
            </div>
        </div>
    )
}
