import { IPlan } from "@/app/features/pricing/thunk";
import ColumnHeader from "@/components/shared/columnHeader";
import PaginatedTable from "@/components/shared/paginatedTable";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import usePricingPlans from "@/hooks/pricing";
import { ColumnDef } from "@tanstack/react-table";
import { ExternalLink } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

const columns: ColumnDef<IPlan>[] = [
  {
    accessorKey: "planName",
    header: ({ column }) => (
      <ColumnHeader
        column={column}
        label="Name"
        className="flex text-sm items-end gap-x-2"
      />
    ),
    enableSorting: true,
  },
  {
    accessorKey: "description",
    header: ({ column }) => (
      <ColumnHeader
        column={column}
        label="Description"
        className="flex text-sm items-end gap-x-2"
      />
    ),
    enableSorting: true,
  },
  {
    accessorKey: "price",
    header: ({ column }) => (
      <ColumnHeader
        column={column}
        label="Price"
        className="flex text-sm items-end gap-x-2"
      />
    ),
    enableSorting: true,
    cell: ({ getValue }) => {
      const value = getValue() as number;

      const formattedValue = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(value);

      return <span>{formattedValue}</span>;
    },
  },
  {
    accessorKey: "subscriptionType",
    header: ({ column }) => (
      <ColumnHeader
        column={column}
        label="Subscription Type"
        className="flex text-sm items-end gap-x-2"
      />
    ),
    enableSorting: true,
    cell: ({ getValue }) => {
      const value = getValue() as string;

      return (
        <Badge variant={value === "MONTHLY" ? "secondary" : "default"}>
          {value}
        </Badge>
      );
    },
  },
  {
    accessorKey: "isActive",
    header: ({ column }) => (
      <ColumnHeader
        column={column}
        label="Active"
        className="flex text-sm items-end gap-x-2"
      />
    ),
    enableSorting: true,
    cell: ({ getValue }) => {
      const isActive = getValue() as boolean;

      return <div className="text-center">{isActive ? "Yes" : "No"}</div>;
    },
  },
  {
    accessorKey: "isPromotionalPlan",
    header: ({ column }) => (
      <ColumnHeader
        column={column}
        label="Promotional Plan"
        className="flex text-sm items-end gap-x-2"
      />
    ),
    enableSorting: true,
    cell: ({ getValue }) => {
      const isActive = getValue() as boolean;
      return <div className="text-center">{isActive ? "Yes" : "No"}</div>;
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const plan = row.original;
      // const [isModalOpen, setIsModalOpen] = useState(false);
      return (
        <div className="flex items-center gap-2">
          <Link to={`/dashboard/pricing/${plan.id}`}>
            <Button
              size="sm"
              className="text-xs"
              variant="link"
              title="Display visits"
            >
              <ExternalLink className="mr-2" size={12} />
              Edit
            </Button>
          </Link>
        </div>
      );
    },
  },
];

const ListPricingPage: React.FC = () => {
  const { plans, loading } = usePricingPlans();

  if (loading) {
    return <div>Loading...</div>;
  }

  console.log("plans :>> ", plans);

  return (
    <Card>
      <div className="flex justify-between p-5">
        <h2 className="text-2xl font-semibold">Pricing Plans</h2>
        <Link to="/dashboard/pricing/create">
          <Button>Create</Button>
        </Link>
      </div>
      <CardContent>
        <PaginatedTable data={plans} columns={columns} />
      </CardContent>
    </Card>
  );
};

export default ListPricingPage;
