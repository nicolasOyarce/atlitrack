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
import { scheduleDisciplineFormSchema } from "./FormAddScheduleDiscipline.form";
import { useScheduleDiscipline } from "@/hooks/useScheduleDiscipline";
import GenericSelect from "@/components/ui/GenericSelect";



export function ScheduleDisciplineForm({ editingId, setEditingId, setOpenDialog, discipline_name }: { editingId: number | null, setEditingId: React.Dispatch<React.SetStateAction<number | null>>, setOpenDialog: React.Dispatch<React.SetStateAction<boolean>>, discipline_name: string }) {
  const { scheduleDisciplines, isLoading, createScheduleDisciplines, updateScheduleDisciplines } = useScheduleDiscipline();
  const decodedName = discipline_name ? decodeURIComponent(discipline_name as string) : "";
  const form = useForm<z.infer<typeof scheduleDisciplineFormSchema>>({
    resolver: zodResolver(scheduleDisciplineFormSchema),
    defaultValues: {
        discipline_id: "",
        day_id: "",
        hour_start_class: "",
        hour_end_class: "",
    },
  });

  useEffect(() => {
    if (editingId) {
        const schedule_discipline = scheduleDisciplines.find((d: Discipline) => d.discipline_id === editingId);

        if (schedule_discipline) {
            form.reset({
              discipline_id: schedule_discipline.discipline_id,
              day_id: "",
              hour_start_class: "",
              hour_end_class: "",
            });
        }
    } else {
        form.reset({
          discipline_id: "",
          day_id: "",
          hour_start_class: "",
          hour_end_class: "",
        });
    }
  }, []);

   

  const onSubmit = async (values: z.infer<typeof scheduleDisciplineFormSchema>) => {
      try {
      if (editingId) {
          console.log("id::",editingId)
          console.log("data::", values)
          await updateScheduleDisciplines({ id: editingId, data: values });
          
          setEditingId(null);
      } else {
          await createScheduleDisciplines(values);
      }
      setOpenDialog(false)
      form.reset();
      } catch (error) {
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
            name="discipline_id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Disciplina</FormLabel>
                <FormControl>
                  <p className="text-black text-xl">{decodedName}</p>
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="student_max_quantity"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Cantidad Max. Alumnos</FormLabel>
                <FormControl>
                  <Input placeholder="20" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          
        </div>
        <div className="space-x-4">
          <Button type="submit" className="w-full lg:w-auto">
            {editingId ? "Actualizar Disciplina" : "Crear Disciplina"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
