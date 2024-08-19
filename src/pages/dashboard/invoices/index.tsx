import { IInvoice } from "@/app/features/pricing/thunk";
import ColumnHeader from "@/components/shared/columnHeader";
import PaginatedTable from "@/components/shared/paginatedTable";
import { Card, CardContent } from "@/components/ui/card";
import useInvoices from "@/hooks/pricing/invoices";
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
    enableSorting: true,
  },
  {
    accessorKey: "invoiceStatus",
    header: ({ column }) => <ColumnHeader column={column} label="Status" />,
    enableSorting: true,
  },
];

const InvoicePage: React.FC = () => {
  const { loading, invoices } = useInvoices();

  return (
    <Card>
      <CardContent>
        <div className="flex justify-between items-center mt-8">
          <h2 className="text-2xl font-semibold">Employee Management</h2>
        </div>
      </CardContent>
      <div>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <div className="mx-6 mb-8">
            <PaginatedTable data={invoices} columns={[]} />
          </div>
        )}
      </div>
    </Card>
  );
};

export default InvoicePage;
