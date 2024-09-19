import { IDiscountModel } from "@/app/features/pricing/thunk";
import CreateDiscountModal from "@/components/features/discount/create";
import ColumnHeader from "@/components/shared/columnHeader";
import PaginatedTable from "@/components/shared/paginatedTable";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import useDiscounts from "@/hooks/discounts";
import { Pencil2Icon } from "@radix-ui/react-icons";
import { ColumnDef } from "@tanstack/react-table";
import React, { useState } from "react";

export const columns: ColumnDef<IDiscountModel>[] = [
  {
    accessorKey: "code",
    header: ({ column }) => (
      <ColumnHeader
        column={column}
        label="Code"
        className="flex items-center justify-center gap-x-2"
      />
    ),
    enableSorting: true,
    cell: ({ cell }) => {
      const value = cell.getValue() as string;
      return <div className="text-center">{value}</div>;
    },
  },
  {
    accessorKey: "discountType",
    header: ({ column }) => (
      <ColumnHeader
        column={column}
        label="Discount Type"
        className="flex items-center justify-center gap-x-2"
      />
    ),
    enableSorting: true,
    cell: ({ getValue }) => {
      const value = getValue() as string;
      return (
        <div className="text-center">
          <Badge>{value}</Badge>
        </div>
      );
    },
  },
  {
    accessorKey: "discountValue",
    header: ({ column }) => (
      <ColumnHeader
        column={column}
        label="Discount Value"
        className="flex items-center justify-center gap-x-2"
      />
    ),
    enableSorting: true,
    cell: ({ cell }) => {
      const value = cell.getValue() as string;
      return <div className="text-center">{value}</div>;
    },
  },
  {
    accessorKey: "maxNoUsage",
    header: ({ column }) => (
      <ColumnHeader
        column={column}
        label="Max No Usage"
        className="flex items-center justify-center gap-x-2"
      />
    ),
    enableSorting: true,
    cell: ({ cell }) => {
      const value = cell.getValue() as string;
      return <div className="text-center">{value}</div>;
    },
  },
  {
    accessorKey: "isActive",
    header: ({ column }) => (
      <ColumnHeader
        column={column}
        label="Active"
        className="flex items-center justify-center gap-x-2"
      />
    ),
    enableSorting: true,
    cell: ({ cell }) => {
      const value = cell.getValue() as boolean;
      return <div className="text-center">{value ? "Yes" : "No"}</div>;
    },
  },
  {
    accessorKey: "expiryDate",
    header: ({ column }) => (
      <ColumnHeader
        column={column}
        label="Expiry Date"
        className="flex items-center justify-center gap-x-2"
      />
    ),
    enableSorting: true,
    cell: ({ cell }) => {
      const value = cell.getValue() as string;
      return <div className="text-center">{value}</div>;
    },
  },
  {
    id: "actions",
    header: ({ column }) => (
      <ColumnHeader
        column={column}
        label="Actions"
        className="flex items-center justify-center gap-x-2"
      />
    ),
    cell: ({ row }) => {
      const discount = row.original;
      const [open, setOpen] = useState(false);

      return (
        <div className="flex items-center justify-center gap-2">
          <Button
            onClick={() => setOpen(true)}
            variant="link"
            className="text-sm text-primary hover:opacity-70 transition-opacity"
          >
            <Pencil2Icon className="size-5 mr-1" />
            Edit
          </Button>
          {/* <Button
            onClick={() => setIsDeleteModalOpen(true)}
            variant="link"
            className="text-sm text-red-700 hover:text-red-900 transition-colors"
          >
            <Trash2Icon className="size-5 mr-1" />
            Delete
          </Button> */}
          <CreateDiscountModal
            open={open}
            onClose={() => setOpen(false)}
            discount={discount}
          />
          {/* <DeleteDiscountModal
            id={discount.id}
            isOpen={isDeleteModalOpen}
            onClose={() => setIsDeleteModalOpen(false)}
          /> */}
        </div>
      );
    },
  },
];

const DiscountsPage: React.FC = () => {
  const { discounts, loading } = useDiscounts();
  const [openCreateDiscountModal, setOpenCreateDiscountModal] =
    useState<boolean>(false);

  if (loading) return <div>Loading...</div>;

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-semibold">Discounts</h2>
          <Button onClick={() => setOpenCreateDiscountModal(true)}>
            Create Discount
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <PaginatedTable data={discounts} columns={columns} />
      </CardContent>
      <CreateDiscountModal
        open={openCreateDiscountModal}
        onClose={() => setOpenCreateDiscountModal(false)}
      />
    </Card>
  );
};

export default DiscountsPage;
