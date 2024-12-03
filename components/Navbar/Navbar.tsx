"use client";
import { Button } from "@/components/ui/button";
import { User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function Navbar() {

  return (
    <div className="max-w-5xl py-5 mx-auto ">
      <div className="justify-between lg:flex">
        <Link href="/" className="flex items-center justify-center gap-x-1">
          <Image src="/logo.svg" alt="TarreCars" width={50} height={50} />
          <span className="text-xl font-bold text-white">AtliTrack</span>
        </Link>

        <div className="flex items-center justify-center gap-x-7 text-white">
          <Link href="/#home-first" className="font-semibold">Inicio</Link>
          <Link href="/plans" className="font-semibold">Planes</Link>
          <Link href="/#home-sportcenters" className="font-semibold">Centros Deportivos</Link>
          <Link href="/#home-contact" className="font-semibold">Contactanos</Link>
          <Link href="/sign-in" className="flex">
            <Button variant={"at"}>
              Iniciar Sesión
              <User className="w-4 h-4" />
            </Button>
          </Link>
          <Link href="/sign-up" className="flex">
            <Button variant={"at"}>
              Registrarse
              <User className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}