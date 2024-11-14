import React from 'react';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { useFormContext } from 'react-hook-form';

type Discipline = {
  discipline_id: number;
  discipline_name: string;
}

interface DisciplineSelectProps {
  disciplines: Discipline[];
  
}

const DisciplineSelect: React.FC<DisciplineSelectProps> = ({
  disciplines,
  label = "Disciplina"
}) => {
  const form = useFormContext();

  return (
    <FormField
      control={form.control}
      name="discipline_id"
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Select
              //value={field.value}
              onValueChange={field.onChange}
              defaultValue={field.value}
            >
              <SelectTrigger className="w-full">
              <span className="capitalize">
                            { field?.value || "Seleccionar una disciplina" }
                        </span>
              </SelectTrigger>
              <SelectContent>
                {disciplines.map((discipline) => (
                  <SelectItem 
                    key={`discipline-${discipline.discipline_id.toString()}`}
                    value={discipline.discipline_name}
                    className="cursor-pointer"
                  >
                    {discipline.discipline_name}
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

export default DisciplineSelect;