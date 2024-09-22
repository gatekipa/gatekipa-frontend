import { IInvoice } from "@/app/features/pricing/thunk";
import ColumnHeader from "@/components/shared/columnHeader";
import PaginatedTable from "@/components/shared/paginatedTable";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import useInvoices from "@/hooks/pricing/invoices";
import { formatDate } from "@/utils";
import { ColumnDef } from "@tanstack/react-table";
import React from "react";

export const columns: ColumnDef<IInvoice>[] = [
  {
    accessorKey: "invoiceNo",
    header: ({ column }) => <ColumnHeader column={column} label="Invoice No" />,
    enableSorting: true,
  },
  {
    accessorKey: "amount",
    header: ({ column }) => <ColumnHeader column={column} label="Amount" />,
    cell: ({ row }) => (
      <div>
        {row.original.amount.toLocaleString("en-US", {
          style: "currency",
          currency: "USD",
        })}
      </div>
    ),
    enableSorting: true,
  },
  {
    accessorKey: "discountedAmount",
    header: ({ column }) => (
      <ColumnHeader column={column} label="Discounted Amount" />
    ),
    cell: ({ row }) => (
      <div>
        {row.original.discountedAmount.toLocaleString("en-US", {
          style: "currency",
          currency: "USD",
        })}
      </div>
    ),
    enableSorting: true,
  },
  {
    accessorKey: "invoiceStatus",
    header: ({ column }) => <ColumnHeader column={column} label="Status" />,
    cell: ({ row }) => (
      <Badge className="bg-green-600 hover:bg-green-900 cursor-pointer">
        {row.original.invoiceStatus}
      </Badge>
    ),
    enableSorting: true,
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => <ColumnHeader column={column} label="Paid On" />,
    cell: ({ row }) => `${formatDate(new Date(row.original.createdAt))}`,
    enableSorting: true,
  },
];

const InvoicePage: React.FC = () => {
  const { loading, invoices } = useInvoices();

  return (
    <Card>
      <CardContent>
        <div className="flex justify-between items-center mt-8">
          <h2 className="text-2xl font-semibold">Invoices</h2>
        </div>
      </CardContent>
      <div>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <div className="mx-6 mb-8">
            <PaginatedTable data={invoices} columns={columns} />
          </div>
        )}
      </div>
    </Card>
  );
};

export default InvoicePage;
