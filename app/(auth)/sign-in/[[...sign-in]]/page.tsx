"use client"

import { useAuth } from "@/app/api/auth/login/route"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function LoginPage() {
  const { login, isLoading } = useAuth()
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await login(formData.username, formData.password)
    } catch (error) {
      // El error ya es manejado en el contexto
      console.error(error)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center">
      <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-md p-8">
        <Input
          type="email"
          placeholder="Email"
          value={formData.username}
          onChange={(e) => 
            setFormData(prev => ({ ...prev, username: e.target.value }))
          }
          disabled={isLoading}
        />
        <Input
          type="password"
          placeholder="Contraseña"
          value={formData.password}
          onChange={(e) => 
            setFormData(prev => ({ ...prev, password: e.target.value }))
          }
          disabled={isLoading}
        />
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Iniciando sesión..." : "Iniciar sesión"}
        </Button>
      </form>
    </div>
  )
}
