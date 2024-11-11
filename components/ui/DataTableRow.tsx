// components/DataTableRow.tsx
"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

type DataTableRowProps = {
  row: any;
  columns: string[];
};

export const DataTableRow: React.FC<DataTableRowProps> = ({ row, columns }) => {
  return (
    <tr>
      {columns.map((column, index) => (
        <td
          key={index}
          className={cn("p-4 text-sm text-gray-700", "border-b border-gray-200")}
        >
          {row[column]}
        </td>
      ))}
    </tr>
  );
};
