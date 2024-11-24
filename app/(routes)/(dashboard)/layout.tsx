import { NavbarDashboard } from "./dashboard/components/NavbarDashboard";
import { Sidebar } from "./dashboard/components/Sidebar";

export default function LayoutDashboard({children}: {children: React.ReactNode}) {
    return <div className="flex w-full h-full">
                    <div className="p-6 h-max">{children}</div>
                </div>
}
