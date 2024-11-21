"use client"

import { useState, useEffect } from 'react';
import { DataTable } from '@/components/ui/DataTable';
import { createColumnHelper, ColumnDef } from '@tanstack/react-table';
import { usePlan } from '@/hooks/usePlan';
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
import { PlanForm} from '../FormAddPlan';

type Plan = {
  plan_id: number;
  discipline_id: string;
  plan_name: string;
  description: string;
  classes_quantity: number;
  duration: number;
  price: number;
  is_active: boolean;
};


const columnHelper = createColumnHelper<Plan>();

export function TablePlan() {
  const { plans, isLoading, deletePlans } = usePlan();
  const [data, setData] = useState<Plan[]>([]);
  const [selectedData, setSelectedData] = useState<Plan | null>(null);
  const [isEditFormOpen, setIsEditFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [openDialog, setOpenDialog] = useState(false);


  useEffect(() => {
    if (!isLoading && JSON.stringify(plans) !== JSON.stringify(data)) {
      setData(plans);
    }
  }, [plans, isLoading]);

  const onEdit = (plan: Plan) => {
    setSelectedData(plan); // Se almacenan los datos del centro deportivo a editar
    setEditingId(plan.plan_id); // Actualizamos el ID de edición
    setIsEditFormOpen(true); // Se abre el formulario de edición
  };

  const onDelete = (id: number) => {
    if (confirm("¿Estás seguro de que deseas eliminar este entrenador?")) {
      deletePlans(id);  // Llama a la función de eliminación del hook
    }
  };

  const handleCloseForm = () => {
    setIsEditFormOpen(false);
    setSelectedData(null); // Se limpia la selección
    setEditingId(null); // Limpiamos el ID de edición
  };

  const columns: ColumnDef<Plan, any>[] = [
    columnHelper.accessor('discipline_id', {
      header: 'Disciplina',
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('plan_name', {
      header: 'Nombre Plan',
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('description', {
      header: 'Descripción',
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('classes_quantity', {
      header: 'Cantidad de clases',
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('duration', {
      header: 'Duración (dias)',
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('price', {
      header: 'Precio',
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('is_active', {
      header: 'Estado',
      cell: (info) => {
        const isActive=info.getValue();
        return <span>{isActive ? 'Activo' : 'Inactivo'}</span>;}
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
            onClick={() => onDelete(info.row.original.plan_id)} // Acción de eliminación
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
      <DataTable<Plan>
        data={data}
        columns={columns}
        isLoading={isLoading}
        pageSize={10}
        pageSizeOptions={[5, 10, 20, 50]}
      />
      {isEditFormOpen && selectedData && (
        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent>
        <DialogTitle>Actualizar Plan</DialogTitle> {/* Título accesible */}
            <DialogHeader>
                <DialogDescription>
                    <PlanForm 
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
