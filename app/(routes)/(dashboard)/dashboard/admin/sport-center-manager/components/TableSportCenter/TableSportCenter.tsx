"use client"

import { useState, useEffect } from 'react';
import { DataTable } from '@/components/ui/DataTable';
import { createColumnHelper, ColumnDef } from '@tanstack/react-table';
import { useSportCenters } from '@/hooks/useSportCenters';
import { SportCenterForm } from '../FormAddSportCenter';
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { PencilIcon, Trash2 } from "lucide-react";

interface SportCenter {
  sport_center_id: number;
  sport_center_name: string;
  city_name: string;
  comuna_name: string;
  address: string;
  phone: string;
  mail: string;
  open_hour: string;
  close_hour: string;
}

const columnHelper = createColumnHelper<SportCenter>();

export function TableSportCenter() {
  const { sportCenters, isLoading } = useSportCenters();
  const [data, setData] = useState<SportCenter[]>([]);
  const [selectedData, setSelectedData] = useState<SportCenter | null>(null);
  const [isEditFormOpen, setIsEditFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [openDialog, setOpenDialog] = useState(false);


  useEffect(() => {
    if (!isLoading && JSON.stringify(sportCenters) !== JSON.stringify(data)) {
      setData(sportCenters);
    }
  }, [sportCenters, isLoading]);

  const onEdit = (sportCenter: SportCenter) => {
    setSelectedData(sportCenter); // Se almacenan los datos del centro deportivo a editar
    setEditingId(sportCenter.sport_center_id); // Actualizamos el ID de edición
    setIsEditFormOpen(true); // Se abre el formulario de edición
  };

  const onDelete = (id: number) => {
    console.log(`Eliminar centro deportivo con ID: ${id}`);
    // Lógica para eliminar el centro deportivo
  };

  const handleCloseForm = () => {
    setIsEditFormOpen(false);
    setSelectedData(null); // Se limpia la selección
    setEditingId(null); // Limpiamos el ID de edición
  };

  const columns: ColumnDef<SportCenter, any>[] = [
    columnHelper.accessor('sport_center_id', {
      header: 'ID',
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('sport_center_name', {
      header: 'Nombre',
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('city_name', {
      header: 'Ciudad',
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('comuna_name', {
      header: 'Comuna',
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('address', {
      header: 'Dirección',
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('phone', {
      header: 'Teléfono',
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('mail', {
      header: 'Correo',
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('open_hour', {
      header: 'Hora de apertura',
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('close_hour', {
      header: 'Hora de cierre',
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
              <PencilIcon className="" />
            </Button>

          <button
            onClick={() => onDelete(info.row.original.sport_center_id)} 
            className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors shadow-md"
          >
            <Trash2 />
          </button>
        </div>
      ),
    }),
  ];

  if (isLoading) return <div>Cargando...</div>;

  return (
    <div>
      <DataTable<SportCenter>
        data={data}
        columns={columns}
        isLoading={isLoading}
        pageSize={10}
        pageSizeOptions={[5, 10, 20, 50]}
      />
      {isEditFormOpen && selectedData && (
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent>
          <DialogTitle>Actualizar Centro</DialogTitle> {/* Título accesible */}
            <DialogHeader>
                <DialogDescription>
                    <SportCenterForm 
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
