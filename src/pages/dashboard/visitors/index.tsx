import { fetchVisitorsThunk, IVisitor } from "@/app/features/company/thunk";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import PaginatedTable from "@/components/shared/paginatedTable";
import { ColumnDef } from "@tanstack/react-table";
import { useEffect } from "react";

const columns: ColumnDef<IVisitor>[] = [
  {
    accessorKey: "id",
    header: "Id",
  },
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
  },
];

const VisitorsPage: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchVisitorsThunk());
  }, []);

  const { visitors } = useAppSelector((state) => state.company);

  console.log("visitors :>> ", visitors);

  return (
    <div>
      <h2 className="text-2xl text-gray-950 font-semibold">Visitors</h2>
      <div>
        <PaginatedTable data={visitors} columns={columns} />
      </div>
    </div>
  );
};

export default VisitorsPage;
