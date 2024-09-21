import PaginatedTable from "@/components/shared/paginatedTable";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import React, { useState } from "react";
import useShifts from "@/hooks/shifts";
import { ColumnDef } from "@tanstack/react-table";
import { IShift } from "@/app/features/employee/thunk";
import ColumnHeader from "@/components/shared/columnHeader";
import { Button } from "@/components/ui/button";
import CreateShiftModal from "@/components/features/shifts/create";
import { Pencil2Icon } from "@radix-ui/react-icons";
import { Trash2Icon } from "lucide-react";
import DeleteShiftModal from "@/components/features/shifts/delete";

export const columns: ColumnDef<IShift>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <ColumnHeader
        column={column}
        label="Name"
        className="flex justify-center gap-x-2 items-center"
      />
    ),
    enableSorting: true,
    cell: ({ row }) => <div className="text-center">{row.original.name}</div>,
  },
  {
    accessorKey: "startTime",
    header: ({ column }) => (
      <ColumnHeader
        column={column}
        label="Start Time"
        className="flex justify-center gap-x-2 items-center"
      />
    ),
    enableSorting: true,
    cell: ({ row }) => (
      <div className="text-center">{row.original.startTime}</div>
    ),
  },
  {
    accessorKey: "endTime",
    header: ({ column }) => (
      <ColumnHeader
        column={column}
        label="End Time"
        className="flex justify-center gap-x-2 items-center"
      />
    ),
    enableSorting: true,
    cell: ({ row }) => (
      <div className="text-center">{row.original.endTime}</div>
    ),
  },
  {
    accessorKey: "isActive",
    header: ({ column }) => (
      <ColumnHeader
        column={column}
        label="Active"
        className="flex justify-center gap-x-2 items-center"
      />
    ),
    enableSorting: true,
    cell: ({ row }) => (
      <div className="text-center">{row.original.isActive ? "Yes" : "No"}</div>
    ),
  },
  {
    accessorKey: "Actions",
    header: ({ column }) => (
      <ColumnHeader
        column={column}
        label="Active"
        className="flex justify-center gap-x-2 items-center"
      />
    ),
    enableSorting: true,
    cell: ({ row }) => {
      const [open, setOpen] = useState<boolean>(false);
      const [openDelete, setOpenDelete] = useState<boolean>(false);

      return (
        <div className="flex justify-center items-center gap-x-2">
          <Button variant="link" onClick={() => setOpen(true)}>
            <Pencil2Icon className="mr-2" />
            Edit
          </Button>
          <Button
            variant="link"
            className="text-red-700"
            onClick={() => setOpenDelete(true)}
          >
            <Trash2Icon size={16} className="mr-2" />
            Delete
          </Button>
          {open && (
            <CreateShiftModal
              onClose={() => setOpen(false)}
              open={open}
              shift={row.original}
            />
          )}
          {openDelete && (
            <DeleteShiftModal
              onClose={() => setOpenDelete(false)}
              open={openDelete}
              id={row.original.id}
            />
          )}
        </div>
      );
    },
  },
];
const ShiftsPage: React.FC = () => {
  const { shifts } = useShifts();
  const [open, setOpen] = useState<boolean>(false);

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-semibold">Shifts</h2>
          <Button onClick={() => setOpen(true)}>Create New Shift</Button>
        </div>
      </CardHeader>
      <CardContent>
        <PaginatedTable data={shifts} columns={columns} />
      </CardContent>
      {open && <CreateShiftModal onClose={() => setOpen(false)} open={open} />}
    </Card>
  );
};

export default ShiftsPage;
