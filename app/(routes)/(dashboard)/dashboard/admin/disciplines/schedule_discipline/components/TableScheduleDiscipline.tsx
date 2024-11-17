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

export function TableScheduleDiscipline() {
  //const { scheduleDiscipline, isLoading } = useState();//useScheduleDiscipline();
  const [data, setData] = useState<SportCenter[]>([]);
  const [selectedData, setSelectedData] = useState<SportCenter | null>(null);
  const [isEditFormOpen, setIsEditFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [openDialog, setOpenDialog] = useState(false);

{/*}
  useEffect(() => {
    if (!isLoading && JSON.stringify(scheduleDiscipline) !== JSON.stringify(data)) {
      setData(scheduleDiscipline);
    }
  }, [scheduleDiscipline, isLoading]);
*/}
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
      header: 'Disciplina',
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('sport_center_name', {
      header: 'Día',
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('city_name', {
      header: 'Hora inicio',
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('comuna_name', {
      header: 'Hora termino',
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
            onClick={() => onDelete(info.row.original.sport_center_id)} // Acción de eliminación
            className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors shadow-md"
          >
            Eliminar
          </button>
        </div>
      ),
    }),
  ];

  //if (isLoading) return <div>Cargando...</div>;

  return (
    <div>
      <DataTable<SportCenter>
        data={data}
        columns={columns}
        //isLoading={isLoading}
        pageSize={10}
        pageSizeOptions={[5, 10, 20, 50]}
      />
      {isEditFormOpen && selectedData && (
        <div></div>
      )}
    </div>
  );
}


export default TableScheduleDiscipline
