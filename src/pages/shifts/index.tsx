import PaginatedTable from "@/components/shared/paginatedTable";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import React from "react";
import useShifts from "@/hooks/shifts";
import { ColumnDef } from "@tanstack/react-table";
import { IShift } from "@/app/features/employee/thunk";
import ColumnHeader from "@/components/shared/columnHeader";
import { formatDate } from "@/utils";

export const columns: ColumnDef<IShift>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => <ColumnHeader column={column} label="Name" />,
    enableSorting: true,
  },
  {
    accessorKey: "startTime",
    header: ({ column }) => <ColumnHeader column={column} label="Start Time" />,
    enableSorting: true,
    cell: ({ row }) => `${formatDate(new Date(row.original.startTime))}`,
  },
  {
    accessorKey: "endTime",
    header: ({ column }) => <ColumnHeader column={column} label="End Time" />,
    enableSorting: true,
    cell: ({ row }) => `${formatDate(new Date(row.original.endTime))}`,
  },
  {
    accessorKey: "isActive",
    header: ({ column }) => <ColumnHeader column={column} label="Active" />,
    enableSorting: true,
    cell: ({ row }) => <div>{row.original.isActive ? "Yes" : "No"}</div>,
  },
];
const ShiftsPage: React.FC = () => {
  const { shifts } = useShifts();

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-semibold">Shifts</h2>
        </div>
      </CardHeader>
      <CardContent>
        <PaginatedTable data={shifts} columns={columns} />
      </CardContent>
    </Card>
  );
};

export default ShiftsPage;
