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
import { DaysOptions } from "@/constants/selectOptions";
import { TimeSelector } from "@/components/ui/TimeSelector";

type ScheduleDiscipline = {
  schedule_for_discipline_id: number;
  discipline_id: string;
  day_id: string;
  hour_start_class: string;
  hour_end_class: string;
}
type TimeValue = {
  hour: string;
  minute: string;
};

export function ScheduleDisciplineForm({ editingId, setEditingId, setOpenDialog, discipline_name }: { editingId: number | null, setEditingId: React.Dispatch<React.SetStateAction<number | null>>, setOpenDialog: React.Dispatch<React.SetStateAction<boolean>>, discipline_name: string }) {
  const decodedName = discipline_name ? decodeURIComponent(discipline_name as string) : "";
  const { schedules, isLoading, createScheduleDisciplines, updateScheduleDisciplines } = useScheduleDiscipline(decodedName);
  const [openHour, setOpenHour] = useState<TimeValue>({ hour: "", minute: "" });
  const [closeHour, setCloseHour] = useState<TimeValue>({ hour: "", minute: "" });
  const [selectedDay, setSelectedDay] = useState<string | null>(null);
  const form = useForm<z.infer<typeof scheduleDisciplineFormSchema>>({
    resolver: zodResolver(scheduleDisciplineFormSchema),
    defaultValues: {
        discipline_id: "",
        day_id: "",
        hour_start_class: "",
        hour_end_class: "",
    },
  });
  const parseTime = (time: string): TimeValue => {
    const [hour, minute] = time.split(":");
    return { hour, minute };
  };
  useEffect(() => {
    if (editingId) {
        const schedule_discipline = schedules.find((s: ScheduleDiscipline) => s.schedule_for_discipline_id === editingId);

        if (schedule_discipline) {
            form.reset({
              discipline_id: schedule_discipline.discipline_id,
              day_id: schedule_discipline.day_id,
              hour_start_class: schedule_discipline.hour_start_class,
              hour_end_class: schedule_discipline.hour_end_class,
            }
          );
          setOpenHour(parseTime(schedule_discipline.hour_start_class));
          setCloseHour(parseTime(schedule_discipline.hour_end_class));
        }
    } else {
        form.reset({
          discipline_id: decodedName,
          day_id: "",
          hour_start_class: "",
          hour_end_class: "",
        });
    }
  }, []);

  const formatTime = (time: { hour: string; minute: string }): string => {
    return `${time.hour}:${time.minute}`;
  };
  const handleTimeOpenChange = (newValue: { hour: string; minute: string }) => {
    setOpenHour(newValue);
    form.setValue("hour_start_class", formatTime(newValue));
  };
    
  const handleTimeCloseChange = (newValue: { hour: string; minute: string }) => {
      setCloseHour(newValue);
      form.setValue("hour_end_class", formatTime(newValue));
    }; 

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
          <FormItem>
            <FormLabel>Día</FormLabel>
            <Controller
              name="day_id"
              control={form.control}
              render={({ field }) => (
                <FormControl>
                  <select
                    {...field}
                    className="at-input"
                    onChange={(e) => field.onChange(e.target.value)} // Actualiza el valor en el formulario
                  >
                    <option value="">Selecciona un día</option>
                    {DaysOptions.map((option) => (
                      <option key={option.value} value={option.label}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </FormControl>
              )}
            />
          </FormItem>
          <FormField
            control={form.control}
            name="hour_start_class"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Hora inicio clase</FormLabel>
                <FormControl>
                  <TimeSelector
                    name=""
                    value={openHour}
                    onChange={handleTimeOpenChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="hour_end_class"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Hora fin clase</FormLabel>
                <FormControl>
                  <TimeSelector
                    name=""
                    value={closeHour}
                    onChange={handleTimeCloseChange}
                  />
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
