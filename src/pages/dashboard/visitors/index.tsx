import { fetchVisitorsThunk, IVisitor } from "@/app/features/company/thunk";
import { fetchEmployeesThunk } from "@/app/features/employee/thunk";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import VisitorToolbar from "@/components/features/visitors/toolbar";
import VisitsToolbar from "@/components/features/visits/toolbar";
import PaginatedTable from "@/components/shared/paginatedTable";
import { Button } from "@/components/ui/button";
import { Link1Icon } from "@radix-ui/react-icons";
import { ColumnDef } from "@tanstack/react-table";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const columns: ColumnDef<IVisitor>[] = [
  {
    accessorKey: "firstName",
    header: "First Name",
  },
  {
    accessorKey: "lastName",
    header: "Last Name",
  },
  {
    accessorKey: "emailAddress",
    header: "Email",
  },
  {
    accessorKey: "mobileNo",
    header: "Mobile Number",
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
    cell: ({ getValue }) => {
      const createdAt = getValue() as Date;
      return <span>{new Date(createdAt).toLocaleString()}</span>;
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const visitor = row.original;
      return (
        <div className="flex items-center gap-2">
          <Button size="sm" className="text-xs">
            <Link1Icon className="mr-2" />
            <Link to={`/dashboard/visits/${visitor.id}`}>Visits</Link>
          </Button>
          <VisitsToolbar visitorId={visitor.id} />
        </div>
      );
    },
  },
];

const VisitorsPage: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchVisitorsThunk());
    dispatch(fetchEmployeesThunk());
  }, []);

  const { visitors } = useAppSelector((state) => state.company);

  return (
    <div>
      <div className="flex justify-between items-center">
        <h2 className="text-2xl text-gray-950 font-semibold">Visitors</h2>
        <VisitorToolbar />
      </div>
      <div>
        <PaginatedTable data={visitors} columns={columns} />
      </div>
    </div>
  );
};

export default VisitorsPage;
