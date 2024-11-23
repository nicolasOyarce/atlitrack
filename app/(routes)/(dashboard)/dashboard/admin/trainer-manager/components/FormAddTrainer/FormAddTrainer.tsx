"use client";

import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
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
import { trainerFormSchema } from "./FormAddTrainer.form";
import { useTrainers } from "@/hooks/useTrainer";
import { UUID } from "crypto";


type Trainer = {
    user_id:string;
    first_name: string;
    last_name: string;
    genre: string;
    email: string;
    phone: string;
    password: string;
    rut: string;
    salary: string;
};

export function TrainerForm({ editingId, setEditingId, setOpenDialog }: { editingId: string | null, setEditingId: React.Dispatch<React.SetStateAction<string | null>>, setOpenDialog: React.Dispatch<React.SetStateAction<boolean>> }) {
    const { trainers, isLoading, createTrainers, updateTrainers, deleteTrainers } = useTrainers();

  const form = useForm<z.infer<typeof trainerFormSchema>>({
    resolver: zodResolver(trainerFormSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      genre: "",
      email: "",
      phone: "",
      password: "",
      rut: "",
      salary: "",
    },
  });
  
  useEffect(() => {
    if (editingId) {
        console.log('Editing trainer with ID:', editingId);
        
        const trainer = trainers.find((t: Trainer) => t.user_id === editingId); 
        console.log('Trainer:', trainer);
        
        if (trainer) {
            console.log('Found trainer:', trainer);
            form.reset({
              first_name: trainer.first_name,
              last_name: trainer.last_name,
              genre: trainer.genre,
              email: trainer.email,
              phone: trainer.phone.toString(),
              password: trainer.password,
              rut: trainer.rut,
              salary: trainer.salary.toString(),
            });
        }
    } else {
        form.reset({
          first_name: "",
          last_name: "",
          genre: "",
          email: "",
          phone: "",
          password: "",
          rut: "",
          salary: "",
        });
    }
      // Only reset when editingId changes
  }, [editingId, trainers]);
    
    const onSubmit = async (values: z.infer<typeof trainerFormSchema>) => {
        try {
        if (editingId) {
            console.log("id::",editingId)
            console.log("data::", values)
            await updateTrainers({ id: editingId, data: values });
            
            setEditingId(null);
        } else {
            await createTrainers(values);
        }
        setOpenDialog(false)
        form.reset();
        } catch (error) {
        console.error("Error:", error);
        }
    };

    const handleEdit = (trainer: Trainer) => {
        setEditingId(trainer.user_id);
    };

    const handleDelete = async (id: string) => {
        if (window.confirm("¿Estás seguro de eliminar este Entrenador?")) {
        await deleteTrainers(id);
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
                  <Input placeholder="Jhon" {...field} />
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
                  <Input placeholder="Doe" {...field} />
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
                  <Input placeholder="M" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Correo electrónico</FormLabel>
                <FormControl>
                  <Input placeholder="Jhon@example.com" {...field} />
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
                  <Input placeholder="9 898989" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input placeholder="********" type="password" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="rut"
            render={({ field }) => (
              <FormItem>
                <FormLabel>RUT</FormLabel>
                <FormControl>
                  <Input placeholder="XX.XXX.XXX-X" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="salary"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Salario</FormLabel>
                <FormControl>
                  <Input placeholder="10000" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          
        </div>
        <div className="space-x-4">
          <Button type="submit" className="w-full lg:w-auto">
            {editingId ? "Actualizar Entrenador" : "Crear Entrenador"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
