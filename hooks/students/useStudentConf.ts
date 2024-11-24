"use client";

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { studentService, Student  } from '@/services/students/student_user.service';
import { toast } from 'sonner';

export const useStudent = () => {
  const queryClient = useQueryClient();

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



  return {
    createStudentUser: createMutation.mutate,
  };
};
