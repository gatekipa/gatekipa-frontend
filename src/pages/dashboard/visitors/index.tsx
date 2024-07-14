import { fetchVisitorsThunk, IVisitor } from "@/app/features/company/thunk";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import VisitorToolbar from "@/components/features/visitors/toolbar";
import PaginatedTable from "@/components/shared/paginatedTable";
import { ColumnDef } from "@tanstack/react-table";
import { useEffect } from "react";

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
];

const VisitorsPage: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchVisitorsThunk());
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
