"use client"

import { useState, useEffect } from 'react';
import { DataTable } from '@/components/ui/DataTable';
import { createColumnHelper, ColumnDef } from '@tanstack/react-table';
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { PencilIcon, PlusCircle } from "lucide-react";
import { ScheduleDisciplineForm } from './FormAddScheduleDiscipline';
import { useScheduleDiscipline } from '@/hooks/useScheduleDiscipline';

interface ScheduleDiscipline  {
  schedule_for_discipline_id: number;
  day_id: string;
  hour_start_class: string;
  hour_end_class: string;
  discipline_id: string;
};
type PageProps = {
  schedule: string
};
const columnHelper = createColumnHelper<ScheduleDiscipline>();

export function TableScheduleDiscipline({schedule}: PageProps) {
  const decodedName = schedule ? decodeURIComponent(schedule as string) : "";
  const { schedules, isLoading, deleteScheduleDisciplines } = useScheduleDiscipline(decodedName);
  const [data, setData] = useState<ScheduleDiscipline[]>([]);
  const [selectedData, setSelectedData] = useState<ScheduleDiscipline | null>(null);
  const [isEditFormOpen, setIsEditFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    if (!isLoading && schedules.length > 0) {
      const filteredData = schedules.filter(schedule => schedule.discipline_id === decodedName);
      setData(filteredData);
    }
  }, [schedules, isLoading, decodedName]);
  

  const onEdit = (scheduleDiscipline: ScheduleDiscipline) => {
    setSelectedData(scheduleDiscipline); // Se almacenan los datos del centro deportivo a editar
    setEditingId(scheduleDiscipline.schedule_for_discipline_id); // Actualizamos el ID de edición
    setIsEditFormOpen(true); // Se abre el formulario de edición
  };

  const onDelete = (id: number) => {
    console.log(`Eliminar centro deportivo con ID: ${id}`);
    deleteScheduleDisciplines(id)
  };

  const handleCloseForm = () => {
    setIsEditFormOpen(false);
    setSelectedData(null); // Se limpia la selección
    setEditingId(null); // Limpiamos el ID de edición
  };

  const columns: ColumnDef<ScheduleDiscipline, any>[] = [
    columnHelper.accessor('day_id', {
      header: 'Día',
      cell: (info) => info.getValue(),
    }),
    
    columnHelper.accessor('hour_start_class', {
      header: 'Hora inicio',
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('hour_end_class', {
      header: 'Hora termino',
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('discipline_id', {
      header: 'Disciplina',
      cell: (info) => info.getValue(),
    }),
    columnHelper.display({
      id: 'actions',
      header: 'Acciones',
      cell: (info) => (
        <div className="flex gap-2">
            <Button 
              className='bg-green-600'
              variant="outline" 
              onClick={()=> {
                onEdit(info.row.original);
                setOpenDialog(true);
              }}
              >
                <PencilIcon className="ml-2" />
            </Button>

          <button
            onClick={() => onDelete(info.row.original.schedule_for_discipline_id)} // Acción de eliminación
            className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors shadow-md"
          >
            Eliminar
          </button>
        </div>
      ),
    }),
  ];

  if (isLoading) return <div>Cargando...</div>;

  return (
    <div>
      <DataTable<ScheduleDiscipline>
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
                    <ScheduleDisciplineForm 
                    editingId={editingId}
                    setEditingId={setEditingId}
                    setOpenDialog={setOpenDialog}
                    discipline_name={schedule}/>
                </DialogDescription>    
            </DialogHeader>
        </DialogContent>
    </Dialog>
      )}
    </div>
  );
}


//export default TableScheduleDiscipline
