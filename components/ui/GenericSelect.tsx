import React from 'react';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { useFormContext } from 'react-hook-form';

interface GenericSelectProps<T> {
  data: T[];                  // Array de datos que se van a mostrar en el select
  valueKey: keyof T;   
  valueKey2: keyof T;       // Clave que contiene el valor del item
  labelKey: keyof T;          // Clave que contiene el texto visible del item
  name: string;               // Nombre del campo en el formulario
  label?: string;             // Etiqueta del campo
  placeholder?: string;       // Placeholder del select
}

const GenericSelect = <T extends {}>({
  data,
  valueKey,
  valueKey2,
  labelKey,
  name,
  label = "Seleccionar",
  placeholder = "Selecciona una opción"
}: GenericSelectProps<T>) => {
  const form = useFormContext();

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Select
              value={field.value}
              onValueChange={field.onChange}
              defaultValue={field.value}
            >
              <SelectTrigger className="w-full">
                <span className="capitalize">
                            { field?.value || "Seleccionar " }
                </span>
              </SelectTrigger>
              <SelectContent>
                {data.map((item) => (
                  <SelectItem 
                    key={`${name}-${item[valueKey]}`}
                    value={item[valueKey2]?.toString()}
                    className="cursor-pointer text-black"
                  >
                    {item[labelKey]}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default GenericSelect;
