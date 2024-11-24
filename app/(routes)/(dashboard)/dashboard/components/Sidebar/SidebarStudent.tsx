import { LogoDashboard } from "../LogoDashboard"
import { SidebarRoutesStudent } from "../SidebarRoutes/SidebarRoutesStudent"

export const SidebarStudent = () => {
    return (
        <div className="h-screen">
            <div className="flex flex-col h-full border-r">
                <LogoDashboard />
                <SidebarRoutesStudent />
            </div>
        </div>
    )
}
