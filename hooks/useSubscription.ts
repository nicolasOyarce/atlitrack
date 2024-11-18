"use client";

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { subscriptionService, Subscription } from '@/services/subscription.service';
import { toast } from 'sonner';

export const useSubscription = () => {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ['students_sportcenter'],
    queryFn: async () => {
      console.log('Iniciando fetch de subscription');
      try {
        const response = await subscriptionService.getAll();
        console.log('Respuesta de subscription:', response);
        return response;
      } catch (error) {
        console.error('Error en fetch de subsc:', error);
        throw error;
      }
    }
  });

  const createMutation = useMutation({
    mutationFn: (data: Partial<Subscription>) => subscriptionService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['students_sportcenter'] });
      toast.success('Subscription creado exitosamente');
    },
    onError: (error: Error) => {
      toast.error(error.message);
    }
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<Subscription> }) =>
      subscriptionService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['students_sportcenter'] });
      toast.success('Subscription actualizado exitosamente');
    },
    onError: (error: Error) => {
      toast.error(error.message);
    }
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => subscriptionService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['students_sportcenter'] });
      toast.success('Subscription eliminado exitosamente');
    },
    onError: (error: Error) => {
      toast.error(error.message);
    }
  });

  return {
    students_sportcenter: query.data?.students_sportcenter || [], 
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    createSubscription: createMutation.mutate,
    updateSubscription: updateMutation.mutate,
    deleteSubscription: deleteMutation.mutate
  };
};
