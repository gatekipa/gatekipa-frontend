import { IReceptionVisitor } from "@/app/features/company/thunk";
import VisitorAuth from "@/components/features/visitors/auth";
import ColumnHeader from "@/components/shared/columnHeader";
import PaginatedTable from "@/components/shared/paginatedTable";
import { Button } from "@/components/ui/button";
import useEmployees from "@/hooks/employees";
import useReceptionVisitors from "@/hooks/visitors/reception";
import { formatDate } from "@/utils";
import { ExitIcon } from "@radix-ui/react-icons";
import { ColumnDef } from "@tanstack/react-table";
import React from "react";

export const columns: ColumnDef<IReceptionVisitor>[] = [
  {
    accessorKey: "visitor",
    header: ({ column }) => (
      <ColumnHeader column={column} label="Visitor Name" />
    ),
    enableSorting: true,
    cell: ({ row }) =>
      `${row.original.visitor.firstName} ${row.original.visitor.lastName}`,
  },
  {
    accessorKey: "visitor.emailAddress",
    header: ({ column }) => (
      <ColumnHeader column={column} label="Email Address" />
    ),
    enableSorting: true,
  },
  {
    accessorKey: "visitor.mobileNo",
    header: ({ column }) => <ColumnHeader column={column} label="Mobile No" />,
    enableSorting: true,
  },
  {
    accessorKey: "checkInTime",
    header: ({ column }) => (
      <ColumnHeader column={column} label="Check In Time" />
    ),
    cell: ({ row }) => `${formatDate(new Date(row.original.checkInTime))}`,
    enableSorting: true,
  },
  {
    accessorKey: "checkoutTime",
    header: ({ column }) => (
      <ColumnHeader column={column} label="Check Out Time" />
    ),
    cell: ({ row }) => {
      const checkoutTime = row.original.checkoutTime;
      return checkoutTime ? `${formatDate(new Date(checkoutTime))}` : "-";
    },
    enableSorting: true,
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const visit = row.original;
      return !visit.checkoutTime ? (
        <Button size="sm" className="text-xs">
          <ExitIcon className="mr-2" />
          Check Out
        </Button>
      ) : (
        <span>-</span>
      );
    },
  },
];

const ReceptionPage: React.FC = () => {
  useEmployees();
  const { receptionVisitors } = useReceptionVisitors();

  return (
    <div className="space-y-3 h-screen">
      <h2 className="text-3xl font-bold mb-7">Welcome To GateKipas</h2>
      <section className="grid grid-cols-1 gap-x-7 gap-y-4">
        <div className="col-span-2">
          <VisitorAuth />
        </div>
        <div className="col-span-4">
          <h3 className="text-2xl font-bold">Visitors</h3>
          <PaginatedTable
            columns={columns}
            data={receptionVisitors}
            showColumnFilters={false}
          />
        </div>
      </section>
    </div>
  );
};

export default ReceptionPage;
