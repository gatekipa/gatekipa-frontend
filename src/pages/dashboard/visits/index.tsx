import { fetchVisitsThunk, IVisit } from "@/app/features/company/thunk";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import VisitsToolbar from "@/components/features/visits/toolbar";
import PaginatedTable from "@/components/shared/paginatedTable";
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowBigLeft, ArrowLeft } from "lucide-react";
import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";

const columns: ColumnDef<IVisit>[] = [
  {
    accessorKey: "purposeOfVisit",
    header: "Purpose of Visit",
  },
  {
    accessorKey: "personToMeet",
    header: "Person to Meet",
  },
  {
    accessorKey: "personToMeetEmail",
    header: "Person to Meet's Email",
  },
  {
    accessorKey: "personToMeetMobileNo",
    header: "Person to Meet's Mobile",
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

const VisitsPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { visitorId } = useParams<{ visitorId: string }>();

  const { visits } = useAppSelector((state) => state.company);

  useEffect(() => {
    if (!visitorId) return;

    dispatch(fetchVisitsThunk({ visitorId: visitorId! }));
  }, [visitorId]);

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="flex items-center gap-x-3 text-xl">
          <Link to="/dashboard/visitors">
            <ArrowLeft size={16} />
          </Link>
          Visits Page
        </h1>
        <div>
          <VisitsToolbar />
        </div>
      </div>
      <div>
        <PaginatedTable data={visits} columns={columns} />
      </div>
    </div>
  );
};

export default VisitsPage;
