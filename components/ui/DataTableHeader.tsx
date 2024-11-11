// components/DataTableHeader.tsx
"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

type DataTableHeaderProps = {
  columns: string[];
};

export const DataTableHeader: React.FC<DataTableHeaderProps> = ({ columns }) => {
  return (
    <tr>
      {columns.map((column, index) => (
        <th
          key={index}
          className={cn(
            "text-left p-4 font-medium text-sm text-gray-700",
            "border-b border-gray-200"
          )}
        >
          {column}
        </th>
      ))}
    </tr>
  );
};
