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


  useEffect(() => {
    if (!isLoading && JSON.stringify(scheduleHistorial) !== JSON.stringify(data)) {
      setData(scheduleHistorial);
    }
  }, [scheduleHistorial, isLoading]);


  const onDelete = (id: number) => {
    if (confirm("¿Estás seguro de que deseas CANCELAR esta reserva?")) {
      deleteSchedule(id);  // Llama a la función de eliminación del hook
    }
  };


  const columns: ColumnDef<StudentSchedule, any>[] = [
    columnHelper.accessor('date', {
      header: 'Fecha',
      cell: (info) => formatDate(info.getValue()),
    }),
    columnHelper.accessor('time', {
      header: 'Hora',
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('plan_name', {
      header: 'Plan',
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('discipline_name', {
      header: 'Disciplina',
      cell: (info) => info.getValue(),
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
            onClick={() => onDelete(info.row.original.schedule_id)} // Acción de eliminación
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
    <div className='min-w-full'>
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
