"use client";

import { useState, useEffect } from 'react';
import { DataTable } from '@/components/ui/DataTable';
import { createColumnHelper, ColumnDef } from '@tanstack/react-table';
import { useSportCenters } from '@/hooks/useSportCenters';

// Definir el tipo de datos
interface SportCenter {
  sport_center_id: number;
  sport_center_name: string;
  city_name: string;   // Usamos city_name en lugar de city_id
  comuna_name: string; // Usamos comuna_name en lugar de comuna_id
  address: string;
  phone: string;
  mail: string;
  open_hour: string;
  close_hour: string;
}

// Crear el helper para las columnas
const columnHelper = createColumnHelper<SportCenter>();

// Definir las columnas
const columns: ColumnDef<SportCenter, any>[] = [
  columnHelper.accessor('sport_center_id', {
    header: 'ID',
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('sport_center_name', {
    header: 'Nombre',
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('city_name', { // Cambiado city_id por city_name
    header: 'Ciudad',
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('comuna_name', { // Cambiado comuna_id por comuna_name
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
];

// Componente principal
export function TableSportCenter() {
  const { sportCenters, isLoading } = useSportCenters();

  const [data, setData] = useState<SportCenter[]>([]);

  useEffect(() => {
    console.log('sportCenters:', sportCenters);
    // Comparación profunda utilizando JSON.stringify para evitar actualizaciones infinitas
    if (!isLoading && JSON.stringify(sportCenters) !== JSON.stringify(data)) {
      setData(sportCenters);
    }
  }, [sportCenters, isLoading]); // Eliminamos `data` de las dependencias

  if (isLoading) return <div>Cargando...</div>;

  return (
    <DataTable<SportCenter>
      data={data}
      columns={columns}
      isLoading={isLoading}
      onRowClick={(row) => console.log('Row clicked:', row)}
      pageSize={10}
      pageSizeOptions={[5, 10, 20, 50]}
    />
  );
}
