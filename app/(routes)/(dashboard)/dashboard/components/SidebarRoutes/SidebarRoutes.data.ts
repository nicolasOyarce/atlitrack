import { Calendar, Heart, Dumbbell, FileSliders, ChartLine, PersonStanding } from "lucide-react";

export const dataGeneralSidebar = [
    {
        icon: Dumbbell,
        label: "Clases",
        href:"/dashboard"
    },
    {
        icon: Calendar,
        label: "Clases Reservadas",
        href:"/reserves"
    },
    {
        icon: Heart,
        label: "Clases Favoritas",
        href:"/loved-class"
    },
]

export const dataAdminSidebar = [
    {
        icon: FileSliders,
        label: "Administrar Clases",
        href:"dashboard/admin/class-manager"
    },
    {
        icon: PersonStanding,
        label: "Administrar Profesores",
        href:"dashboard/admin/prof-manager"
    },
    {
        icon: Calendar,
        label: "Clases Reservadas",
        href:"/reserves"
    },
    {
        icon: ChartLine,
        label: "Reportes",
        href:"/reports"
    },
]