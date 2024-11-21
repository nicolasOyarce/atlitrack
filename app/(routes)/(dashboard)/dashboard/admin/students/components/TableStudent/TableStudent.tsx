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
import { SubscriptionForm } from '../FormAddStudent';
import { useSubscription } from '@/hooks/useSubscription';

type Subscription = {
  student_sportcenter_id: number;
  sportcenter_id: string;
  student_id: string;
  subscription_date: string;
  expiration_date: string;
  status: string;
  last_renewal_date: string;
  plan_id: string;
  };

const columnHelper = createColumnHelper<Subscription>();

export function TableSubscription() {
  const { students_sportcenter, isLoading, deleteSubscription, updateSubscription } = useSubscription();
  const [data, setData] = useState<Subscription[]>([]);
  const [selectedData, setSelectedData] = useState<Subscription | null>(null);
  const [isEditFormOpen, setIsEditFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [openDialog, setOpenDialog] = useState(false);


  useEffect(() => {
    if (!isLoading && JSON.stringify(students_sportcenter) !== JSON.stringify(data)) {
      setData(students_sportcenter);
    }
  }, [students_sportcenter, isLoading]);

  const onEdit = (subscription: Subscription) => {
    setSelectedData(subscription); // Se almacenan los datos del centro deportivo a editar
    setEditingId(subscription.student_sportcenter_id); // Actualizamos el ID de edición
    setIsEditFormOpen(true); // Se abre el formulario de edición
  };

  const onDelete = (id: number) => {
    if (confirm("¿Estás seguro de que deseas ELIMINAR este Alumno?")) {
      deleteSubscription(id);  // Llama a la función de eliminación del hook
    }
  };



  const handleCloseForm = () => {
    setIsEditFormOpen(false);
    setSelectedData(null); // Se limpia la selección
    setEditingId(null); // Limpiamos el ID de edición
  };

  const columns: ColumnDef<Subscription, any>[] = [
    columnHelper.accessor('sportcenter_id', {
      header: 'Centro deportivo',
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('student_id', {
      header: 'Alumno',
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('subscription_date', {
      header: 'Fecha enrrolamiento',
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('expiration_date', {
      header: 'Fecha expiracion del Plan',
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('last_renewal_date', {
      header: 'Fecha ultima renovacion',
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('status', {
      header: 'Estado',
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('plan_id', {
      header: 'Plan',
      cell: (info) => info.getValue(),
    }),
    columnHelper.display({
      id: 'actions',
      header: 'Acciones',
      cell: (info) => (
        <div className="flex gap-2">
            <Button 
            title="Haz clic para EDITAR la suscripción"
              className='bg-green-600  hover:bg-green-700 transition-colors shadow-md'
              variant="outline" 
              onClick={()=> {
                onEdit(info.row.original);
                setOpenDialog(true);
              }}
              >
              <PencilIcon className="" />
            </Button>
            <Button 
              title="Haz clic para RENOVAR la suscripción"
              className='bg-yellow-500  hover:bg-yellow-600 transition-colors shadow-md'
              variant="outline" 
              onClick={()=> {
                onEdit(info.row.original);
                ;
              }}
              >
              <RefreshCcw className="" />
            </Button>
          <Button
          title="Haz clic para ELIMINAR la suscripción"
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
      <DataTable<Subscription>
        data={data}
        columns={columns}
        isLoading={isLoading}
        pageSize={10}
        pageSizeOptions={[5, 10, 20, 50]}
      />
      {isEditFormOpen && selectedData && (
        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent>
        <DialogTitle>Actualizar Subscripcion</DialogTitle> {/* Título accesible */}
            <DialogHeader>
                <DialogDescription>
                    <SubscriptionForm 
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
