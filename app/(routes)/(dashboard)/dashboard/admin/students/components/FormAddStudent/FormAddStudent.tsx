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
import { StatusSubscriptionOptions } from "@/constants/selectOptions";

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

export function SubscriptionForm({ editingId, setEditingId, setOpenDialog,isRenewalMode, }: { editingId: number | null, setEditingId: React.Dispatch<React.SetStateAction<number | null>>, setOpenDialog: React.Dispatch<React.SetStateAction<boolean>>; isRenewalMode: boolean;}) {
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
      //sport_center_id: "",
    },
  });

  useEffect(() => {
    if (editingId) {
        const subscription = students_sportcenter.find((s: Subscription) => s.student_sportcenter_id === editingId);

        if (subscription) {
            form.reset({
              sportcenter_id: subscription.sportcenter_id,
              student_id: subscription.student_id,
              subscription_date: subscription.subscription_date,
              expiration_date: subscription.expiration_date,
              status: subscription.status,
              last_renewal_date: subscription.last_renewal_date,
              plan_id: subscription.plan_id
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
          //sport_center_id: "",
        });
    }
  }, [editingId, students_sportcenter, form]);

   

  const onSubmit = async (values: z.infer<typeof subscriptionFormSchema>) => {
      try {
        if (isRenewalMode){
          await updateSubscription({ id: editingId, data:{last_renewal_date: values.last_renewal_date, plan_id : values.plan_id }});

        } else if (editingId) {
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
          {!isRenewalMode && (
            <>
                <GenericSelect
                  data={sportCenters}
                  valueKey="sport_center_id"
                  valueKey2="mail"
                  labelKey="sport_center_name"
                  name="sportcenter_id"
                  label="Centro deportivo"
                />
                <FormField
                  control={form.control}
                  name="student_id"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Correo electronico Alumno</FormLabel>
                      <FormControl>
                        <Input placeholder="alumno@email.com" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
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
              <GenericDateInput
                name="expiration_date"
                label="Fecha de Expiracion"
                control={form.control}
                required
              />
            <FormItem>
            <FormLabel>Estado</FormLabel>
            <Controller
              name="status"
              control={form.control}
              render={({ field }) => (
                <FormControl>
                  <select
                    {...field}
                    className="at-input"
                    onChange={(e) => field.onChange(e.target.value)} // Actualiza el valor en el formulario
                  >
                    <option value="">Selecciona un Estado</option>
                    {StatusSubscriptionOptions.map((option) => (
                      <option key={option.value} value={option.label}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </FormControl>
              )}
            />
            </FormItem>
            <GenericDateInput
          name="last_renewal_date"
          label="Fecha ultima renovación"
          control={form.control}
          required
        />
            </>
          )}
          
        {isRenewalMode && (
          <GenericDateInput
          name="last_renewal_date"
          label="Fecha ultima renovación"
          control={form.control}
          required
        />
        )}
                 
        </div>
        <div className="space-x-4">
          <Button type="submit" className="w-full lg:w-auto">
            {editingId ? (isRenewalMode ? "Renovar" : "Actualizar Subscripción") : "Crear Subscripción"}          
          </Button>
        </div>
      </form>
    </Form>
  );
}
