import { Calendar, ChartLine, HousePlus, Dumbbell, NotebookPen, UserPen, Settings, BicepsFlexed} from "lucide-react";
import { exit } from "process";

export const dataAdminSidebar = [
    {
        icon: HousePlus,
        label: "Mi Centro",
        href:"/dashboard/admin/sport-center-manager"
    },
    {
        icon: Calendar,
        label: "Agenda",
        href:"/dashboard/admin/schedule"
    },
    {
        icon: BicepsFlexed,
        label: "Entrenadores",
        href:"/dashboard/admin/trainer-manager"
    },
    {
        icon: Dumbbell,
        label: "Disciplinas",
        href:"/dashboard/admin/disciplines"
    },
    {
        icon: NotebookPen,
        label: "Planes",
        href:"/dashboard/admin/plans"
    },
    {
        icon: UserPen,
        label: "Alumnos",
        href:"/dashboard/admin/students"
    },
    {
        icon: ChartLine,
        label: "Ingresos/Egresos",
        href:"/dashboard/admin/accouting"
    },
    {
        icon: Settings,
        label: "Configuraciones",
        href:"/dashboard/admin/configurations"
    },
]

export const dataStudentSidebar = [
    {
        icon: HousePlus,
        label: "Agendar",
        href:"/dashboard/student/sport-center-manager"
    },
    {
        icon: HousePlus,
        label: "Historial",
        href:"/dashboard/student/sport-center-manager"
    },
    {
        icon: HousePlus,
        label: "Configuraciones",
        href:"/dashboard/student/sport-center-manager"
    },

]