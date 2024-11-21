"use client"

import { useAuth } from "@/app/api/auth/login/route"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

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
      // El error ya es manejado en el contexto
      console.error(error)
      setErrorMessage("Error de autenticación. Verifica tus credenciales.");
    }
  }

  return (
    <div className="flex items-center justify-center min-h-[90vh]">
      <form onSubmit={handleSubmit} className="flex-1 space-y-4 w-full max-w-md p-8">
        <div>
          <Label htmlFor="" className="text-4xl text-slate-500 font-bold pl-2">Ingresa aquí!</Label>
        </div>
        <div className="mt-6">
          <Label className="text-xl p-2 text-slate-500">Correo eléctronico</Label>
          <Input
          type="email"
          placeholder="Email"
          value={formData.username}
          onChange={(e) => 
            setFormData(prev => ({ ...prev, username: e.target.value }))
          }
          disabled={isLoading}
        />
        </div>
        <div className="mt-2">
          <Label className="p-2 text-xl text-slate-500">Contraseña</Label>
          <Input
            type="password"
            placeholder="Contraseña"
            value={formData.password}
            onChange={(e) => 
              setFormData(prev => ({ ...prev, password: e.target.value }))
            }
            disabled={isLoading}
          /> 
        </div>
        
        <div className="">
          <Button type="submit" className="w-full text-lg p-8 font-semibold" disabled={isLoading}>
          {isLoading ? "Iniciando sesión..." : "Iniciar sesión"}
        </Button>
        </div>
        
      </form>
    </div>
  )
}