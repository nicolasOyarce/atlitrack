// components/TrainerSelect.tsx
import React from 'react';

type Trainer = {
  user_id: string;
  first_name: string;
  last_name: string;
  email: string;
};

type TrainerSelectProps = {
  trainers: Trainer[];
  onSelect: (selectedId: string) => void; // Para manejar el cambio de selección
  selectedTrainer?: string; // Etiqueta opcional para el campo select
};

export const TrainerSelect: React.FC<TrainerSelectProps> = ({ trainers, onSelect, selectedTrainer }) => {
  return (
    <div>
      
      <select
        value={selectedTrainer || ""}
        name="trainer-select"
        className="block w-full mt-1 p-2 border rounded-md shadow-sm"
        onChange={(e) => onSelect(e.target.value)} // Llama a la función onSelect cuando cambia la selección
      >
        <option value="">Seleccionar...</option>
        {trainers.map((trainer) => (
          <option key={trainer.user_id} value={trainer.email}>
            {`${trainer.first_name} ${trainer.last_name}`}
          </option>
        ))}
      </select>
    </div>
  );
};
