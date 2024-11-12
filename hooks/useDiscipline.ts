"use client";

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { disciplineService, Discipline } from '@/services/discipline.service';
import { toast } from 'sonner';

export const useDiscipline = () => {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ['disciplines'],
    queryFn: async () => {
      console.log('Iniciando fetch de trainers');
      try {
        const response = await disciplineService.getAll();
        console.log('Respuesta de disciplines:', response);
        return response;
      } catch (error) {
        console.error('Error en fetch de disciplines:', error);
        throw error;
      }
    }
  });

  const createMutation = useMutation({
    mutationFn: (data: Partial<Discipline>) => disciplineService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['disciplines'] });
      toast.success('Disciplines creado exitosamente');
    },
    onError: (error: Error) => {
      toast.error(error.message);
    }
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<Discipline> }) =>
      disciplineService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['disciplines'] });
      toast.success('Disciplines actualizado exitosamente');
    },
    onError: (error: Error) => {
      toast.error(error.message);
    }
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => disciplineService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['disciplines'] });
      toast.success('Disciplines eliminado exitosamente');
    },
    onError: (error: Error) => {
      toast.error(error.message);
    }
  });

  return {
    disciplines: query.data?.disciplines || [], 
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    createDisciplines: createMutation.mutate,
    updateDisciplines: updateMutation.mutate,
    deleteDisciplines: deleteMutation.mutate
  };
};
