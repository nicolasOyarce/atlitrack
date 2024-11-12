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
import { disciplineFormSchema } from "./FormAddDiscipline.form";
import { useDiscipline } from "@/hooks/useDiscipline";
import { useTrainers } from "@/hooks/useTrainer";
import { TrainerSelect } from "@/components/ui/TrainerSelect";


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
  const handleSelectTrainer = (trainerId: string) => {
    setSelectedTrainer(trainerId);
    console.log(`Entrenador seleccionado: ${trainerId}`);
};
  useEffect(() => {
    if (editingId) {
        console.log('Editing trainer with ID:', editingId);
        
        const discipline = disciplines.find((d: Discipline) => d.discipline_id === editingId);
        console.log('Discipline found:', discipline);
        console.log("Trainer ID en el formulario:", form.getValues("trainer_id"));
        console.log(selectedTrainer)
        if (discipline) {
            console.log('Discipline data for form:', discipline);
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
  }, [editingId, disciplines]);

   

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
  
  const handleEdit = (discipline: Discipline) => {
      setEditingId(discipline.discipline_id);
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
          <FormField
            control={form.control}
            name="trainer_id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nombre Entrenador</FormLabel>
                <FormControl>
                <TrainerSelect 
                  trainers={trainers}
                  selectedTrainer={field.value}       // Pasa el valor actual de trainer_id
                  onSelect={field.onChange}  
              />

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
