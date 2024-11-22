import Link from "next/link";
import { SidebarItemProps } from "./SidebarItem.type";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

export function SidebarItem(props: SidebarItemProps) {
    const { item } = props;
    const { label, icon: Icon, href } = item;

    const pathname = usePathname();
    const activePath = pathname === href;

    return (
        <Link href={href} className={cn("flex gap-x-2 mt-2 text-slate-700 text-sm items-center hover:bg-slate-200 p-2 rounded-lg cursor-pointer", activePath && "bg-slate-200/20")}>
            <Icon className="w-5 h-5" strokeWidth={1} />
            {label}
        </Link>
    )
}
