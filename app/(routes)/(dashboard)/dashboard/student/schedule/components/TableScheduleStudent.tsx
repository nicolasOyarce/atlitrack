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
import { PencilIcon, RefreshCcw, Trash2} from "lucide-react";
import { UUID } from 'crypto';
//import { SubscriptionForm } from '../FormAddStudent';
import { useStudentSchedule } from '@/hooks/students/useStudentSchedule';
import { formatDate } from '@/utils/utils';

type StudentSchedule = {
  schedule_id: number;
  date: string;
  time: string;
  plan_name: string;
  discipline_name: string;
  status:string;
  };

const columnHelper = createColumnHelper<StudentSchedule>();

export function TableStudentSchedule() {
  const { scheduleHistorial, deleteSchedule, isLoading } = useStudentSchedule();
  const [data, setData] = useState<StudentSchedule[]>([]);
  const [selectedData, setSelectedData] = useState<StudentSchedule | null>(null);
  const [isEditFormOpen, setIsEditFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [renowalId, setRenowalId] = useState<number | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [isRenewalMode, setIsRenewalMode] = useState(false);

  useEffect(() => {
    if (!isLoading && JSON.stringify(scheduleHistorial) !== JSON.stringify(data)) {
      setData(scheduleHistorial);
    }
  }, [scheduleHistorial, isLoading]);


  const onDelete = (id: number) => {
    if (confirm("¿Estás seguro de que deseas ELIMINAR este Alumno?")) {
      deleteSchedule(id);  // Llama a la función de eliminación del hook
    }
  };


  const columns: ColumnDef<StudentSchedule, any>[] = [
    columnHelper.accessor('schedule_id', {
      header: 'Centro deportivo',
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('date', {
      header: 'Alumno',
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('time', {
      header: 'Fecha enrrolamiento',
      cell: (info) => formatDate(info.getValue()),
    }),
    columnHelper.accessor('plan_name', {
      header: 'Fecha expiracion del Plan',
      cell: (info) => formatDate(info.getValue()),
    }),
    columnHelper.accessor('discipline_name', {
      header: 'Fecha ultima renovacion',
      cell: (info) => formatDate(info.getValue()),
    }),
    columnHelper.accessor('status', {
      header: 'Estado',
      cell: (info) => info.getValue(),
    }),
    columnHelper.display({
      id: 'actions',
      header: 'Acciones',
      cell: (info) => (
        <div className="flex gap-2">
            
          <Button
          title="Haz clic para CANCELAR la reserva"
            onClick={() => onDelete(info.row.original.student_sportcenter_id)} // Acción de eliminación
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
      <DataTable<StudentSchedule>
        data={data}
        columns={columns}
        isLoading={isLoading}
        pageSize={10}
        pageSizeOptions={[5, 10, 20, 50]}
      />
        
    </div>
  );
}
