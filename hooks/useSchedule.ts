"use client";

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { scheduleService, Schedule } from '@/services/schedule.service';
import { toast } from 'sonner';

export const useSchedule = () => {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ['schedules'],
    queryFn: async () => {
      console.log('Iniciando fetch de horarios');
      try {
        const response = await scheduleService.getAll();
        console.log('Respuesta de horarios:', response);
        return response;
      } catch (error) {
        console.error('Error en fetch de horarios:', error);
        throw error;
      }
    }
  });

  return {
    schedules: query.data?.schedules || [], 
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,

  };
};
