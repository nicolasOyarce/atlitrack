import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
} from "@/components/ui/form";
import { Controller } from "react-hook-form";

interface DateInputProps {
  name: string; // Nombre del campo en el formulario
  label: string; // Etiqueta para el input
  placeholder?: string; // Placeholder opcional
  required?: boolean; // Si el campo es requerido
  control: any; // Control proporcionado por React Hook Form
}

export default function DateInput({
  name,
  label,
  placeholder = "",
  required = false,
  control,
}: DateInputProps) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input
              type="date"
              placeholder={placeholder}
              required={required}
              {...field}
            />
          </FormControl>
        </FormItem>
      )}
    />
  );
}
