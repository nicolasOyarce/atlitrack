import { Reveal } from "@/components/Reveal";
import Image from "next/image";

export function FirtsBlock() {
    return (
        <div className="grid lg:grid-cols-2 lg:px-10 lg:py-24 items-center ">
            <Reveal className="p-6 lg:pl-40" position="bottom">
                <h1 className="text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold">
                    <span className="block text-green-600">AtliTrack </span>
                </h1>
                <p className="text-lg mt-2 lg:mt-5 lg:text-xl max-w-sm">
                    Potencia tu centro deportivo con el sistema de gestión más completo - ¡Únete ahora y lleva tu administración al siguiente nivel!
                </p>
            </Reveal>
            <Reveal className="flex justify-end pr-52" position="right">
                <Image
                    src="/images/gym.png"
                    alt="AtliTrack"
                    width={400}
                    height={400}
                    priority
                />
            </Reveal>
        </div>
    );
}
