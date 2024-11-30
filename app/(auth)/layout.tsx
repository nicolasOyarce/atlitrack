import React from 'react';
import Image from 'next/image';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className='bg-gray-950'>
            <div className='grid lg:grid-cols-2'>
                <div className='bg-slate-200 items-center justify-center bg-transparent'>
                    {children}
                </div>
                <div className='hidden lg:flex h-full justify-center items-center lg:flex-col bg-green-500 relative rounded-tl-full'>
                    <Image src="/images/boxing.png" alt="Overlay Image" width={549} height={650} />
                </div>
            </div>
        </div>
    );
}
