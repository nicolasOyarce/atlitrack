"use client";
import { Button } from "@/components/ui/button";
import { User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function Navbar() {

  return (
    <div className="max-w-5xl py-5 mx-auto ">
      <div className="justify-between lg:flex">
        <Link href="/" className="flex items-center justify-center gap-x-2">
          <Image src="/logo.svg" alt="TarreCars" width={50} height={50} />
          <span className="text-xl font-bold">AtliTrack</span>
        </Link>

        <div className="flex items-center justify-center gap-x-7">
          <Link href="/#home-first" className="font-semibold">Inicio</Link>
          <Link href="/dashboard" className="font-semibold">Planes</Link>
          <Link href="/#home-sportcenters" className="font-semibold">Centros Deportivos</Link>
          <Link href="/#home-contact" className="font-semibold">Contactanos</Link>
          <Link href="/sign-in" className="flex gap-x-3">
            <Button variant={"at"}>
              Iniciar sesión
              <User className="ml-2 w-4 h-4" />
            </Button>
          </Link>
          <Link href="/sign-up" className="flex gap-x-3">
            <Button variant={"at"}>
              Registrarse
              <User className="ml-2 w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}