"use client";

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { trainerService,trainerSportcenterService, Trainer, TrainerSportcenter } from '@/services/trainer.service';
import { toast } from 'sonner';

export const useTrainers = () => {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ['trainers'],
    queryFn: async () => {
      console.log('Iniciando fetch de trainers');
      try {
        const response = await trainerService.getAll();
        console.log('Respuesta de trainers:', response);
        return response;
      } catch (error) {
        console.error('Error en fetch de trainers:', error);
        throw error;
      }
    }
  });

  const createMutation = useMutation({
    mutationFn: (data: Partial<Trainer>) => trainerService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['trainers'] });
      toast.success('Trainer creado exitosamente');
    },
    onError: (error: Error) => {
      toast.error(error.message);
    }
  });

  const createMutationJoin = useMutation({
    mutationFn: (data: Partial<TrainerSportcenter>) => trainerSportcenterService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['trainerSporcenter'] });
      toast.success('Trainer creado exitosamente');
    },
    onError: (error: Error) => {
      toast.error(error.message);
    }
  });



  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Trainer> }) =>
      trainerService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['trainers'] });
      toast.success('Trainer actualizado exitosamente');
    },
    onError: (error: Error) => {
      toast.error(error.message);
    }
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => trainerService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['trainers'] });
      toast.success('Trainer eliminado exitosamente');
    },
    onError: (error: Error) => {
      toast.error(error.message);
    }
  });

  return {
    trainers: query.data?.trainers || [], 
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    createTrainers: createMutation.mutate,
    createTrainerSportcenter: createMutationJoin.mutate,
    updateTrainers: updateMutation.mutate,
    deleteTrainers: deleteMutation.mutate
  };
};
