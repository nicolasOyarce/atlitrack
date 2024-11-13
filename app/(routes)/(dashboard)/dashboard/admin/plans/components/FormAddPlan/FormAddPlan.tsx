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
import { planFormSchema } from "./FormAddPlan.form";
import { usePlan } from "@/hooks/usePlan";
import DisciplineSelect from '@/components/ui/SelectDisciplina'
import { useDiscipline } from "@/hooks/useDiscipline";


type Plan = {
    plan_id: number;
    discipline_id: string;
    plan_name: string;
    description: string;
    classes_quantity: number;
    duration: number;
    price: number;
    is_active: boolean;
  };

export function PlanForm({ editingId, setEditingId, setOpenDialog }: { editingId: number | null, setEditingId: React.Dispatch<React.SetStateAction<number | null>>, setOpenDialog: React.Dispatch<React.SetStateAction<boolean>> }) {
  const { plans, isLoading, createPlans, updatePlans, deletePlans } = usePlan();
  const { disciplines } = useDiscipline();
  const [selectedDiscipline, setSelectedDiscipline] = useState<string>('');
  const form = useForm<z.infer<typeof planFormSchema>>({
    resolver: zodResolver(planFormSchema),
    defaultValues: {
      discipline_id: "",
      plan_name: "",
      description: "",
      classes_quantity: "",
      duration: "",
      price: "",
      is_active: true
    },
  });
 
  useEffect(() => {
    if (editingId) {
       
        const plan = plans.find((d: Plan) => d.plan_id === editingId);

        if (plan) {
            console.log('Plan data for form:', plan);
            form.reset({
              discipline_id: plan.discipline_id,
              plan_name: plan.plan_name,
              description: plan.description,
              classes_quantity: plan.classes_quantity.toString(),
              duration: plan.duration.toString(),
              price: plan.price.toString(),
              is_active: true
            });
        }
    } else {
        form.reset({
          discipline_id: "",
          plan_name: "",
          description: "",
          classes_quantity: "",
          duration: "",
          price: "",
          is_active: true
        });
    }
  }, [editingId, plans]);

   

  const onSubmit = async (values: z.infer<typeof planFormSchema>) => {
      try {
      if (editingId) {
          console.log("id::",editingId)
          console.log("data::", values)
          await updatePlans({ id: editingId, data: values });
          
          setEditingId(null);
      } else {
          await createPlans(values);
      }
      setOpenDialog(false)
      form.reset();
      } catch (error) {
      console.error("Error:", error);
      }
    };
  
  const handleEdit = (plan: Plan) => {
      setEditingId(plan.plan_id);
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
                <FormLabel>Selecciona disciplina</FormLabel>
                <FormControl>
                <DisciplineSelect
                  disciplines={disciplines}
                  value={selectedDiscipline}
                  onValueChange={setSelectedDiscipline}
                />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="plan_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nombre Plan</FormLabel>
                <FormControl>
                  <Input placeholder="Box Mensual 1" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Descripción</FormLabel>
                <FormControl>
                  <Input placeholder="Plan de box mensual" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="classes_quantity"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Cantidad de clases</FormLabel>
                <FormControl>
                  <Input placeholder="Box" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="duration"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Duración (días)</FormLabel>
                <FormControl>
                  <Input placeholder="30" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Precio</FormLabel>
                <FormControl>
                  <Input placeholder="10000" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="is_active"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Activo</FormLabel>
                <FormControl>
                  True
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        <div className="space-x-4">
          <Button type="submit" className="w-full lg:w-auto">
            {editingId ? "Actualizar Plan" : "Crear Plan"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
