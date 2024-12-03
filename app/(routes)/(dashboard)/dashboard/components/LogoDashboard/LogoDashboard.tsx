import Link from "next/link"
import Image from "next/image"

export const LogoDashboard = () => {
    return (
        <Link href="/" className="flex items-center h-20 gap-2 border-b cursor-pointer min-h-20 px-4">
            <Image src="/logo.svg" alt="Logo" width={40} height={40} priority /> 
            <h1 className="text-xl font-bold text-white">AtliTrack</h1>
        </Link>
    )
}
