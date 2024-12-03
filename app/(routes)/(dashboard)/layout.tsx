export default function LayoutDashboard({children}: {children: React.ReactNode}) {
    return (
        <div className="flex w-full h-full bg-gray-950">
            <div className="p-6 h-max w-full">{children}</div>
        </div>
    )
}
