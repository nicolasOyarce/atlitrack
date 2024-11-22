"use client"

import { Separator } from "@/components/ui/separator"
{/*import { useAuth } from "@clerk/nextjs";*/}
import { dataGeneralSidebar, dataAdminSidebar } from "./SidebarRoutes.data";
import { SidebarItem } from "./SidebarItem";
import { useAuth } from "@/app/api/auth/login/route"
import { LogOut } from "lucide-react";

export const SidebarRoutes = () => {
    {/*const { userId } = useAuth();*/}
    const { logout } = useAuth(); // Obtén la función logout desde el contexto de autenticación

    const handleLogout = () => {
        logout(); // Llama a la función logout cuando el usuario haga clic
    };
    
    return (
        <div className="flex flex-col justify-between h-full">
            <div>
                {/*<div className="p-2 md:p-6">
                    <p className="mb-2 text-slate-300">GENERAL</p>
                    {dataGeneralSidebar.map((item) => (
                        <SidebarItem key={item.label} item={item} />
                    ))}
                </>
                <Separator />
                
                */}
                <div className="p-2 md:p-6 mt-3">
                    <div className="">
                        <p className="mb-2 text-slate-700 text-xl font-semibold pl-4">Menú</p>
                        {dataAdminSidebar.map((item) => (
                            <SidebarItem key={item.label} item={item} />
                        ))}
                        <a
                        className="flex gap-x-2 p-2  text-sm items-center font-semibold hover:bg-slate-200 rounded-lg cursor-pointer text-red-500 " // Puedes ajustar los estilos según sea necesario
                        onClick={handleLogout} // Llama a handleLogout al hacer clic
                        >
                        <LogOut />
                        Cerrar Sesión
                        </a>
                    </div>
                    <div className=" ">
                        
                    </div>
                </div>
                {/* Lógica para el botón de cerrar sesión */}
                
                
            </div>
        </div>
    )
}
