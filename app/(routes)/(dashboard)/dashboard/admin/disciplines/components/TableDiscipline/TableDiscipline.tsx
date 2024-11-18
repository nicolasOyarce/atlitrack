"use client"

import { useState, useEffect } from 'react';
import { DataTable } from '@/components/ui/DataTable';
import { createColumnHelper, ColumnDef } from '@tanstack/react-table';
import { useDiscipline } from '@/hooks/useDiscipline';
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { PencilIcon, PlusCircle, Trash, Trash2, Calendar} from "lucide-react";
import { UUID } from 'crypto';
import { DisciplineForm } from '../FormAddDiscipline';
import { useRouter } from "next/navigation";

type Discipline = {
  discipline_id:number;
  discipline_name: string;
  trainer_id: string;
  student_max_quantity: number;
};

const columnHelper = createColumnHelper<Discipline>();

export function TableDiscipline() {
  const { disciplines, isLoading, deleteDisciplines } = useDiscipline();
  const [data, setData] = useState<Discipline[]>([]);
  const [selectedData, setSelectedData] = useState<Discipline | null>(null);
  const [isEditFormOpen, setIsEditFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const router = useRouter();

  useEffect(() => {
    console.log("Disciplines", disciplines);
    if (!isLoading && JSON.stringify(disciplines) !== JSON.stringify(data)) {
      setData(disciplines);
    }
  }, [disciplines, isLoading]);

  const onEdit = (discipline: Discipline) => {
    setSelectedData(discipline); // Se almacenan los datos del centro deportivo a editar
    setEditingId(discipline.discipline_id); // Actualizamos el ID de edición
    setIsEditFormOpen(true); // Se abre el formulario de edición
  };

  const onDelete = (id: number) => {
    if (confirm("¿Estás seguro de que deseas eliminar este entrenador?")) {
      deleteDisciplines(id);  // Llama a la función de eliminación del hook
    }
  };

  const handleCloseForm = () => {
    setIsEditFormOpen(false);
    setSelectedData(null); // Se limpia la selección
    setEditingId(null); // Limpiamos el ID de edición
  };

  const columns: ColumnDef<Discipline, any>[] = [
    columnHelper.accessor('discipline_name', {
      header: 'Nombre',
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('trainer_id', {
      header: 'Entrenador',
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('student_max_quantity', {
      header: 'Max. cantidad Alumnos',
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
          onClick={() => {
          const rowId = info.row.original.discipline_name
          router.push(`/dashboard/admin/disciplines/${rowId}`)
          }}>
            <Calendar />
          </Button>
          <Button
            onClick={() => onDelete(info.row.original.discipline_id)} // Acción de eliminación
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
      <DataTable<Discipline>
        data={data}
        columns={columns}
        isLoading={isLoading}
        pageSize={10}
        pageSizeOptions={[5, 10, 20, 50]}
      />
      {isEditFormOpen && selectedData && (
        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent>
        <DialogTitle>Actualizar Disciplina</DialogTitle> {/* Título accesible */}
            <DialogHeader>
                <DialogDescription>
                    <DisciplineForm 
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
