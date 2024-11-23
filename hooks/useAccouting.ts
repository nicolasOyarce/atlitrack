"use client";

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { accoutingService, accoutingExpenseService } from '@/services/accouting.service';
import { toast } from 'sonner';

export const useAccouting = () => {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ['accoutings'],
    queryFn: async () => {
      console.log('Iniciando fetch de accouting');
      try {
        const response = await accoutingService.getAll();
        console.log('Respuesta de accouting:', response);
        return response;
      } catch (error) {
        console.error('Error en fetch de accouting:', error);
        throw error;
      }
    }
  });
  const query2 = useQuery({
    queryKey: ['expenses'],
    queryFn: async () => {
      console.log('Iniciando fetch de accouting expenses');
      try {
        const response = await accoutingExpenseService.getAll();
        console.log('Respuesta de accouting expenses:', response);
        return response;
      } catch (error) {
        console.error('Error en fetch de accouting expenses:', error);
        throw error;
      }
    }
  });
  return {
    accoutings: query.data || [], 
    expenses: query2.data || [],
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,

  };
};
