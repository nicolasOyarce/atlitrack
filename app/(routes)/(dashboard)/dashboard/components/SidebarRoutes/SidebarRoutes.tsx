"use client"

import { Separator } from "@/components/ui/separator"
import { useAuth } from "@clerk/nextjs";
import { dataGeneralSidebar, dataAdminSidebar } from "./SidebarRoutes.data";
import { SidebarItem } from "./SidebarItem";

export const SidebarRoutes = () => {
    const { userId } = useAuth();
    
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
                
            </div>
        </div>
    )
}
