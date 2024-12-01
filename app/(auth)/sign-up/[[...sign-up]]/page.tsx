"use client"

import React, { useState } from "react"
import { useStudent } from "@/hooks/students/useStudentConf"
import { useRouter } from "next/navigation"
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { studentFormSchema } from "./FormAddStudent.form"
import { useAuth } from "@/app/api/auth/login/route"
import Link from "next/link"
import Image from "next/image"

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    repit_password: ""
  })
  const { login, isLoading } = useAuth()
  const { createStudentUser } = useStudent();
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState("");


  const form = useForm<z.infer<typeof studentFormSchema>>({
    resolver: zodResolver(studentFormSchema),
    defaultValues: {
      email: "",
      password: "",
      repit_password: ""
    },
  });

  const onSubmit = async (values: z.infer<typeof studentFormSchema>) => {
    try {
      console.log(values)
      if (!values.email || !values.password) {
        alert("Por favor completa todos los campos");
        return;
      } else if (values.password != values.repit_password) {
        alert("Por favor verifique que las contraseñas sean iguales");
        return;
      } else {
        console.log(values.password)
        console.log(values.email)
        await createStudentUser(values)
        await login(values.email, values.password)
      }
    } catch (error) {
      console.error("Error:", error);
    }

  }

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 flex items-center justify-center">
      <div className="w-full max-w-screen-md bg-gray-950 shadow sm:rounded-lg p-6 sm:p-12">
        <div className="flex flex-col items-center">
          <Image src="logo.svg" alt="Company Logo" className="mb-8" width={290} height={290} />
          <h1 className="text-5xl font-bold text-white mb-2">Registrate</h1>
          <h3 className="text-lg text-gray-400">Registrate en AtliTrack</h3>


          <div className="my-12 border-b text-center">
            <div
              className="leading-none px-2 inline-block text-sm text-gray-400 tracking-wide font-medium bg-gray-950 transform translate-y-1/2">
              Ingresa tus credenciales
            </div>
          </div>

          <form className="w-full max-w-md space-y-6">
            <div>
              <input
                id="email"
                type="email"
                placeholder="Correo"
                value={formData.username}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, username: e.target.value }))
                }
                disabled={isLoading}
                className="w-full px-8 py-4 rounded-lg font-medium bg-gray-700 border border-gray-600 placeholder-gray-400 text-sm focus:outline-none focus:border-gray-500 focus:bg-gray-600"
              />
            </div>

            <div>
              <input
                id="email"
                type="email"
                placeholder="Repetir Correo"
                value={formData.username}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, username: e.target.value }))
                }
                disabled={isLoading}
                className="w-full px-8 py-4 rounded-lg font-medium bg-gray-700 border border-gray-600 placeholder-gray-400 text-sm focus:outline-none focus:border-gray-500 focus:bg-gray-600"
              />
            </div>

            <div>
              <input
                id="password"
                type="password"
                placeholder="Contraseña"
                value={formData.password}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, password: e.target.value }))
                }
                disabled={isLoading}
                className="w-full px-8 py-4 rounded-lg font-medium bg-gray-700 border border-gray-600 placeholder-gray-400 text-sm focus:outline-none focus:border-gray-500 focus:bg-gray-600"
              />
            </div>
            <a href="#" className="text-sm text-blue-400 hover:underline mt-2 block text-center">
              ¿Ya tienes cuenta?
            </a>

            <button
              type="submit"
              className="w-full py-4 rounded-lg font-semibold bg-green-500 text-white hover:bg-green-600 transition-all duration-300 ease-in-out focus:outline-none focus:shadow-outline"
              disabled={isLoading}
            >
              {isLoading ? "Crear Cuenta..." : "Crear Cuenta"}
            </button>
          </form>


          <div className="mt-6 text-center">
            <Link href="/" className="text-sm text-blue-400 hover:underline">
              Volver al inicio
            </Link>
            <p className="mt-4 text-xs text-gray-400">
              <Link href="#" className="border-b border-gray-500 border-dotted">
                Política de privacidad
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>

  )
}