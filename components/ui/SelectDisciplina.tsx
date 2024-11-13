// types.ts
type Discipline = {
    id: number;
    discipline_name: string;
  }
  
  // DisciplineSelect.tsx
  import React from 'react';
  import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
  
  interface DisciplineSelectProps {
    disciplines: Discipline[];
    value?: string;
    onValueChange: (value: string) => void;
    placeholder?: string;
  }
  
  const DisciplineSelect: React.FC<DisciplineSelectProps> = ({
    disciplines,
    value,
    onValueChange,
    placeholder = "Selecciona una disciplina"
  }) => {
    return (
      <Select
        value={value}
        onValueChange={onValueChange}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {disciplines.map((discipline) => (
            <SelectItem 
              key={`discipline-${discipline.id}`} 
              value={discipline.discipline_name}
            >
              {discipline.discipline_name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    );
  };
  
  export default DisciplineSelect;
  
  // Ejemplo de uso en una página o componente:
