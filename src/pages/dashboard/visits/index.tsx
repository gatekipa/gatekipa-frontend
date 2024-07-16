import { fetchVisitsThunk, IVisit } from "@/app/features/company/thunk";
import { fetchEmployeesThunk } from "@/app/features/employee/thunk";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import ConfirmModal, {
  ModalType,
} from "@/components/features/visits/confirmModal";
import VisitsToolbar from "@/components/features/visits/toolbar";
import PaginatedTable from "@/components/shared/paginatedTable";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowLeft } from "lucide-react";
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
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const visit = row.original;
      return (
        <div className="flex items-center gap-2">
          <ConfirmModal
            label="Check In"
            type={ModalType.CHECK_IN}
            visit={visit}
          />
          <ConfirmModal
            label="Check Out"
            type={ModalType.CHECK_OUT}
            visit={visit}
          />
        </div>
      );
    },
  },
];

const VisitsPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { visitorId } = useParams<{ visitorId: string }>();

  const { visits } = useAppSelector((state) => state.company);
  const { user } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (!visitorId && !user?.id) return;

    dispatch(
      fetchVisitsThunk({
        visitorId: visitorId !== ":visitorId" ? visitorId! : user?.visitorId!,
      })
    );

    dispatch(fetchEmployeesThunk());
  }, [user, visitorId]);

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="flex items-center gap-x-3 text-xl">
          {user?.userType !== "VISITOR" && (
            <Link to="/dashboard/visitors">
              <ArrowLeft size={16} />
            </Link>
          )}
          Visits Page
        </h1>
        <div>
          <VisitsToolbar visitorId={visitorId!} />
        </div>
      </div>
      <div>
        <PaginatedTable data={visits} columns={columns} />
      </div>
    </div>
  );
};

export default VisitsPage;
