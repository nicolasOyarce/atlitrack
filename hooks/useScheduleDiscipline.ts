"use client";

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { scheduleDisciplineService, ScheduleDiscipline } from '@/services/schedule_discipline.service';
import { toast } from 'sonner';

export const useScheduleDiscipline = () => {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ['schedule_discipline'],
    queryFn: async () => {
      console.log('Iniciando fetch de schedule disc');
      try {
        const response = await scheduleDisciplineService.getAll();
        console.log('Respuesta de disciplines:', response);
        return response;
      } catch (error) {
        console.error('Error en fetch de schedule disciplines:', error);
        throw error;
      }
    }
  });

  const createMutation = useMutation({
    mutationFn: (data: Partial<ScheduleDiscipline>) => scheduleDisciplineService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['schedule_discipline'] });
      toast.success('Schedule Disciplines creado exitosamente');
    },
    onError: (error: Error) => {
      toast.error(error.message);
    }
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<ScheduleDiscipline> }) =>
      scheduleDisciplineService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['schedule_discipline'] });
      toast.success('Disciplines actualizado exitosamente');
    },
    onError: (error: Error) => {
      toast.error(error.message);
    }
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => scheduleDisciplineService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['schedule_discipline'] });
      toast.success('Schedule Disciplines eliminado exitosamente');
    },
    onError: (error: Error) => {
      toast.error(error.message);
    }
  });

  return {
    scheduleDisciplines: query.data?.schedule_discipline || [], 
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    createScheduleDisciplines: createMutation.mutate,
    updateScheduleDisciplines: updateMutation.mutate,
    deleteScheduleDisciplines: deleteMutation.mutate
  };
};