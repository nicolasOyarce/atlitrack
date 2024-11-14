// components/TrainerSelect.tsx
import React from 'react';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { useFormContext } from 'react-hook-form';

type Trainer = {
  user_id: string;
  first_name: string;
  last_name: string;
  email: string;
};

type TrainerSelectProps = {
  trainers: Trainer[];
  label?: string;// Etiqueta opcional para el campo select
};

export const TrainerSelect: React.FC<TrainerSelectProps> = ({ 
  trainers, 
  label = "Entrenadores" }) => {
  const form = useFormContext();
  return (
    <FormField
      control={form.control}
      name="trainer_id" // Nombre del campo en el formulario
      render={({ field }) => {
        // Encuentra el entrenador seleccionado para mostrar el nombre completo
        const selectedTrainer = trainers.find(trainer => trainer.email === field.value);

        return (
          <FormItem>
            <FormLabel>{label}</FormLabel>
            <FormControl>
              <Select
                value={field.value}
                onValueChange={field.onChange}
                defaultValue={field.value}
              >
                <SelectTrigger className="w-full">
                  <span>
                    {selectedTrainer? `${selectedTrainer.first_name} ${selectedTrainer.last_name}`
                      : "Selecciona un entrenador"}
                  </span>
                </SelectTrigger>
                <SelectContent>
                  {trainers.map((trainer) => (
                    <SelectItem 
                      key={`trainer-${trainer.user_id}`}
                      value={trainer.email} // Usa el email como valor
                      className="cursor-pointer"
                    >
                      {trainer.first_name} {trainer.last_name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormControl>
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
};
