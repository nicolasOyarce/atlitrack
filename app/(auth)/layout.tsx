import React from 'react'
import Image from 'next/image'
import { Navbar } from '@/components/Navbar'

export default function AuthLayout({children}: {children: React.ReactNode}) {
    return (
        
            <div className=''>
                <div className='bg-black text-white'><Navbar /></div>    
                <div className='grid lg:grid-cols-2 '>     
                    <div className=' bg-slate-200 items-center justify-center bg-transparent'>{children}</div>
                    <div className='hidden lg:flex lg:bg-slate-200 h-full justify-center items-center lg:flex-col'>
                    <Image src="/image-sign.png" alt="AtliTrack" width={830} height={600} />
                </div>
            </div>
            </div>
        
    )
}
