"use client"

import { useAuth } from "@/app/api/auth/login/route"
import { useState } from "react"
import Image from "next/image"
import Link from 'next/link';


export default function LoginPage() {
  const { login, isLoading } = useAuth()
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  })
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMessage("");
    if (!formData.username || !formData.password) {
      alert("Por favor completa todos los campos");
      return;
    }
    try {
      await login(formData.username, formData.password)
    } catch (error) {
      console.error(error)
      setErrorMessage("Error de autenticación. Verifica tus credenciales.");
    }
  }

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 flex items-center justify-center">
      <div className="w-full max-w-screen-md bg-gray-950 shadow sm:rounded-lg p-6 sm:p-12">
        <div className="flex flex-col items-center">
          <Image src="logo.svg" alt="Company Logo" className="mb-8" width={290} height={290} />
          <h1 className="text-5xl font-bold text-white mb-2">Iniciar Sesión</h1>
          <h3 className="text-lg text-gray-400">Bienvenido a AtliTrack</h3>

          
          <div className="my-12 border-b text-center">
              <div
                className="leading-none px-2 inline-block text-sm text-gray-400 tracking-wide font-medium bg-gray-950 transform translate-y-1/2">
                Ingresa tus credenciales
              </div>
            </div>

          <form onSubmit={handleSubmit} className="w-full max-w-md space-y-6">
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
              ¿Olvidaste tu contraseña?
            </a>

            <button
              type="submit"
              className="w-full py-4 rounded-lg font-semibold bg-green-500 text-white hover:bg-green-600 transition-all duration-300 ease-in-out focus:outline-none focus:shadow-outline"
              disabled={isLoading}
            >
              {isLoading ? "Iniciando sesión..." : "Iniciar sesión"}
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