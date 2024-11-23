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
import { adminFormSchema } from "./FormAdmin.form";
import { useAdmin } from "@/hooks/useAdminConf";
import GenericSelect from "@/components/ui/GenericSelect";


type Admin = {
  user_id: string;
  first_name: string;
  last_name: string;
  genre: string;
  email: string;
  phone: string;
  password: string;
  address: string;
  };

export function AdminForm({ editingId, setEditingId }: { editingId: string | null, setEditingId: React.Dispatch<React.SetStateAction<string | null>> }) {
  const {user, updateAdminUser, isLoading } = useAdmin()
  const [isActive, setIsActive] = useState<boolean>(true);
  
  const toggleActive = () => {
    setIsActive(prevState => !prevState); // Alterna el valor entre true/false
  };
  const form = useForm<z.infer<typeof adminFormSchema>>({
    resolver: zodResolver(adminFormSchema),
    defaultValues: {
          first_name: user?.first_name || "",
          last_name: user?.last_name || "",
          genre: user?.genre || "",
          email: user?.email || "",
          phone: user?.phone || "", 
          password: user?.password || "", 
          address: user?.address || "", 
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
              phone: user?.phone.toString(), 
              password: user.password, 
              address: user.address, 
        };
            form.reset(formData);
      } }
      }   ,[editingId, user, form]);
     
  



  const onSubmit = async (values: z.infer<typeof adminFormSchema>) => {
      try {
      if (editingId) {
          await updateAdminUser({ id: editingId, data: values });
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
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Dirección</FormLabel>
                <FormControl>
                  <Input placeholder="Av Nueva 123" {...field} disabled={!editingId}/>
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
