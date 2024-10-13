import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { Card, CardContent } from "@/components/ui/card";
import { formatDate, formatDateInWords, getUserVisitorId } from "@/utils";
import React, { useEffect, useState } from "react";
import VisitsToolbar from "../../visits/toolbar";
import PaginatedTable from "@/components/shared/paginatedTable";
import { fetchVisitsThunk, IVisit } from "@/app/features/company/thunk";
import { fetchEmployeesThunk } from "@/app/features/employee/thunk";
import { ColumnDef } from "@tanstack/react-table";
import ColumnHeader from "@/components/shared/columnHeader";
import ConfirmModal, { ModalType } from "../../visits/confirmModal";
import { Button } from "@/components/ui/button";
import { EnterIcon, ExitIcon, InfoCircledIcon } from "@radix-ui/react-icons";
import { MailIcon, PhoneIcon, User2Icon } from "lucide-react";
import ToolTip from "@/components/shared/tooltip";

export const visitColumns: ColumnDef<IVisit>[] = [
  {
    accessorKey: "employee",
    header: ({ column }) => (
      <ColumnHeader column={column} label="Person's Info" />
    ),
    enableSorting: true,
    cell: ({ row }) => {
      if (row.original.employee && row.original.employee !== null) {
        const { firstName, lastName, emailAddress, mobileNo } =
          row.original.employee;
        return (
          <div className="space-y-3">
            <div className="flex gap-x-2 items-center">
              <User2Icon className="w-6 h-6" />
              {`${firstName} ${lastName}`}
            </div>
            <div className="flex gap-x-2">
              <MailIcon className="w-4 h-4" />
              {emailAddress}
            </div>
            <div className="flex gap-x-2">
              <PhoneIcon className="w-4 h-4" />
              {mobileNo}
            </div>
          </div>
        );
      } else {
        return "N/A";
      }
    },
  },
  {
    accessorKey: "visitDate",
    header: ({ column }) => <ColumnHeader column={column} label="Visit Date" />,
    enableSorting: true,
    cell: ({ getValue }) => {
      const createdAt = getValue() as Date;
      const date = formatDateInWords(new Date(createdAt));
      return createdAt ? <span>{date}</span> : <span>-</span>;
    },
  },
  {
    accessorKey: "checkInTime",
    header: ({ column }) => (
      <ColumnHeader column={column} label="Check In Time" />
    ),
    enableSorting: true,
    cell: ({ getValue }) => {
      const createdAt = getValue() as Date;
      return createdAt ? (
        <span>{formatDate(new Date(createdAt))}</span>
      ) : (
        <span>-</span>
      );
    },
  },
  {
    accessorKey: "checkoutTime",
    header: ({ column }) => (
      <ColumnHeader column={column} label="Check Out Time" />
    ),
    enableSorting: true,
    cell: ({ getValue }) => {
      const createdAt = getValue() as Date;
      return createdAt ? (
        <span>{formatDate(new Date(createdAt))}</span>
      ) : (
        <span>-</span>
      );
    },
  },
  {
    id: "actions",
    header: () => <div className="text-center">Actions</div>,
    cell: ({ row }) => {
      const visit = row.original;
      const currentDate = new Date();
      currentDate.setHours(0, 0, 0, 0); // Reset time to midnight for comparison

      const visitCheckInDate = new Date(visit.checkInTime);
      visitCheckInDate.setHours(0, 0, 0, 0);
      return (
        <div className="flex items-center gap-2">
          <ToolTip title={row.original.purposeOfVisit}>
            <InfoCircledIcon className="text-gray-500 cursor-pointer hover:text-gray-900" />
          </ToolTip>
          {!visit.checkInTime && !visit.checkoutTime && (
            <ConfirmModal
              label={
                <Button variant="link" className="text-xs gap-x-2 text-sky-700">
                  <EnterIcon />
                  Check In
                </Button>
              }
              type={ModalType.CHECK_IN}
              visit={visit}
            />
          )}

          {visit.checkInTime && !visit.checkoutTime && (
            <ConfirmModal
              label={
                <Button variant="link" className="text-xs gap-x-2 text-sky-700">
                  <ExitIcon />
                  Check Out
                </Button>
              }
              type={ModalType.CHECK_OUT}
              visit={visit}
            />
          )}

          {!visit.checkInTime && visit.checkoutTime && (
            <ConfirmModal
              label={
                <Button variant="link" className="text-xs gap-x-2 text-sky-700">
                  <EnterIcon />
                  Check In
                </Button>
              }
              type={ModalType.CHECK_IN}
              visit={visit}
            />
          )}
        </div>
      );
    },
  },
];

const VisitorDashboard: React.FC = () => {
  const dispatch = useAppDispatch();

  const { visits } = useAppSelector((state) => state.company);
  const { user } = useAppSelector((state) => state.auth);

  const [open, setOpen] = useState(false);
  const visitorId = getUserVisitorId();

  useEffect(() => {
    if (!visitorId && !user?.id) return;

    dispatch(
      fetchVisitsThunk({
        visitorId,
      })
    );

    dispatch(fetchEmployeesThunk({}));
  }, [user, visitorId]);

  return (
    <Card>
      <CardContent>
        <div className="flex items-center justify-between mt-6">
          <h1 className="flex items-center gap-x-3 text-2xl font-semibold">
            Visitor Dashboard
          </h1>
          <div>
            <VisitsToolbar
              visitorId={visitorId!}
              mode="toolbar"
              open={open}
              onClose={() => setOpen(false)}
              onOpen={() => setOpen(true)}
            />
          </div>
        </div>
        <div>
          <PaginatedTable data={visits} columns={visitColumns} />
        </div>
      </CardContent>
    </Card>
  );
};

export default VisitorDashboard;
