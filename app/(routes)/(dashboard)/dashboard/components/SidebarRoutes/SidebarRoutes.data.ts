import { Calendar, Heart, Dumbbell, FileSliders, ChartLine, PersonStanding, PanelBottomClose } from "lucide-react";
import { exit } from "process";

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
    {
        icon: PanelBottomClose,
        label:"Cerrar sesion",
        href: "../../sign-in"

    }
]

export const dataAdminSidebar = [
    {
        icon: FileSliders,
        label: "Administrar Centros Deportivos",
        href:"sport-center-manager"
    },
    {
        icon: Calendar,
        label: "Entrenadores",
        href:"trainer-manager"
    },
    {
        icon: PersonStanding,
        label: "Disciplinas",
        href:"disciplines"
    },
    {
        icon: PersonStanding,
        label: "Planes",
        href:"plans"
    },
    {
        icon: ChartLine,
        label: "Reportes",
        href:"/reports"
    },
]