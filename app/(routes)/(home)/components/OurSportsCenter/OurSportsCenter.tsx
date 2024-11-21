import { Button } from "@/components/ui/button";
import { MoveRight } from "lucide-react";
import {
    categoryOurSportsCenter,
    dataFirstBlockOurSportsCenter,
} from "./OurSportsCenter.data";
import Image from "next/image";
import { cn } from "@/lib/utils";
import Link from "next/link";

export function OurSportsCenter() {
    return (
        <div className="max-w-6xl mx-auto text-center py-12 lg:py-40 p-6" id="home-sportcenters">
            <h3 className="text-2xl lg:text-6xl font-bold">Todos los Centros Deportivos</h3>
            <p className="text-lg mt-2 lg:mt-5 lg:text-xl text-center w-full mx-auto max-w-2xl mb-5 lg:mb-10">
                Conoce todos los centros deportivos que tenemos para ti en todo el país.
            </p>
            <div className="grid grid-cols-2 lg:grid-cols-6 gap-4 items-center justify-center mb-5 max-w-2xl mx-auto">
                {categoryOurSportsCenter.map(({ name, active }) => (
                    <div
                        key={name}
                        className={cn(
                            "rounded-xl py-2 px-3",
                            active ? "bg-gray-900 text-white" : "bg-slate-500"
                        )}
                    >
                        {name}
                    </div>
                ))}
            </div>
            <div className="mb-10 pt-5">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {dataFirstBlockOurSportsCenter.map(({ url, name, professor, time }) => (
                        <div key={url} className="flex flex-col">
                            <div className="relative w-full aspect-[4/3] overflow-hidden rounded-xl mb-4">
                                <Image
                                    src={`/images/sportsCenters/${url}`}
                                    alt={`Centro deportivo ${name}`}
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                />
                            </div>
                            <div className="flex flex-col space-y-2 px-2">
                                <p className="text-green-600">Profesor {professor}</p>
                                <h3 className="font-bold text-lg">Centro deportivo {name}</h3>
                                <p className="text-gray-600">Horario: {time}</p>
                            </div>
                            <div className="flex justify-center mt-4 px-2">
                                <Button className="bg-green-600 hover:bg-green-700 text-white">
                                    Ver más
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <Link href="/sportsCenters">
                <Button className="rounded-xl p-6 text-lg mt-5 text-green-600 bg-gray-900" variant="outline">
                    Ver todos los centros deportivos
                    <MoveRight className="ml-2" />
                </Button>
            </Link>
        </div>
    );
}