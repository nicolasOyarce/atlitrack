"use client";

import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { boolean, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { studentFormSchema } from "./FormStudent.form";
import GenericSelect from "@/components/ui/GenericSelect";
import { useStudent } from "@/hooks/students/useStudentConf";
import { he } from "date-fns/locale";
import GenericDateInput from "@/components/ui/GenericDateInput";


type Student = {
  user_id: string;
  first_name: string;
  last_name: string;
  genre: string;
  email: string;
  phone: string;
  password: string;
  birthdate: string;
  weight: string;
  height: string;
  };

export function AdminForm({ editingId, setEditingId }: { editingId: string | null, setEditingId: React.Dispatch<React.SetStateAction<string | null>> }) {
  const {user, updateStudentUser, isLoading } = useStudent()
  const [isActive, setIsActive] = useState<boolean>(true);
  
  const toggleActive = () => {
    setIsActive(prevState => !prevState); // Alterna el valor entre true/false
  };
  const form = useForm<z.infer<typeof studentFormSchema>>({
    resolver: zodResolver(studentFormSchema),
    defaultValues: {
          first_name: user?.first_name || "",
          last_name: user?.last_name || "",
          genre: user?.genre || "",
          email: user?.email || "",
          phone: user?.phone || "", 
          password: user?.password || "", 
          birthdate: user?.birthdate || "", 
          weight: user?.weight || "",
          height: user?.height || "", 
        },
  });
  
  useEffect(() => {
    if (editingId && user) {
        console.log(user)
        if (user) {
            const formData= {
              first_name: user.first_name, 
              last_name: user.last_name,
              genre: user.genre,
              email: user.email,
              phone: user?.phone, 
              password: user.password, 
              birthdate: user.birthdate, 
              weight: user.weight,
              height: user.height,
        };
            form.reset(formData);
      } }
      }   ,[editingId, user, form]);
     
  



  const onSubmit = async (values: z.infer<typeof studentFormSchema>) => {
      try {
      if (editingId) {
          await updateStudentUser({ id: editingId, data: values });
          setEditingId(null);
      } }
      catch (error) {
      console.error("Error:", error);
      }
    };
  

  if (isLoading) return <div>Cargando...</div>;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid gap-6 lg:grid-cols-2">
          <FormField
            control={form.control}
            name="first_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nombre</FormLabel>
                <FormControl>
                  <Input placeholder="Jhon" {...field} disabled={!editingId}/>
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="last_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Apellido</FormLabel>
                <FormControl>
                  <Input placeholder="Doe" {...field} disabled={!editingId}/>
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="genre"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Sexo</FormLabel>
                <FormControl>
                  <Input placeholder="M" {...field} disabled={!editingId}/>
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Correo electronico</FormLabel>
                <FormControl>
                  <Input placeholder="email@example.com" {...field} disabled={!editingId}/>
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Teléfono</FormLabel>
                <FormControl>
                  <Input placeholder="9 9898989" {...field} disabled={!editingId}/>
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Contraseña</FormLabel>
                <FormControl>
                  <Input placeholder="*******" {...field} disabled={!editingId} type="password"/>
                </FormControl>
              </FormItem>
            )}
          />
          <GenericDateInput
            name="birthdate"
            label="Fecha de nacimiento"
            control={form.control}
          />
          <FormField
            control={form.control}
            name="weight"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Peso (kg)</FormLabel>
                <FormControl>
                  <Input placeholder="70" {...field} disabled={!editingId}/>
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="height"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Altura  (cm)</FormLabel>
                <FormControl>
                  <Input placeholder="170" {...field} disabled={!editingId}/>
                </FormControl>
              </FormItem>
            )}
          />

        </div>
        {editingId && ( 
        <div className="space-x-4">
          <Button type="submit" className="w-full lg:w-auto">
          Guardar cambios
          </Button>
        </div>
        )}
      </form>
    </Form>
  );
}
