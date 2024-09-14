import { ICompany } from "@/app/features/company/thunk";
import ColumnHeader from "@/components/shared/columnHeader";
import PaginatedTable from "@/components/shared/paginatedTable";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useCompanies } from "@/hooks/company";
import { ColumnDef } from "@tanstack/react-table";
import React from "react";

export const columns: ColumnDef<ICompany>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => <ColumnHeader column={column} label="Name" />,
    enableSorting: true,
  },
  {
    accessorKey: "emailAddress",
    header: ({ column }) => (
      <ColumnHeader column={column} label="Email Address" />
    ),
    enableSorting: true,
  },
  {
    accessorKey: "companyCode",
    header: ({ column }) => (
      <ColumnHeader column={column} label="Company Code" />
    ),
    enableSorting: true,
  },
];

const SuperAdminDashboard: React.FC = () => {
  const { companies, loading } = useCompanies();

  if (loading) return <div>Loading...</div>;

  return (
    <Card>
      <CardHeader>
        <h2 className="text-2xl font-semibold">Company Discounts</h2>
      </CardHeader>
      <CardContent>
        <PaginatedTable data={companies} columns={columns} />
      </CardContent>
    </Card>
  );
};

export default SuperAdminDashboard;
