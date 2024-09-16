import React from "react";
import PaginatedTable from "@/components/shared/paginatedTable";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import useDiscountedCompanies from "@/hooks/company/discounted";
import { ColumnDef } from "@tanstack/react-table";
import { IDiscountedCompany } from "@/app/features/pricing/thunk";
import ColumnHeader from "@/components/shared/columnHeader";
import { Button } from "@/components/ui/button";

export const columns: ColumnDef<IDiscountedCompany>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <ColumnHeader
        column={column}
        label="Name"
        className="flex items-center justify-center gap-x-2"
      />
    ),
    enableSorting: true,
    cell: ({ row }) => {
      return <div className="text-center">{row.original.name}</div>;
    },
  },
  {
    accessorKey: "companyCode",
    header: ({ column }) => (
      <ColumnHeader
        column={column}
        label="Company Code"
        className="flex items-center justify-center gap-x-2"
      />
    ),
    enableSorting: true,
    cell: ({ row }) => {
      return <div className="text-center">{row.original.companyCode}</div>;
    },
  },
  {
    accessorKey: "emailAddress",
    header: ({ column }) => (
      <ColumnHeader
        column={column}
        label="Email Address"
        className="flex items-center justify-center gap-x-2"
      />
    ),
    enableSorting: true,
    cell: ({ row }) => {
      return <div className="text-center">{row.original.emailAddress}</div>;
    },
  },

  {
    accessorKey: "isSubscriptionActive",
    header: ({ column }) => (
      <ColumnHeader
        column={column}
        label="Subscription Active"
        className="flex items-center justify-center gap-x-2"
      />
    ),
    enableSorting: true,
    cell: ({ row }) => {
      return (
        <div className="text-center">
          {row.original.isSubscriptionActive ? "Yes" : "No"}
        </div>
      );
    },
  },
  {
    accessorKey: "actions",
    header: ({ column }) => <ColumnHeader column={column} label="Actions" />,
    cell: ({ row }) => {
      const discountedCompany = row.original;
      console.log("discountedCompany :>> ", discountedCompany);

      return <Button>Send Mail</Button>;
    },
    enableSorting: true,
  },
];

const DiscountedCompaniesPage: React.FC = () => {
  const { discountedCompanies, loading } = useDiscountedCompanies();

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-semibold">
            Send Company Mail Discounts
          </h2>
        </div>
      </CardHeader>
      <CardContent>
        <PaginatedTable data={discountedCompanies} columns={columns} />
      </CardContent>
    </Card>
  );
};

export default DiscountedCompaniesPage;
