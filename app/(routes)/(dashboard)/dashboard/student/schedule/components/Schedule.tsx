"use client";

import React, { useState, useMemo, useEffect } from "react";
import { format, startOfWeek, addDays } from "date-fns";
import { es } from "date-fns/locale";
import { useStudentSchedule } from "@/hooks/students/useStudentSchedule";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { scheduleStudentFormSchema } from "./FormAddScheduleStudente.form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";


const Calendar: React.FC = () => {
  const { studentSchedule, createSchedule,isLoading, error } = useStudentSchedule();
  const [currentWeek, setCurrentWeek] = useState(0);
  const [selectedSchedule, setSelectedSchedule] = useState<{
    student_sportcenter_id: number;
    plan_name: string;
    discipline_name: string;
    hour_start: string;
    hour_end: string;
    trainer: string;
    date: string;
  } | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleOpenModal = (schedule: {
    student_sportcenter_id: number;
    plan_name: string;
    discipline_name: string;
    hour_start: string;
    hour_end: string;
    trainer: string;
    date: string;
  }) => {
    setSelectedSchedule(schedule);
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setSelectedSchedule(null);
    setIsModalOpen(false);
  };
  const {setValue, watch, ...form} = useForm<z.infer<typeof scheduleStudentFormSchema>>({
    resolver: zodResolver(scheduleStudentFormSchema),
    defaultValues: {
        student_sportcenter_id:0,
        date: "",
        time: ""
    },
  });
  useEffect(() => {
    if (selectedSchedule?.date) {
      setValue("date", selectedSchedule.date); // Actualiza el campo 'date'
    }
    if (selectedSchedule?.hour_start) {
      setValue("time", selectedSchedule.hour_start)
    }
    if (selectedSchedule?.student_sportcenter_id) {
      setValue("student_sportcenter_id", selectedSchedule.student_sportcenter_id)
    }
  }, [selectedSchedule, setValue]);

  // Obtener las fechas de la semana actual
  const getWeekDates = (): { day: string; date: string }[] => {
    const today = new Date();
    const start = startOfWeek(addDays(today, currentWeek * 7), { weekStartsOn: 1 });
    return Array.from({ length: 7 }).map((_, i) => {
      const currentDate = addDays(start, i);
      return {
        day: format(currentDate, "EEEE", { locale: es }),
        date: format(currentDate, "yyyy-MM-dd"),
      };
    });
  };

  const weekDates = getWeekDates();
  // Calcular horarios disponibles
  const availableTimes = useMemo(() => {
    if (!studentSchedule) return [];
    return studentSchedule.map((schedule) => ({
      student_sportcenter_id: schedule.student_sportcenter_id,
      plan_name: schedule.plan_name,
      discipline_name: schedule.discipline_name,
      day: schedule.day,
      hour_start: schedule.hour_start,
      hour_end: schedule.hour_end,
      trainer: schedule.trainer,
    }));
  }, [studentSchedule]);
  const getFilteredTimesForDay = (day: string) => { 
    return availableTimes.filter((time: { day: string; }) => time.day === day);
  };

  const onSubmit = async (values: z.infer<typeof scheduleStudentFormSchema>) => {
    try {
        await createSchedule(values);
        handleCloseModal()
        form.reset();
    } catch (error) {
    console.error("Error:", error);
    }
  };
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading schedules.</div>;
  return (
    <div className="calendar-container mx-auto max-w-5xl p-2">
      {/* Navegación de semanas */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => setCurrentWeek((prev) => prev - 1)}
          className="text-gray-500 hover:text-gray-800 hover:bg-slate-200 p-2 rounded-xl transition duration-300"
        >
          &#8592; Semana Anterior
        </button>
        <button
          onClick={() => setCurrentWeek((prev) => prev + 1)}
          className="text-gray-500 hover:text-gray-800 hover:bg-slate-200 p-2 rounded-xl transition duration-300"
        >
          Semana Siguiente &#8594;
        </button>
      </div>

      {/* Contenedor de los Días */}
      <div className="days-container grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-4">
        {weekDates.map(({ day, date }) => {
          const timesForDay = getFilteredTimesForDay(day);
          return (
            <div
              key={date}
              className="day-column border rounded-lg shadow-md bg-white p-4"
            >
              {/* Cabecera del Día */}
              <h3 className="text-lg font-semibold text-gray-800">{day}</h3>
              <p className="text-sm text-gray-600">{date}</p>

              {/* Contenedor de las Horas */}
              <div className="hours-container space-y-2 max-h-80 overflow-y-auto">
                {timesForDay.length > 0 ? (
                  timesForDay.map((time) => (
                    <div
                      key={`${time.plan_name}-${time.hour_start}`}
                      className="hour bg-blue-100 p-3 rounded-md shadow-md hover:bg-blue-200 transition duration-300"
                    >
                      <span className="block text-gray-800 font-medium">
                        {time.plan_name}
                      </span>
                      <span className="block text-sm text-gray-700 font-medium">
                        {time.discipline_name}
                      </span>
                      <span className="block text-xs text-gray-500 italic">
                        {time.hour_start} - {time.hour_end}
                      </span>
                      <span className="block text-xs text-gray-500 italic">
                        Entrenador: {time.trainer}
                      </span>
                      <Dialog>
                      <DialogTrigger asChild>
                        <button
                          className="rounded-3xl w-full bg-blue-500 text-white py-2 mt-2 hover:bg-blue-600 transition duration-300"
                          onClick={() => setSelectedSchedule({...time, date})}
                        >
                          Agendar
                                </button>
                      </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Confirmar Agendamiento</DialogTitle>
                            <DialogDescription>
                              <Form {...form}>
                                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
                                <div className="grid gap-6 lg:grid-cols-2">
                                  
                                  <FormField
                                    control={form.control}
                                    name="date"
                                    render={({ field }) => (
                                      <FormItem>
                                        <FormLabel className="text-slate-500 font-semibold">Fecha</FormLabel>
                                        <FormControl>
                                          <input
                                            {...field}
                                            type="text"
                                            readOnly
                                            className="block w-full bg-gray-100 text-gray-700 p-2 rounded-md"
                                          />
                                        </FormControl>
                                      </FormItem>
                                      )}
                                      />
                                      <FormField
                                        control={form.control}
                                        name="time"
                                        render={({ field }) => (
                                      <FormItem>
                                        <FormLabel className="text-slate-500 font-semibold">Hora</FormLabel>
                                        <FormControl>
                                          <input
                                            {...field}
                                            type="text"
                                            readOnly
                                            className="block w-full bg-gray-100 text-gray-700 p-2 rounded-md"
                                          />
                                        </FormControl>
                                      </FormItem>
                                      )}
                                      />
                                      <FormField
                                        control={form.control}
                                        name="student_sportcenter_id"
                                        render={({ field }) => (
                                      <FormItem> 
                                        <FormLabel className="text-slate-500 font-semibold">ID Subscripción</FormLabel>
                                        <FormControl>
                                          <input
                                            {...field}
                                            type="text"
                                            readOnly
                                            className="block w-full bg-gray-100 text-gray-700 p-2 rounded-md"
                                          />
                                        </FormControl>
                                      </FormItem>
                                      )}
                                      />
                                    </div>
                                  <Button
                                    type="submit"
                                    className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600"
                                  >
                                    Confirmar
                                  </Button>
                                </form>
                              </Form>
                            </DialogDescription>
                          </DialogHeader>
                        </DialogContent>
                      </Dialog>
                    </div>
                    
                  )
                )
                ) : (
                  <div className="no-hours text-center text-gray-400 italic">
                    No hay horarios disponibles
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Calendar;
