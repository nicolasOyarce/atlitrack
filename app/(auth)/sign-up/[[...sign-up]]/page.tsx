"use client"

import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useStudent } from "@/hooks/students/useStudentConf"
import { useRouter } from "next/navigation"
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { studentFormSchema } from "./FormAddStudent.form"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
  } from "@/components/ui/form";
import { useAuth } from "@/app/api/auth/login/route"
import Link from "next/link"
  
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
    } else if(values.password != values.repit_password) {
        alert("Por favor verifique que las contraseñas sean iguales");
        return;
    } else {
        console.log(values.password)
        console.log(values.email)
        await createStudentUser(values)
        await login(values.email, values.password)

        router.push("/dashboard/student")
    }
    }catch (error) {
        console.error("Error:", error);
        }
    
  }

  return (
    <Form {...form} >
    <div className="flex items-center justify-center min-h-[90vh]">
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex-1 space-y-4 w-full max-w-md p-8">
        <div>
        <Label htmlFor="" className="text-4xl text-slate-500 font-bold pl-2">Registrate aquí!</Label>
        <br />
        <Label htmlFor="" className="text-2xl text-slate-400 font-bold pl-2">como alumno</Label>
        </div>
        <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="p-2 text-xl text-slate-500">Correo electronico</FormLabel>
                <FormControl>
                  <Input placeholder="Jhon@example.com" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
        <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="p-2 text-xl text-slate-500">Contraseña</FormLabel>
                <FormControl>
                  <Input placeholder="*****" {...field} type="password"/>
                </FormControl>
              </FormItem>
            )}
          />
        <FormField
            control={form.control}
            name="repit_password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="p-2 text-xl text-slate-500">Repetir Contraseña</FormLabel>
                <FormControl>
                  <Input placeholder="*****" {...field} type="password"/>
                </FormControl>
              </FormItem>
            )}
          />
        
        <div className="">
          <Button type="submit" className="w-full text-lg p-8 font-semibold" >
          Registrarse
        </Button>
        </div>
        <div>
          <Label>¿Ya tienes una cuenta? <Link href="/sign-in" className="text-green-600 hover:text-green-800">Iniciar sesión</Link></Label>
        </div>
        
      </form>
    </div>
    </Form>
  )
}