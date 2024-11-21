import * as React from 'react'
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  flexRender,
  ColumnDef,
} from '@tanstack/react-table'
import * as Separator from '@radix-ui/react-separator'
import * as Select from '@radix-ui/react-select'
import { ChevronLeftIcon, ChevronRightIcon, ChevronDownIcon } from 'lucide-react'

interface DataTableProps<T> {
  data: T[]
  columns: ColumnDef<T>[]
  isLoading?: boolean
  onRowClick?: (row: T) => void
  pageSize?: number
  pageSizeOptions?: number[]
}

const PageSizeSelect = ({
  value,
  onChange,
  options,
}: {
  value: number
  onChange: (value: number) => void
  options: number[]
}) => (
  <Select.Root value={String(value)} onValueChange={(v) => onChange(Number(v))}>
    <Select.Trigger className="inline-flex items-center justify-center px-3 py-2 text-sm border rounded-md gap-1">
      <Select.Value>{value} por página</Select.Value>
      <Select.Icon>
        <ChevronDownIcon className="w-4 h-4" />
      </Select.Icon>
    </Select.Trigger>

    <Select.Portal>
      <Select.Content className="overflow-hidden bg-white border rounded-md shadow-md">
        <Select.Viewport>
          {options.map((size) => (
            <Select.Item
              key={size}
              value={String(size)}
              className="relative px-8 py-2 text-sm outline-none cursor-pointer hover:bg-gray-50 focus:bg-gray-50"
            >
              <Select.ItemText>{size} por página</Select.ItemText>
            </Select.Item>
          ))}
        </Select.Viewport>
      </Select.Content>
    </Select.Portal>
  </Select.Root>
)

export function DataTable<T extends object>({
  data,
  columns,
  isLoading,
  onRowClick,
  pageSize: initialPageSize = 10,
  pageSizeOptions = [5, 10, 20, 50],
}: DataTableProps<T>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageSize: initialPageSize,
      },
    },
  })
  const getRowClassForStatus = (status: string) => {
    switch (status) {
      case 'Activa':
        return 'bg-green-100 text-green-800';
      case 'Pronto a vencer(5 días)':
        return 'bg-yellow-100 text-yellow-800';
      case 'Inactiva':
        return 'bg-red-100 text-red-800';
      default:
        return '';
    }
  };
  if (isLoading) {
    return <div className="flex justify-center p-4">Cargando...</div>
  }

  return (
    <div className="w-full border rounded-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} className="bg-gray-50">
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="px-4 py-3 text-left text-sm font-medium text-gray-700 border-b"
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-4 py-3 text-center text-gray-500"
                >
                  No hay datos disponibles
                </td>
              </tr>
            ) : (
              table.getRowModel().rows.map((row) => {
                // Obtener el valor del estado de la fila actual (suponiendo que "status" está presente)
                const status = row.original.status;
                
                // Aquí se aplica la clase del estado de la fila solo si el estado existe
                const rowClass = getRowClassForStatus(status);

                return (
                  <tr
                    key={row.id}
                    className={`border-b border-gray-200 ${rowClass} ${
                      onRowClick ? 'cursor-pointer hover:bg-gray-50' : ''
                    }`}
                    onClick={() => onRowClick?.(row.original)}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <td key={cell.id} className="px-4 py-3 text-sm text-gray-900">
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>
                    ))}
                  </tr>
                )
              })
            )}
          </tbody>
        </table>
      </div>

      <Separator.Root className="h-px bg-gray-200" />

      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-4">
          <PageSizeSelect
            value={table.getState().pagination.pageSize}
            onChange={(value) => table.setPageSize(value)}
            options={pageSizeOptions}
          />
          <span className="text-sm text-gray-700">
            Mostrando {table.getRowModel().rows.length} de {data.length} registros
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="p-1 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
          >
            <ChevronLeftIcon className="w-5 h-5" />
          </button>
          <span className="text-sm text-gray-700">
            Página {table.getState().pagination.pageIndex + 1} de{' '}
            {table.getPageCount()}
          </span>
          <button
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="p-1 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
          >
            <ChevronRightIcon className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  )
}