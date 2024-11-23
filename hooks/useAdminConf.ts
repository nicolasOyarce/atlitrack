"use client";

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { adminService, Admin } from '@/services/admin_user.service';
import { toast } from 'sonner';

export const useAdmin = () => {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: [''],
    queryFn: async () => {
      console.log('Iniciando fetch de schedule disc');
      try {
        const response = await adminService.getWithOutParams();
        console.log('Respuesta de User:', response);
        return response;
      } catch (error) {
        console.error('Error en fetch de schedule disciplines:', error);
        throw error;
      }
    }
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Admin> }) =>
        adminService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [''] });
      toast.success('Usuario actualizado exitosamente');
    },
    onError: (error: Error) => {
      toast.error(error.message);
    }
  });


  return {
    user: query.data || [], 
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    updateAdminUser: updateMutation.mutate,
  };
};
