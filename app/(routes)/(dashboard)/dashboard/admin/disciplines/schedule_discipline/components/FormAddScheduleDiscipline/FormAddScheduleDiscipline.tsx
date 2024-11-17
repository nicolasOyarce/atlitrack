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
import { disciplineFormSchema } from "./FormAddScheduleDiscipline.form";
import { useDiscipline } from "@/hooks/useDiscipline";
import { useTrainers } from "@/hooks/useTrainer";
import { TrainerSelect } from "@/components/ui/TrainerSelect";
import GenericSelect from "@/components/ui/GenericSelect";


type Discipline = {
    discipline_id:number;
    discipline_name: string;
    trainer_id: string;
    student_max_quantity: string;
  };

export function DisciplineForm({ editingId, setEditingId, setOpenDialog }: { editingId: number | null, setEditingId: React.Dispatch<React.SetStateAction<number | null>>, setOpenDialog: React.Dispatch<React.SetStateAction<boolean>> }) {
  const { disciplines, isLoading, createDisciplines, updateDisciplines, deleteDisciplines } = useDiscipline();
  const { trainers } = useTrainers();
  const [selectedTrainer, setSelectedTrainer] = useState<string>("");
  
  const form = useForm<z.infer<typeof disciplineFormSchema>>({
    resolver: zodResolver(disciplineFormSchema),
    defaultValues: {
        discipline_name: "",
        trainer_id: "",
        student_max_quantity: "",
    },
  });

  useEffect(() => {
    if (editingId) {
        const discipline = disciplines.find((d: Discipline) => d.discipline_id === editingId);

        if (discipline) {
            form.reset({
                discipline_name: discipline.discipline_name,
                trainer_id: discipline.trainer_id || selectedTrainer, // Aquí se asegura que trainer_id esté correctamente definido
                student_max_quantity: discipline.student_max_quantity.toString(),
            });
        }
    } else {
        form.reset({
            discipline_name: "",
            trainer_id: "", // Aquí también se usa selectedTrainer para nuevas entradas
            student_max_quantity: "",
        });
    }
  }, [editingId, disciplines, form]);

   

  const onSubmit = async (values: z.infer<typeof disciplineFormSchema>) => {
      try {
      if (editingId) {
          console.log("id::",editingId)
          console.log("data::", values)
          await updateDisciplines({ id: editingId, data: values });
          
          setEditingId(null);
      } else {
          await createDisciplines(values);
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
            name="discipline_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nombre</FormLabel>
                <FormControl>
                  <Input placeholder="Box" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <TrainerSelect trainers={trainers} />
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
