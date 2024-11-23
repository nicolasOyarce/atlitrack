"use client"

import React, { useState, useEffect } from "react";
import { useSchedule } from "@/hooks/useSchedule";
import { format, startOfWeek, addDays } from "date-fns";
import { es } from 'date-fns/locale';
import { useDiscipline } from "@/hooks/useDiscipline";
import { useScheduleDiscipline } from "@/hooks/useScheduleDiscipline";


interface Schedule {
  schedule_id: number;
  date: string;
  time: string;
  student: string;
  student_email: string;
  plan_name: string;
  discipline_name: string;
}

interface GroupedSchedule {
  [date: string]: Schedule[];
}
const groupSchedulesByDate = (schedules: Schedule[]): GroupedSchedule => {
  return schedules.reduce((acc, schedule) => {
    const { date } = schedule;
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(schedule);
    return acc;
  }, {} as GroupedSchedule);
};


const Calendar: React.FC = () => {
  const { schedules, isLoading, error } = useSchedule();
  const [groupedSchedules, setGroupedSchedules] = useState<GroupedSchedule>({});
  const [currentWeek, setCurrentWeek] = useState(0);
  const [selectedDiscipline, setSelectedDiscipline] = useState("");
  const [selectedTime, setSelectedTime] = useState(""); // Filtro por horario
  const { disciplines } = useDiscipline();
  
  const { schedules_discipline } = useScheduleDiscipline(selectedDiscipline); // Filtrar horarios por disciplina
  
  // Obtener las fechas de la semana actual
  const getWeekDates = (): { day: string; date: string }[] => {
    const today = new Date();
    const start = startOfWeek(addDays(today, currentWeek * 7), { weekStartsOn: 1 }); // Semana basada en `currentWeek`
    return Array.from({ length: 7 }).map((_, i) => {
      const currentDate = addDays(start, i);
      return {
        day: format(currentDate, "EEEE", { locale: es }), // Día en español
        date: format(currentDate, "yyyy-MM-dd"), // Fecha completa
      };
    });
  };

  // Filtro por disciplina y horario
  const filteredSchedules = Object.keys(groupedSchedules).reduce((acc, date) => {
    const filteredByDiscipline = groupedSchedules[date].filter((schedule) =>
      (selectedDiscipline ? schedule.discipline_name === selectedDiscipline : true) &&
      (selectedTime ? schedule.time.startsWith(selectedTime) : true)
    );
    if (filteredByDiscipline.length) {
      acc[date] = filteredByDiscipline;
    }
    return acc;
  }, {});

  const weekDates = getWeekDates();
  
  useEffect(() => {
    if (schedules?.length) {
      const grouped = groupSchedulesByDate(schedules);
      setGroupedSchedules(grouped);
    }
  }, [schedules]);

  // Filtro de horarios disponibles en la disciplina
  const availableTimes = schedules_discipline
                  ?.filter((schedule: { discipline_id: string; }) => schedule.discipline_id === selectedDiscipline) // Filtra por disciplina
                  .map((schedule: { day_id: any; hour_start_class: any; }) => ({
                    day_id: schedule.day_id,
                    hour_start_class: schedule.hour_start_class
                  })) || [];  
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading schedules.</div>;

  return (
    <div className="calendar-container mx-auto max-w-5xl p-2">
      {/* Filtro de disciplinas */}
      <div className="mb-6">
        <label htmlFor="discipline-filter" className="block text-gray-700 font-medium mb-2">
          Filtrar por Disciplina
        </label>
        <select
          id="discipline-filter"
          value={selectedDiscipline}
          onChange={(e) => setSelectedDiscipline(e.target.value)}
          className="w-full border rounded-md p-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Todas las Disciplinas</option>
          {disciplines?.map((discipline: { discipline_id: React.Key | null | undefined; discipline_name: string | number | bigint | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | Promise<React.AwaitedReactNode> | null | undefined; }) => (
            <option key={discipline.discipline_id} value={discipline.discipline_name}>
              {discipline.discipline_name}
            </option>
          ))}
        </select>
      </div>

      {/* Filtro de horarios disponibles */}
      {selectedDiscipline && availableTimes.length > 0 && (
        <div className="mb-6">
          <label htmlFor="time-filter" className="block text-gray-700 font-medium mb-2">
            Filtrar por Horarios
          </label>
          <select
            id="time-filter"
            value={selectedTime}
            onChange={(e) => setSelectedTime(e.target.value)}
            className="w-full border rounded-md p-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Todos los horarios</option>
            {availableTimes.map((schedule: { day_id: string | number | bigint | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<React.AwaitedReactNode> | null | undefined; hour_start_class: string | number | bigint | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<React.AwaitedReactNode> | null | undefined; }, index: React.Key | readonly string[] | null | undefined) => (
              <option key={index} value={index}>
                {schedule.day_id} {schedule.hour_start_class}
              </option>
            ))}
          </select>
        </div>
      )}

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
        {weekDates.map(({ day, date }) => (
          <div
            key={date}
            className="day-column border rounded-lg shadow-md bg-white p-4"
          >
            {/* Cabecera del Día */}
            <div className="day-header text-center border-b pb-2 mb-4">
              <span className="block text-lg font-semibold text-gray-700 capitalize">
                {day}
              </span>
              <span className="text-sm text-gray-500">{date.slice(8, 10)}</span>
            </div>

            {/* Contenedor de las Horas */}
            <div className="hours-container space-y-2 max-h-80 overflow-y-auto">
              {filteredSchedules[date]?.length ? (
                filteredSchedules[date].map((schedule: { schedule_id: React.Key | null | undefined; time: string | any[]; student: string | number | bigint | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<React.AwaitedReactNode> | null | undefined; discipline_name: string | number | bigint | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<React.AwaitedReactNode> | null | undefined; }) => (
                  <div
                    key={schedule.schedule_id}
                    className="hour bg-blue-100 p-3 rounded-md shadow-md hover:bg-blue-200 transition duration-300"
                  >
                    <span className="block text-gray-800 font-medium">
                      {schedule.time.slice(0, 5)} {/* Hora HH:mm */}
                    </span>
                    <span className="block text-sm text-gray-600">
                      {schedule.student}
                    </span>
                    <span className="block text-xs text-gray-500 italic">
                      {schedule.discipline_name}
                    </span>
                  </div>
                ))
              ) : (
                <div className="no-hours text-center text-gray-400 italic">
                  No hay horarios disponibles
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;
