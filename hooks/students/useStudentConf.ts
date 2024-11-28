"use client";

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { studentService, Student,
  studentConfService, StudentConf
  } from '@/services/students/student_user.service';
import { toast } from 'sonner';

export const useStudent = () => {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: [''],
    queryFn: async () => {
      console.log('Iniciando fetch de schedule disc');
      try {
        const response = await studentConfService.getWithOutParams();
        console.log('Respuesta de User:', response);
        return response;
      } catch (error) {
        console.error('Error en fetch de schedule disciplines:', error);
        throw error;
      }
    }
  });
  const createMutation = useMutation({
    mutationFn: (data: Partial<Student>) => studentService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['students'] });
      toast.success('Usuario registrado exitosamente');
    },
    onError: (error: Error) => {
      toast.error(error.message);
    }
  });
  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<StudentConf> }) =>
      studentConfService.update(id, data),
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
    updateStudentUser: updateMutation.mutate,
    createStudentUser: createMutation.mutate,
  };
};
