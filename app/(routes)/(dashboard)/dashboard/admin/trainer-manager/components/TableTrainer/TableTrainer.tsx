"use client"

import { useState, useEffect } from 'react';
import { DataTable } from '@/components/ui/DataTable';
import { createColumnHelper, ColumnDef } from '@tanstack/react-table';
import { useTrainers } from '@/hooks/useTrainer';
import { TrainerForm } from '../FormAddTrainer';
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { PencilIcon, PlusCircle, Trash, Trash2} from "lucide-react";
import { UUID } from 'crypto';

type Trainer = {
  user_id:string;
  first_name: string;
  last_name: string;
  genre: string;
  email: string;
  phone: string;
  password: string;
  rut: string;
  salary: string;
};

const columnHelper = createColumnHelper<Trainer>();

export function TableTrainer() {
  const { trainers, isLoading, deleteTrainers } = useTrainers();
  const [data, setData] = useState<Trainer[]>([]);
  const [selectedData, setSelectedData] = useState<Trainer | null>(null);
  const [isEditFormOpen, setIsEditFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [openDialog, setOpenDialog] = useState(false);


  useEffect(() => {
    if (!isLoading && JSON.stringify(trainers) !== JSON.stringify(data)) {
      setData(trainers);
    }
  }, [trainers, isLoading]);

  const onEdit = (trainer: Trainer) => {
    setSelectedData(trainer); // Se almacenan los datos del centro deportivo a editar
    setEditingId(trainer.user_id); // Actualizamos el ID de edición
    setIsEditFormOpen(true); // Se abre el formulario de edición
  };

  const onDelete = (id: string) => {
    console.log("delte", id);
    if (confirm("¿Estás seguro de que deseas eliminar este entrenador?")) {
      deleteTrainers(id);  // Llama a la función de eliminación del hook
    }
  };

  const handleCloseForm = () => {
    setIsEditFormOpen(false);
    setSelectedData(null); // Se limpia la selección
    setEditingId(null); // Limpiamos el ID de edición
  };

  const columns: ColumnDef<Trainer, any>[] = [
    columnHelper.accessor('first_name', {
      header: 'Nombre',
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('last_name', {
      header: 'Apellido',
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('genre', {
      header: 'Sexo',
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('email', {
      header: 'Correo eléctronico',
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('phone', {
      header: 'Teléfono',
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('rut', {
      header: 'RUT',
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('salary', {
      header: 'Salario',
      cell: (info) => info.getValue(),
    }),
    columnHelper.display({
      id: 'actions',
      header: 'Acciones',
      cell: (info) => (
        <div className="flex gap-2">
            <Button 
              className='bg-green-700'
              variant="outline" 
              onClick={()=> {
                onEdit(info.row.original);
                setOpenDialog(true);
              }}
              >
              <PencilIcon className="" />
            </Button>

          <Button
            onClick={() => onDelete(info.row.original.user_id)} // Acción de eliminación
            className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors shadow-md"
          >
            <Trash2 />
          </Button>
        </div>
      ),
    }),
  ];

  if (isLoading) return <div>Cargando...</div>;

  return (
    <div>
      <DataTable<Trainer>
        data={data}
        columns={columns}
        isLoading={isLoading}
        pageSize={10}
        pageSizeOptions={[5, 10, 20, 50]}
      />
      {isEditFormOpen && selectedData && (
        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent>
        <DialogTitle>Actualizar Entrenador</DialogTitle> {/* Título accesible */}
            <DialogHeader>
                <DialogDescription>
                    <TrainerForm 
                    editingId={editingId}
                    setEditingId={setEditingId}
                    setOpenDialog={setOpenDialog}/>
                </DialogDescription>    
            </DialogHeader>
        </DialogContent>
    </Dialog>
        
      )}
    </div>
  );
}
