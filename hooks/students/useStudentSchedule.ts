
"use client";
import { 
  studentScheduleService, StudentSchedule, 
  ScheduleStudent, scheduleStudentService,
  scheduleStudentHistorialService, ScheduleStudentHistorial
 } from "@/services/students/schedule.service";
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

export const useStudentSchedule = () => {
  const queryClient = useQueryClient();

  const query = useQuery<StudentSchedule[]>({
    queryKey: ['studentSchedule'],
    queryFn: async () => {
      try {
        const response = await studentScheduleService.getAll();
        console.log('Respuesta de StudentSchedule:', response);
        return response;
      } catch (error) {
        console.error('Error en fetch de StudentSchedule:', error);
        throw error;
      }
    }
  });

  const createMutation = useMutation<unknown, Error, Partial<ScheduleStudent>>({
    mutationFn: (data: Partial<ScheduleStudent>) => scheduleStudentService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['studentSchedule'] });
      toast.success('StudentSchedule creado exitosamente');
    },
    onError: (error: Error) => {
      toast.error(error.message);
    }
  });
  const deleteMutation = useMutation<unknown, Error, number>({
    mutationFn: (id: number) => studentScheduleService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['studentScheduleHistorial'] });
      toast.success('StudentSchedule eliminado exitosamente');
    },
    onError: (error: Error) => {
      toast.error(error.message);
    }
  });

  const query2 = useQuery({
    queryKey: ['studentScheduleHistorial'],
    queryFn: async () => {
      try {
        const response = await scheduleStudentHistorialService.getAll();
        console.log('Respuesta de StudentScheduleHistorial:', response);
        return response;
      } catch (error) {
        console.error('Error en fetch de StudentSchedule:', error instanceof Error ? error.message : error);
        throw error;
      }
    }
  });
  

  return {
    studentSchedule: query.data || [], 
    scheduleHistorial: query2.data || [],
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    createSchedule: createMutation.mutate,
    deleteSchedule: deleteMutation.mutate
  };
};
