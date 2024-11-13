"use client";

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { planService, Plan } from '@/services/plan.service';
import { toast } from 'sonner';

export const usePlan = () => {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ['plans'],
    queryFn: async () => {
      console.log('Iniciando fetch de planes');
      try {
        const response = await planService.getAll();
        console.log('Respuesta de plans:', response);
        return response;
      } catch (error) {
        console.error('Error en fetch de plans:', error);
        throw error;
      }
    }
  });

  const createMutation = useMutation({
    mutationFn: (data: Partial<Plan>) => planService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['plans'] });
      toast.success('Plan creado exitosamente');
    },
    onError: (error: Error) => {
      toast.error(error.message);
    }
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<Plan> }) =>
      planService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['plans'] });
      toast.success('Plan actualizado exitosamente');
    },
    onError: (error: Error) => {
      toast.error(error.message);
    }
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => planService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['plans'] });
      toast.success('Plan eliminado exitosamente');
    },
    onError: (error: Error) => {
      toast.error(error.message);
    }
  });

  return {
    plans: query.data?.plans || [], 
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    createPlans: createMutation.mutate,
    updatePlans: updateMutation.mutate,
    deletePlans: deleteMutation.mutate
  };
};
