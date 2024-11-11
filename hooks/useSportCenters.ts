"use client";

import { useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { sportCenterService, SportCenter } from '@/services/sport_center.service';
import { toast } from 'sonner';

export const useSportCenters = () => {
  console.log('Hook useSportCenters ejecutándose');

  useEffect(() => {
    console.log('Hook useSportCenters mounted');
  }, []);
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ['sportCenters'],
    queryFn: async () => {
      console.log('Iniciando fetch de sport centers');
      try {
        const response = await sportCenterService.getAll();
        console.log('Respuesta de sport centers:', response);
        return response;
      } catch (error) {
        console.error('Error en fetch de sport centers:', error);
        throw error;
      }
    }
  });

  const createMutation = useMutation({
    mutationFn: (data: Partial<SportCenter>) => sportCenterService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['sportCenters'] });
      toast.success('Centro deportivo creado exitosamente');
    },
    onError: (error: Error) => {
      toast.error(error.message);
    }
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<SportCenter> }) =>
      sportCenterService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['sportCenters'] });
      toast.success('Centro deportivo actualizado exitosamente');
    },
    onError: (error: Error) => {
      toast.error(error.message);
    }
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => sportCenterService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['sportCenters'] });
      toast.success('Centro deportivo eliminado exitosamente');
    },
    onError: (error: Error) => {
      toast.error(error.message);
    }
  });

  return {
    sportCenters: query.data?.data || [],
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    createSportCenter: createMutation.mutate,
    updateSportCenter: updateMutation.mutate,
    deleteSportCenter: deleteMutation.mutate
  };
};