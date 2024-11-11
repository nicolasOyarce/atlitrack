// components/DataTablePagination.tsx
"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

type DataTablePaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export const DataTablePagination: React.FC<DataTablePaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  return (
    <div className="flex justify-between items-center mt-4">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage <= 1}
        className={cn(
          "px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md",
          currentPage <= 1 && "opacity-50 cursor-not-allowed"
        )}
      >
        Previous
      </button>
      <span className="text-sm text-gray-600">
        Page {currentPage} of {totalPages}
      </span>
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage >= totalPages}
        className={cn(
          "px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md",
          currentPage >= totalPages && "opacity-50 cursor-not-allowed"
        )}
      >
        Next
      </button>
    </div>
  );
};
