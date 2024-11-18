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
import { subscriptionFormSchema } from "./FormAddStudent.form";
import { useSubscription } from "@/hooks/useSubscription";
import GenericSelect from "@/components/ui/GenericSelect";
import { useSportCenters } from "@/hooks/useSportCenters";
import { usePlan } from "@/hooks/usePlan";
import GenericDateInput from "@/components/ui/GenericDateInput";

type Subscription = {
  student_sportcenter_id: number;
  sportcenter_id: string;
  student_id: string;
  subscription_date: string;
  expiration_date: string;
  status: string;
  last_renewal_date: string;
  plan_id: string;
  };

export function SubscriptionForm({ editingId, setEditingId, setOpenDialog }: { editingId: number | null, setEditingId: React.Dispatch<React.SetStateAction<number | null>>, setOpenDialog: React.Dispatch<React.SetStateAction<boolean>> }) {
  const { students_sportcenter, isLoading, createSubscription, updateSubscription } = useSubscription();
  const { sportCenters} = useSportCenters();
  const { plans } = usePlan();

  const form = useForm<z.infer<typeof subscriptionFormSchema>>({
    resolver: zodResolver(subscriptionFormSchema),
    defaultValues: {
      sportcenter_id: "",
      student_id: "",
      subscription_date: "",
      expiration_date: "",
      status: "",
      last_renewal_date: "",
      plan_id: "",
    },
  });

  useEffect(() => {
    if (editingId) {
        const subscription = students_sportcenter.find((s: Subscription) => s.student_sportcenter_id === editingId);

        if (subscription) {
            form.reset({

            });
        }
    } else {
        form.reset({
          sportcenter_id: "",
          student_id: "",
          subscription_date: "",
          expiration_date: "",
          status: "",
          last_renewal_date: "",
          plan_id: "",
        });
    }
  }, [editingId, students_sportcenter, form]);

   

  const onSubmit = async (values: z.infer<typeof subscriptionFormSchema>) => {
      try {
      if (editingId) {
          await updateSubscription({ id: editingId, data: values });
          setEditingId(null);
      } else {
          await createSubscription(values);
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
          <GenericSelect
            data={sportCenters}
            valueKey="id"
            valueKey2="sport_center_name"
            labelKey="sport_center_name"
            name="sportcenter_id"
            label="Centro deportivo"
          />%
          <GenericSelect
            data={plans}
            valueKey="plan_id"
            valueKey2="plan_name"
            labelKey="plan_name"
            name="plan_id"
            label="Plan"
          />
          <GenericDateInput
          name="subscription_date"
          label="Fecha de Enrrolamiento"
          control={form.control}
          required
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
